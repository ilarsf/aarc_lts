(function () {
  'use strict';

  const DEFAULT_MODE = 'learn';
  const DEFAULT_ZOOM = 17;
  const MODE_MAPS = {
    learn: 'small-round-first-sunday',
    bridge: 'bridge-navigation-map',
    coach: 'small-round-first-sunday',
    print: 'small-round-first-sunday'
  };

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-river-navigation-guide]').forEach(function (root) {
      initRiverBriefing(root);
    });
  });

  async function initRiverBriefing(root) {
    const ui = collectUi(root);
    const state = {
      root: root,
      ui: ui,
      mode: modeFromHash(root) || DEFAULT_MODE,
      activeCard: null,
      showFullRoute: false,
      course: null,
      itemsById: new Map(),
      leafletMap: null,
      routeLayer: null,
      itemLayer: null,
      coachMapId: MODE_MAPS.coach
    };

    root.classList.add('is-enhanced');
    bindStaticInteractions(state);
    setMode(state, state.mode, false);
    updateQuestionSummary(state);
    updateCoachPrompt(state);

    try {
      const response = await fetch(root.getAttribute('data-course-url'), { cache: 'no-store' });
      if (!response.ok) throw new Error('Guide data failed to load.');
      if (!window.L) throw new Error('Leaflet did not load.');

      state.course = await response.json();
      indexCourseItems(state);
      initLeafletMap(state);
      renderMap(state);
    } catch (error) {
      setMapStatus(state, 'Map unavailable. Use the route cards and confirm the assigned course with your coach.');
      console.error('AARC River Navigation Guide map failed.', error);
    }
  }

  function collectUi(root) {
    return {
      modeButtons: Array.from(root.querySelectorAll('[data-mode-button]')),
      panels: Array.from(root.querySelectorAll('[data-mode-panel]')),
      cards: Array.from(root.querySelectorAll('[data-route-card]')),
      mapRegion: root.querySelector('#route-map'),
      mapDetails: root.querySelector('.river-map-details'),
      map: root.querySelector('[data-map]'),
      mapTitle: root.querySelector('[data-map-title]'),
      mapSummary: root.querySelector('[data-map-summary]'),
      mapStatus: root.querySelector('[data-map-status]'),
      showActiveButton: root.querySelector('[data-map-action="active"]'),
      showFullButton: root.querySelector('[data-map-action="full"]'),
      questionInputs: Array.from(root.querySelectorAll('[data-question-checkbox]')),
      questionSummary: root.querySelector('[data-question-summary]'),
      coachRouteMap: root.querySelector('[data-coach-route-map]'),
      coachTurn: root.querySelector('[data-coach-turn]'),
      coachLimit: root.querySelector('[data-coach-limit]'),
      coachReminders: Array.from(root.querySelectorAll('[data-coach-reminder]')),
      coachPrompt: root.querySelector('[data-coach-prompt]'),
      printButton: root.querySelector('[data-print-guide]')
    };
  }

  function bindStaticInteractions(state) {
    const ui = state.ui;

    ui.modeButtons.forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.preventDefault();
        setMode(state, button.getAttribute('data-mode-button'), true);
      });
    });

    ui.cards.forEach(function (card) {
      const mapLink = card.querySelector('[data-map-focus]');
      if (!mapLink) return;
      mapLink.addEventListener('click', function (event) {
        event.preventDefault();
        setMode(state, card.getAttribute('data-mode'), false);
        setActiveCard(state, card);
        state.showFullRoute = false;
        renderMap(state);
        if (ui.mapRegion) ui.mapRegion.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    if (ui.showActiveButton) {
      ui.showActiveButton.addEventListener('click', function () {
        state.showFullRoute = false;
        renderMap(state);
      });
    }

    if (ui.showFullButton) {
      ui.showFullButton.addEventListener('click', function () {
        state.showFullRoute = true;
        renderMap(state);
      });
    }

    ui.questionInputs.forEach(function (input) {
      input.addEventListener('change', function () {
        updateQuestionSummary(state);
      });
    });

    [ui.coachRouteMap, ui.coachTurn, ui.coachLimit].forEach(function (field) {
      if (!field) return;
      field.addEventListener('input', function () {
        updateCoachPrompt(state);
        if (field === ui.coachRouteMap) {
          state.coachMapId = field.value;
          renderMap(state);
        }
      });
    });

    ui.coachReminders.forEach(function (input) {
      input.addEventListener('change', function () {
        updateCoachPrompt(state);
      });
    });

    if (ui.printButton) {
      ui.printButton.addEventListener('click', function () {
        window.print();
      });
    }

    if (ui.mapDetails) {
      ui.mapDetails.addEventListener('toggle', function () {
        if (ui.mapDetails.open && state.leafletMap) {
          window.setTimeout(function () {
            state.leafletMap.invalidateSize();
            renderMap(state);
          }, 0);
        }
      });
    }
  }

  function setMode(state, mode, updateHash) {
    const nextMode = mode || DEFAULT_MODE;
    state.mode = nextMode;
    state.showFullRoute = nextMode === 'coach';

    state.ui.modeButtons.forEach(function (button) {
      const isActive = button.getAttribute('data-mode-button') === nextMode;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    state.ui.panels.forEach(function (panel) {
      panel.hidden = panel.getAttribute('data-mode-panel') !== nextMode;
    });

    const firstCard = state.ui.cards.find(function (card) {
      return card.getAttribute('data-mode') === nextMode;
    });
    setActiveCard(state, firstCard || null);

    if (updateHash) {
      const panel = state.ui.panels.find(function (item) {
        return item.getAttribute('data-mode-panel') === nextMode;
      });
      if (panel && window.history && window.history.replaceState) {
        window.history.replaceState(null, '', '#' + panel.id);
      }
    }

    renderMap(state);
  }

  function setActiveCard(state, card) {
    state.activeCard = card;
    state.ui.cards.forEach(function (item) {
      item.classList.toggle('is-active', item === card);
    });
  }

  function modeFromHash(root) {
    if (!window.location.hash) return null;
    let panel = null;
    try {
      panel = root.querySelector(window.location.hash);
    } catch (error) {
      return null;
    }
    return panel ? panel.getAttribute('data-mode-panel') : null;
  }

  function indexCourseItems(state) {
    state.course.stops.concat(state.course.lines).forEach(function (item) {
      state.itemsById.set(item.id, item);
    });
  }

  function initLeafletMap(state) {
    const ui = state.ui;
    ui.map.innerHTML = '';

    state.leafletMap = L.map(ui.map, {
      keyboard: true,
      scrollWheelZoom: false,
      tap: true,
      zoomControl: true
    });

    const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri',
      maxZoom: 19
    });
    const streets = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    });

    satellite.addTo(state.leafletMap);
    L.control.layers({ Satellite: satellite, Streets: streets }, {}, { position: 'topleft' }).addTo(state.leafletMap);

    state.routeLayer = L.layerGroup().addTo(state.leafletMap);
    state.itemLayer = L.layerGroup().addTo(state.leafletMap);
    state.root.classList.add('is-map-ready');

    window.setTimeout(function () {
      state.leafletMap.invalidateSize();
      renderMap(state);
    }, 0);
  }

  function renderMap(state) {
    if (!state.course || !state.leafletMap) return;

    state.routeLayer.clearLayers();
    state.itemLayer.clearLayers();

    const guideMap = getActiveGuideMap(state);
    const activeIds = getActiveIds(state, 'data-place-ids');
    const activeLineIds = getActiveIds(state, 'data-line-ids');
    const boundsPoints = [];

    updateMapCopy(state, guideMap);
    renderRoute(state, guideMap).forEach(function (latLng) {
      boundsPoints.push(latLng);
    });

    const lineIds = state.showFullRoute ? guideMap.lineIds : activeLineIds;
    lineIds.forEach(function (id) {
      const line = state.itemsById.get(id);
      if (!line) return;
      renderLine(state, line, !state.showFullRoute);
      line.coordinates.map(toLatLng).forEach(function (latLng) {
        boundsPoints.push(latLng);
      });
    });

    const markerIds = state.showFullRoute ? guideMap.keyPlaceIds : activeIds;
    markerIds.forEach(function (id, index) {
      const item = state.itemsById.get(id);
      if (!item || item.geometry === 'LineString') return;
      const isActive = !state.showFullRoute || activeIds.indexOf(id) !== -1;
      renderMarker(state, item, index + 1, isActive);
      boundsPoints.push(toLatLng(item.coordinates[0]));
    });

    fitMap(state, boundsPoints);
    updateMapButtons(state);
  }

  function renderRoute(state, guideMap) {
    const segments = getRouteSegments(state.course, guideMap);
    const bounds = [];
    segments.forEach(function (segment) {
      segment.forEach(function (latLng) {
        bounds.push(latLng);
      });
      L.polyline(segment, {
        color: '#ffffff',
        interactive: false,
        opacity: 0.9,
        weight: 8
      }).addTo(state.routeLayer);
      L.polyline(segment, {
        color: '#0f7891',
        interactive: false,
        opacity: 0.92,
        weight: 4
      }).addTo(state.routeLayer);
    });
    return bounds;
  }

  function renderLine(state, line, isActive) {
    L.polyline(line.coordinates.map(toLatLng), {
      color: isActive ? '#b42318' : '#b45309',
      dashArray: line.id.indexOf('lts-') === 0 ? '5 8' : '10 8',
      opacity: isActive ? 0.95 : 0.72,
      weight: isActive ? 6 : 4
    })
      .bindTooltip(itemLabel(line), { sticky: true })
      .addTo(state.itemLayer);
  }

  function renderMarker(state, item, number, isActive) {
    const marker = L.marker(toLatLng(item.coordinates[0]), {
      icon: markerIcon(item, number, isActive),
      keyboard: true,
      title: itemLabel(item)
    });
    marker
      .bindTooltip(itemLabel(item), {
        className: 'river-briefing-tooltip',
        direction: 'top',
        offset: [0, -14]
      })
      .addTo(state.itemLayer);
  }

  function markerIcon(item, number, isActive) {
    const classes = [
      'river-briefing-marker',
      'river-briefing-marker--' + item.category,
      isActive ? 'is-active' : 'is-muted'
    ].join(' ');
    return L.divIcon({
      className: classes,
      html: '<span>' + escapeHtml(String(number)) + '</span>',
      iconAnchor: [18, 18],
      iconSize: [36, 36]
    });
  }

  function getRouteSegments(course, guideMap) {
    const ranges = guideMap.routeRanges || [[0, course.route.lengthMeters]];
    return ranges.map(function (range) {
      const segment = [];
      course.route.coordinates.forEach(function (coord, index) {
        const point = course.route.points[index];
        if (point && point.distanceMeters >= range[0] && point.distanceMeters <= range[1]) {
          segment.push(toLatLng(coord));
        }
      });
      return segment;
    }).filter(function (segment) {
      return segment.length > 1;
    });
  }

  function getActiveGuideMap(state) {
    const mapId = state.mode === 'coach'
      ? state.coachMapId
      : (state.activeCard && state.activeCard.getAttribute('data-guide-map')) || MODE_MAPS[state.mode] || MODE_MAPS.learn;
    return state.course.maps.find(function (guideMap) {
      return guideMap.id === mapId;
    }) || state.course.maps[0];
  }

  function getActiveIds(state, attribute) {
    if (!state.activeCard) return [];
    return (state.activeCard.getAttribute(attribute) || '').split(/\s+/).filter(Boolean);
  }

  function fitMap(state, boundsPoints) {
    if (!boundsPoints.length) return;
    if (boundsPoints.length === 1) {
      state.leafletMap.setView(boundsPoints[0], DEFAULT_ZOOM);
      return;
    }
    state.leafletMap.fitBounds(L.latLngBounds(boundsPoints), {
      maxZoom: DEFAULT_ZOOM,
      padding: [30, 30]
    });
  }

  function updateMapCopy(state, guideMap) {
    const cardTitle = state.activeCard ? cardLabel(state.activeCard) : 'Route overview';
    state.ui.mapTitle.textContent = guideMap.name;
    state.ui.mapSummary.textContent = guideMap.summary;
    setMapStatus(state, state.showFullRoute ? 'Showing the full route reference.' : 'Showing: ' + cardTitle + '.');
  }

  function updateMapButtons(state) {
    if (state.ui.showFullButton) state.ui.showFullButton.classList.toggle('is-active', state.showFullRoute);
    if (state.ui.showActiveButton) state.ui.showActiveButton.classList.toggle('is-active', !state.showFullRoute);
  }

  function updateQuestionSummary(state) {
    if (!state.ui.questionSummary) return;
    const selected = state.ui.questionInputs.filter(function (input) {
      return input.checked;
    }).map(function (input) {
      return input.value;
    });

    state.ui.questionSummary.textContent = selected.length
      ? selected.length + ' question' + (selected.length === 1 ? '' : 's') + ' to ask: ' + selected.join(' ')
      : 'No questions selected yet.';
  }

  function updateCoachPrompt(state) {
    const ui = state.ui;
    if (!ui.coachPrompt) return;

    const routeName = ui.coachRouteMap && ui.coachRouteMap.selectedOptions.length
      ? ui.coachRouteMap.selectedOptions[0].textContent.trim().toLowerCase()
      : 'assigned route';
    const turn = ui.coachTurn && ui.coachTurn.value.trim() ? ui.coachTurn.value.trim() : 'the coach-assigned turn cue';
    const limit = ui.coachLimit && ui.coachLimit.value.trim() ? ui.coachLimit.value.trim() : 'the coach-assigned limit';
    const reminders = ui.coachReminders.filter(function (input) {
      return input.checked;
    }).map(function (input) {
      return input.value;
    });

    let prompt = 'Today we will row the ' + routeName + '. Turn at ' + turn + '. Do not go beyond ' + limit + '.';
    if (reminders.length) prompt += ' Remember to ' + toSentence(reminders) + '.';
    ui.coachPrompt.textContent = prompt;
  }

  function toSentence(items) {
    if (items.length <= 1) return items.join('');
    if (items.length === 2) return items.join(' and ');
    return items.slice(0, -1).join(', ') + ', and ' + items[items.length - 1];
  }

  function cardLabel(card) {
    const kicker = card.querySelector('.route-card-kicker')?.textContent.trim();
    const title = card.querySelector('h3')?.textContent.trim();
    return [kicker, title].filter(Boolean).join(': ');
  }

  function itemLabel(item) {
    return item.displayTitle || item.title;
  }

  function setMapStatus(state, message) {
    if (state.ui.mapStatus) state.ui.mapStatus.textContent = message;
  }

  function toLatLng(coord) {
    return [coord.lat, coord.lon];
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}());
