(function () {
  'use strict';

  const DEFAULT_MODE = 'small-round';
  const DEFAULT_ZOOM = 17;
  const MODE_ROUTES = {
    'small-round': 'small-round',
    'bridge-round': 'bridge-round',
    'full-round': 'full-round',
    coach: 'small-round'
  };
  const LEGACY_MODE_MAPS = {
    'small-round': 'small-round-first-sunday',
    'bridge-round': 'bridge-navigation-map',
    'full-round': 'full-round-second-sunday',
    coach: 'small-round-first-sunday'
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
      stepsById: new Map(),
      leafletMap: null,
      routeLayer: null,
      itemLayer: null,
      coachRouteId: MODE_ROUTES.coach
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
      mapBackButton: root.querySelector('[data-map-back]'),
      questionInputs: Array.from(root.querySelectorAll('[data-question-checkbox]')),
      questionSummary: root.querySelector('[data-question-summary]'),
      coachRouteMap: root.querySelector('[data-coach-route-map]'),
      coachTurn: root.querySelector('[data-coach-turn]'),
      coachLimit: root.querySelector('[data-coach-limit]'),
      coachReminders: Array.from(root.querySelectorAll('[data-coach-reminder]')),
      coachPrompt: root.querySelector('[data-coach-prompt]'),
      quickCards: Array.from(root.querySelectorAll('[data-quick-card]')),
      printButton: root.querySelector('[data-print-guide]')
    };
  }

  function bindStaticInteractions(state) {
    const ui = state.ui;

    ui.modeButtons.forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.preventDefault();
        setMode(state, button.getAttribute('data-mode-button'), true, true);
        hideMapBackButton(state);
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
        openMapDetails(state);
        showMapBackButton(state);
        if (ui.mapRegion) ui.mapRegion.scrollIntoView({ behavior: 'smooth', block: 'start' });
        focusMapStatus(state);
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

    if (ui.mapBackButton) {
      ui.mapBackButton.addEventListener('click', function () {
        if (!state.activeCard) return;
        state.activeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        state.activeCard.setAttribute('tabindex', '-1');
        state.activeCard.focus({ preventScroll: true });
      });
    }

    ui.questionInputs.forEach(function (input) {
      input.addEventListener('change', function () {
        updateQuestionSummary(state);
      });
    });

    [ui.coachRouteMap, ui.coachTurn, ui.coachLimit].forEach(function (field) {
      if (!field) return;
      const updateCoachField = function () {
        updateCoachPrompt(state);
        if (field === ui.coachRouteMap) {
          state.coachRouteId = field.value;
          updateQuickCards(state);
          renderMap(state);
        }
      };
      field.addEventListener('input', updateCoachField);
      if (field.tagName === 'SELECT') field.addEventListener('change', updateCoachField);
    });

    ui.coachReminders.forEach(function (input) {
      input.addEventListener('change', function () {
        updateCoachPrompt(state);
      });
    });

    if (ui.printButton) {
      ui.printButton.addEventListener('click', function () {
        document.body.classList.add('printing-quick-card');
        window.print();
      });
    }

    window.addEventListener('afterprint', function () {
      document.body.classList.remove('printing-quick-card');
    });

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

  function setMode(state, mode, updateHash, moveFocus) {
    const nextMode = MODE_ROUTES[mode] ? mode : DEFAULT_MODE;
    state.mode = nextMode;
    state.showFullRoute = nextMode === 'coach';
    updateQuickCards(state);

    state.ui.modeButtons.forEach(function (button) {
      const isActive = button.getAttribute('data-mode-button') === nextMode;
      button.classList.toggle('is-active', isActive);
      if (isActive) {
        button.setAttribute('aria-current', 'true');
      } else {
        button.removeAttribute('aria-current');
      }
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
    if (moveFocus) focusActivePanelHeading(state);
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
    (state.course.stops || []).concat(state.course.lines || []).forEach(function (item) {
      state.itemsById.set(item.id, item);
    });
    (state.course.steps || []).forEach(function (step) {
      state.stepsById.set(step.id, step);
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

    const activeRoute = getActiveRoute(state);
    const activeStep = getActiveStep(state, activeRoute);
    const visibleSteps = state.showFullRoute || !activeStep
      ? getRouteSteps(state, activeRoute)
      : [activeStep].filter(Boolean);
    const boundsPoints = [];

    updateMapCopy(state, activeRoute, activeStep);
    renderRoute(state, activeRoute || getActiveGuideMap(state)).forEach(function (latLng) {
      boundsPoints.push(latLng);
    });

    visibleSteps.forEach(function (step) {
      const isActiveStep = !state.showFullRoute || (activeStep && activeStep.id === step.id);

      (step.lineIds || []).forEach(function (id) {
        const line = state.itemsById.get(id);
        if (!line) return;
        renderLine(state, line, isActiveStep);
        line.coordinates.map(toLatLng).forEach(function (latLng) {
          boundsPoints.push(latLng);
        });
      });

      (step.placeIds || []).forEach(function (id) {
        const item = state.itemsById.get(id);
        if (!item || item.geometry === 'LineString') return;
        renderMarker(state, item, step.sequence, isActiveStep);
        boundsPoints.push(toLatLng(item.coordinates[0]));
      });
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
    if (!guideMap) return [];
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

  function getActiveRoute(state) {
    if (!state.course || !state.course.routes) return null;
    const routeId = state.mode === 'coach'
      ? state.coachRouteId
      : MODE_ROUTES[state.mode] || MODE_ROUTES[DEFAULT_MODE];

    return state.course.routes.find(function (route) {
      return route.id === routeId;
    }) || state.course.routes[0];
  }

  function getRouteSteps(state, route) {
    if (!route) return [];

    if (route.stepIds) {
      return route.stepIds.map(function (id) {
        return state.stepsById.get(id);
      }).filter(Boolean);
    }

    if (route.sections) {
      return route.sections.reduce(function (steps, section) {
        const sectionSteps = (section.stepIds || []).map(function (id) {
          return state.stepsById.get(id);
        }).filter(Boolean);
        return steps.concat(sectionSteps);
      }, []);
    }

    return route.steps || [];
  }

  function getActiveStep(state, route) {
    if (state.activeCard) {
      const stepId = state.activeCard.getAttribute('data-route-step-id');
      if (stepId && state.stepsById.has(stepId)) return state.stepsById.get(stepId);
      return stepFromCard(state.activeCard);
    }

    const routeSteps = getRouteSteps(state, route);
    return state.mode === 'coach' ? null : routeSteps[0] || null;
  }

  function stepFromCard(card) {
    const title = card.querySelector('h3')?.textContent.trim() || 'Route step';
    return {
      id: card.id || title,
      sequence: cardSequence(card),
      title: title,
      placeIds: idsFromAttribute(card, 'data-place-ids'),
      lineIds: idsFromAttribute(card, 'data-line-ids')
    };
  }

  function cardSequence(card) {
    const kicker = card.querySelector('.route-card-kicker')?.textContent.trim();
    if (!kicker) return '';
    const match = kicker.match(/^(\d+)\s+of\s+\d+$/i);
    return match ? match[1] : kicker;
  }

  function getActiveGuideMap(state) {
    const mapId = state.mode === 'coach'
      ? LEGACY_MODE_MAPS[state.coachRouteId] || LEGACY_MODE_MAPS.coach
      : (state.activeCard && state.activeCard.getAttribute('data-guide-map')) || LEGACY_MODE_MAPS[state.mode] || LEGACY_MODE_MAPS[DEFAULT_MODE];
    return state.course.maps.find(function (guideMap) {
      return guideMap.id === mapId;
    }) || state.course.maps[0];
  }

  function idsFromAttribute(element, attribute) {
    return (element.getAttribute(attribute) || '').split(/\s+/).filter(Boolean);
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

  function updateMapCopy(state, route, step) {
    const routeName = route ? route.title : 'Route overview';
    state.ui.mapTitle.textContent = routeName;

    if (state.showFullRoute || !step) {
      const summary = route && route.summary
        ? 'Showing the full ' + routeName.toLowerCase() + ': ' + route.summary
        : 'Showing the full route reference.';
      state.ui.mapSummary.textContent = summary;
      setMapStatus(state, routeName + ', full route view.');
      return;
    }

    const stepLabel = step.sequence + ': ' + step.title;
    state.ui.mapSummary.textContent = 'Showing ' + stepLabel + '.';
    setMapStatus(state, routeName + ', step ' + stepLabel + '.');
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

    if (!selected.length) {
      const message = document.createElement('p');
      message.textContent = 'No questions selected yet.';
      state.ui.questionSummary.replaceChildren(message);
      return;
    }

    const heading = document.createElement('p');
    heading.textContent = selected.length + ' question' + (selected.length === 1 ? '' : 's') + ' to ask:';
    const list = document.createElement('ul');
    selected.forEach(function (question) {
      const item = document.createElement('li');
      item.textContent = question;
      list.appendChild(item);
    });
    state.ui.questionSummary.replaceChildren(heading, list);
  }

  function updateCoachPrompt(state) {
    const ui = state.ui;
    if (!ui.coachPrompt) return;

    if (ui.coachRouteMap && ui.coachRouteMap.value) {
      state.coachRouteId = ui.coachRouteMap.value;
    }

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

  function updateQuickCards(state) {
    const activeRouteId = state.coachRouteId || MODE_ROUTES.coach;
    state.ui.quickCards.forEach(function (card) {
      card.hidden = card.getAttribute('data-quick-card') !== activeRouteId;
    });
  }

  function toSentence(items) {
    if (items.length <= 1) return items.join('');
    if (items.length === 2) return items.join(' and ');
    return items.slice(0, -1).join(', ') + ', and ' + items[items.length - 1];
  }

  function itemLabel(item) {
    return item.displayTitle || item.title;
  }

  function setMapStatus(state, message) {
    if (state.ui.mapStatus) state.ui.mapStatus.textContent = message;
  }

  function openMapDetails(state) {
    if (!state.ui.mapDetails || state.ui.mapDetails.open) return;
    state.ui.mapDetails.open = true;
  }

  function focusMapStatus(state) {
    if (!state.ui.mapStatus) return;
    state.ui.mapStatus.setAttribute('tabindex', '-1');
    window.setTimeout(function () {
      state.ui.mapStatus.focus({ preventScroll: true });
    }, 250);
  }

  function showMapBackButton(state) {
    if (state.ui.mapBackButton) state.ui.mapBackButton.hidden = false;
  }

  function hideMapBackButton(state) {
    if (state.ui.mapBackButton) state.ui.mapBackButton.hidden = true;
  }

  function focusActivePanelHeading(state) {
    const panel = state.ui.panels.find(function (item) {
      return item.getAttribute('data-mode-panel') === state.mode;
    });
    if (!panel) return;
    const heading = panel.querySelector('h2, h3');
    if (!heading) return;
    heading.setAttribute('tabindex', '-1');
    heading.focus();
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
