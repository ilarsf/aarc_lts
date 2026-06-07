(function () {
  'use strict';

  const STORAGE_KEY = 'aarc-river-navigation-guide-v1';
  const DEFAULT_ZOOM = 17;

  document.addEventListener('DOMContentLoaded', function () {
    const root = document.querySelector('[data-river-navigation-guide]');
    if (!root) return;
    initRiverGuide(root).catch(function (error) {
      console.error('AARC River Navigation Guide failed to load.', error);
      const title = root.querySelector('[data-current-title]');
      const description = root.querySelector('[data-current-description]');
      if (title) title.textContent = 'Map could not load';
      if (description) description.textContent = error.message || 'Check the guide data path and map dependencies.';
    });
  });

  async function initRiverGuide(root) {
    const response = await fetch(root.getAttribute('data-course-url'), { cache: 'no-store' });
    if (!response.ok) throw new Error('Guide JSON failed: ' + response.status);
    if (!window.L) throw new Error('Leaflet did not load, so the zoomable satellite map is unavailable.');

    const course = await response.json();
    const ui = buildUi(root);
    const saved = loadSavedState();
    const firstMap = course.maps[0];
    const state = {
      course: course,
      guideMapId: saved.guideMapId || firstMap.id,
      selectedId: saved.selectedId || firstMap.keyPlaceIds[0],
      filter: 'all',
      showAllMarkers: false,
      viewed: new Set(saved.viewed || []),
      coachQuestions: new Set(saved.coachQuestions || []),
      answers: saved.answers || {},
      leafletMap: null,
      baseLayers: {},
      routeLayers: [],
      itemLayer: null,
      pendingFit: true,
      pendingCenter: false
    };

    initMap(ui, state);
    bindEvents(ui, state);
    renderAll(ui, state);
  }

  function buildUi(root) {
    return {
      root: root,
      map: root.querySelector('[data-map]'),
      mapSelectors: root.querySelector('[data-map-selectors]'),
      filterBar: root.querySelector('[data-filter-bar]'),
      toggleAllMarkers: root.querySelector('[data-action="toggle-all-markers"]'),
      progressCount: root.querySelector('[data-progress-count]'),
      progressLabel: root.querySelector('[data-progress-label]'),
      mapTitle: root.querySelector('[data-map-title]'),
      mapSummary: root.querySelector('[data-map-summary]'),
      keyPlaceCount: root.querySelector('[data-key-place-count]'),
      keyPlaceList: root.querySelector('[data-key-place-list]'),
      category: root.querySelector('[data-current-category]'),
      distance: root.querySelector('[data-current-distance]'),
      title: root.querySelector('[data-current-title]'),
      description: root.querySelector('[data-current-description]'),
      action: root.querySelector('[data-current-action]'),
      check: root.querySelector('[data-check]'),
      prev: root.querySelector('[data-action="prev"]'),
      next: root.querySelector('[data-action="next"]'),
      coachButton: root.querySelector('[data-action="coach-question"]'),
      fitMap: root.querySelector('[data-action="fit-map"]'),
      centerCurrent: root.querySelector('[data-action="center-current"]')
    };
  }

  function initMap(ui, state) {
    const routeLatLngs = state.course.route.coordinates.map(toLatLng);
    state.leafletMap = L.map(ui.map, {
      zoomControl: true,
      scrollWheelZoom: true,
      tap: true
    });

    const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri',
      maxZoom: 19
    }).addTo(state.leafletMap);
    const streets = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    });
    state.baseLayers = {
      Satellite: satellite,
      Streets: streets
    };
    L.control.layers(state.baseLayers, {}, { position: 'topleft' }).addTo(state.leafletMap);

    state.routeLayers.push(L.polyline(routeLatLngs, {
      color: '#ffffff',
      weight: 8,
      opacity: 0.86,
      interactive: false
    }).addTo(state.leafletMap));
    state.routeLayers.push(L.polyline(routeLatLngs, {
      color: '#167c96',
      weight: 4,
      opacity: 0.92,
      interactive: false
    }).addTo(state.leafletMap));

    state.itemLayer = L.layerGroup().addTo(state.leafletMap);
    state.leafletMap.fitBounds(L.latLngBounds(routeLatLngs), { padding: [26, 26] });
    window.setTimeout(function () {
      state.leafletMap.invalidateSize();
    }, 0);
  }

  function bindEvents(ui, state) {
    ui.prev.addEventListener('click', function () {
      moveSelection(state, -1);
      state.pendingCenter = true;
      renderAll(ui, state);
    });
    ui.next.addEventListener('click', function () {
      moveSelection(state, 1);
      state.pendingCenter = true;
      renderAll(ui, state);
    });
    ui.coachButton.addEventListener('click', function () {
      if (state.coachQuestions.has(state.selectedId)) state.coachQuestions.delete(state.selectedId);
      else state.coachQuestions.add(state.selectedId);
      saveState(state);
      renderAll(ui, state);
    });
    ui.fitMap.addEventListener('click', function () {
      state.pendingFit = true;
      renderMap(ui, state);
    });
    ui.centerCurrent.addEventListener('click', function () {
      state.pendingCenter = true;
      renderMap(ui, state);
    });
    ui.toggleAllMarkers.addEventListener('click', function () {
      state.showAllMarkers = !state.showAllMarkers;
      if (!state.showAllMarkers && !isKeyPlace(state, state.selectedId) && !isMapLine(state, state.selectedId)) {
        state.selectedId = getKeyPlaces(state)[0]?.id || null;
      }
      state.pendingFit = true;
      renderAll(ui, state);
    });
  }

  function renderAll(ui, state) {
    ensureSelectedItem(state);
    if (state.selectedId) state.viewed.add(state.selectedId);
    saveState(state);
    renderMapSelectors(ui, state);
    renderFilters(ui, state);
    renderMap(ui, state);
    renderKeyPlaces(ui, state);
    renderCurrentPlace(ui, state);
    renderProgress(ui, state);
  }

  function renderMapSelectors(ui, state) {
    ui.mapSelectors.innerHTML = '';
    state.course.maps.forEach(function (guideMap) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'river-tour-map-selector';
      button.classList.toggle('is-selected', guideMap.id === state.guideMapId);
      button.innerHTML = '<strong>' + escapeHtml(guideMap.name) + '</strong><span>' + escapeHtml(guideMap.summary) + '</span>';
      button.addEventListener('click', function () {
        state.guideMapId = guideMap.id;
        state.filter = 'all';
        state.showAllMarkers = false;
        state.selectedId = getKeyPlaces(state)[0]?.id || null;
        state.pendingFit = true;
        renderAll(ui, state);
      });
      ui.mapSelectors.appendChild(button);
    });
  }

  function renderFilters(ui, state) {
    const categories = unique(getMapItems(state).map(function (item) { return item.category; }));
    const filters = ['all'].concat(categories);
    ui.toggleAllMarkers.classList.toggle('is-selected', state.showAllMarkers);
    ui.toggleAllMarkers.textContent = state.showAllMarkers ? 'Showing all markers' : 'Show all markers';
    ui.filterBar.innerHTML = '';
    filters.forEach(function (category) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'river-tour-filter';
      button.classList.toggle('is-selected', state.filter === category);
      button.textContent = category === 'all' ? 'All marker types' : state.course.categories[category] || category;
      button.addEventListener('click', function () {
        state.filter = category;
        if (state.showAllMarkers && !isRenderedItem(state, state.selectedId)) {
          state.selectedId = getKeyPlaces(state)[0]?.id || null;
        }
        state.pendingFit = true;
        renderAll(ui, state);
      });
      ui.filterBar.appendChild(button);
    });
  }

  function renderMap(ui, state) {
    state.itemLayer.clearLayers();
    const rendered = getRenderedItems(state);
    const selected = getSelectedItem(state);
    const boundsPoints = [];

    rendered.lines.forEach(function (line) {
      const latLngs = line.coordinates.map(toLatLng);
      latLngs.forEach(function (latLng) { boundsPoints.push(latLng); });
      const polyline = L.polyline(latLngs, {
        className: lineClass(line, state),
        color: line.id === state.selectedId ? '#101820' : lineColor(line),
        weight: lineWeight(line, state),
        opacity: lineOpacity(line, state),
        dashArray: lineDash(line)
      }).addTo(state.itemLayer);
      polyline.bindTooltip(tooltipText(line, state), { sticky: true });
      polyline.on('click', function () {
        selectItem(ui, state, line.id, true);
      });
    });

    rendered.stops.forEach(function (stop) {
      const latLng = toLatLng(stop.coordinates[0]);
      boundsPoints.push(latLng);
      const marker = L.marker(latLng, {
        icon: markerIcon(stop, state),
        title: stop.title,
        keyboard: true
      }).addTo(state.itemLayer);
      marker.bindTooltip(tooltipText(stop, state), { direction: 'top', offset: [0, -12] });
      marker.on('click', function () {
        selectItem(ui, state, stop.id, true);
      });
    });

    if (state.pendingFit) {
      fitToItems(state, boundsPoints);
      state.pendingFit = false;
    }
    if (state.pendingCenter && selected) {
      centerItem(state, selected);
      state.pendingCenter = false;
    }
  }

  function selectItem(ui, state, id, center) {
    state.selectedId = id;
    state.pendingCenter = !!center;
    renderAll(ui, state);
  }

  function renderKeyPlaces(ui, state) {
    const guideMap = getGuideMap(state);
    const keyPlaces = getKeyPlaces(state);
    ui.mapTitle.textContent = guideMap.name;
    ui.mapSummary.textContent = guideMap.summary;
    ui.keyPlaceCount.textContent = itemCountLabel(keyPlaces.length);
    ui.keyPlaceList.innerHTML = '';
    keyPlaces.forEach(function (item, index) {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'river-tour-stop';
      button.classList.toggle('is-selected', item.id === state.selectedId);
      button.classList.toggle('is-viewed', state.viewed.has(item.id));
      button.classList.toggle('ask-coach', state.coachQuestions.has(item.id));
      button.innerHTML = '<span>' + (index + 1) + '</span><strong>' + escapeHtml(item.title) + '</strong><small>' + escapeHtml(state.course.categories[item.category] || item.category) + '</small>';
      button.addEventListener('click', function () {
        state.selectedId = item.id;
        state.pendingCenter = true;
        renderAll(ui, state);
      });
      li.appendChild(button);
      ui.keyPlaceList.appendChild(li);
    });
  }

  function renderCurrentPlace(ui, state) {
    const item = getSelectedItem(state);
    if (!item) return;
    const isKey = isKeyPlace(state, item.id);
    ui.category.textContent = isPracticeGate(item)
      ? 'Coach boundary context'
      : isKey ? state.course.categories[item.category] || item.category : 'Additional map marker';
    ui.distance.textContent = formatRoutePositions(item);
    ui.title.textContent = item.title;
    ui.description.textContent = item.description || 'Local marker from the AARC river traffic map.';
    ui.action.textContent = item.action || 'Review this location before rowing the route.';
    ui.coachButton.classList.toggle('is-active', state.coachQuestions.has(item.id));
    ui.coachButton.innerHTML = state.coachQuestions.has(item.id)
      ? '<i class="fas fa-bookmark"></i> Coach question noted'
      : '<i class="fas fa-bookmark"></i> Ask coach about this';
    renderCheck(ui, state, item);
  }

  function renderCheck(ui, state, item) {
    ui.check.innerHTML = '';
    if (!item.check) {
      ui.check.hidden = true;
      return;
    }
    ui.check.hidden = false;
    const answer = state.answers[item.id];
    const heading = document.createElement('h4');
    heading.textContent = 'Check yourself';
    const question = document.createElement('p');
    question.textContent = item.check.question;
    const choices = document.createElement('div');
    choices.className = 'river-tour-check__choices';
    item.check.choices.forEach(function (choice, index) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'river-tour-check__choice';
      button.classList.toggle('is-correct', answer !== undefined && index === item.check.answer);
      button.classList.toggle('is-wrong', answer === index && index !== item.check.answer);
      button.textContent = choice;
      button.addEventListener('click', function () {
        state.answers[item.id] = index;
        saveState(state);
        renderAll(ui, state);
      });
      choices.appendChild(button);
    });
    ui.check.appendChild(heading);
    ui.check.appendChild(question);
    ui.check.appendChild(choices);
    if (answer !== undefined) {
      const feedback = document.createElement('p');
      feedback.className = 'river-tour-check__feedback';
      feedback.textContent = answer === item.check.answer ? item.check.feedback : 'Review this point: ' + item.check.feedback;
      ui.check.appendChild(feedback);
    }
  }

  function renderProgress(ui, state) {
    const allKeyIds = state.course.maps.reduce(function (ids, guideMap) {
      guideMap.keyPlaceIds.forEach(function (id) { ids.add(id); });
      return ids;
    }, new Set());
    const viewedCount = Array.from(allKeyIds).filter(function (id) { return state.viewed.has(id); }).length;
    const keyPlaces = getKeyPlaces(state);
    const mapViewed = keyPlaces.filter(function (item) { return state.viewed.has(item.id); }).length;
    ui.progressCount.textContent = viewedCount + ' of ' + allKeyIds.size + ' key places viewed';
    ui.progressLabel.textContent = mapViewed + '/' + keyPlaces.length + ' on this map';
  }

  function getRenderedItems(state) {
    const guideMap = getGuideMap(state);
    const keyIds = new Set(guideMap.keyPlaceIds);
    const lines = guideMap.lineIds.map(function (id) { return getItemById(state, id); }).filter(Boolean);
    const keyStops = guideMap.keyPlaceIds.map(function (id) { return getItemById(state, id); }).filter(function (item) {
      return item && item.geometry !== 'LineString';
    });
    const additionalStops = state.showAllMarkers ? guideMap.markerIds.map(function (id) {
      return getItemById(state, id);
    }).filter(function (item) {
      return item && item.geometry !== 'LineString' && !keyIds.has(item.id) && matchesFilter(state, item);
    }) : [];
    return {
      stops: uniqueItems(keyStops.concat(additionalStops)),
      lines: uniqueItems(lines)
    };
  }

  function getMapItems(state) {
    const guideMap = getGuideMap(state);
    return uniqueItems(guideMap.markerIds.concat(guideMap.lineIds).map(function (id) {
      return getItemById(state, id);
    }).filter(Boolean));
  }

  function getKeyPlaces(state) {
    const guideMap = getGuideMap(state);
    return guideMap.keyPlaceIds.map(function (id) {
      return getItemById(state, id);
    }).filter(Boolean);
  }

  function getGuideMap(state) {
    return state.course.maps.find(function (guideMap) { return guideMap.id === state.guideMapId; }) || state.course.maps[0];
  }

  function getSelectedItem(state) {
    return getItemById(state, state.selectedId) || getKeyPlaces(state)[0] || null;
  }

  function getItemById(state, id) {
    if (!id) return null;
    return state.course.stops.concat(state.course.lines).find(function (item) { return item.id === id; });
  }

  function ensureSelectedItem(state) {
    const selected = getSelectedItem(state);
    if (!selected) {
      state.selectedId = null;
      return;
    }
    if (!isRenderedItem(state, selected.id) && !isKeyPlace(state, selected.id)) {
      state.selectedId = getKeyPlaces(state)[0]?.id || null;
    }
  }

  function isRenderedItem(state, id) {
    const rendered = getRenderedItems(state);
    return rendered.stops.concat(rendered.lines).some(function (item) { return item.id === id; });
  }

  function isKeyPlace(state, id) {
    return getGuideMap(state).keyPlaceIds.indexOf(id) !== -1;
  }

  function isMapLine(state, id) {
    return getGuideMap(state).lineIds.indexOf(id) !== -1;
  }

  function matchesFilter(state, item) {
    return state.filter === 'all' || item.category === state.filter;
  }

  function moveSelection(state, direction) {
    const keyPlaces = getKeyPlaces(state);
    if (!keyPlaces.length) return;
    const currentIndex = keyPlaces.findIndex(function (item) { return item.id === state.selectedId; });
    const fallbackIndex = direction > 0 ? 0 : keyPlaces.length - 1;
    const index = currentIndex === -1 ? fallbackIndex : currentIndex;
    const nextIndex = clamp(index + direction, 0, keyPlaces.length - 1);
    state.selectedId = keyPlaces[nextIndex].id;
  }

  function markerIcon(item, state) {
    const classes = [
      'river-tour-leaflet-marker',
      'river-tour-leaflet-marker--' + item.category,
      item.id === state.selectedId ? 'is-selected' : '',
      state.viewed.has(item.id) ? 'is-viewed' : '',
      state.coachQuestions.has(item.id) ? 'ask-coach' : '',
      isKeyPlace(state, item.id) ? 'is-key-place' : 'is-additional-marker'
    ].filter(Boolean).join(' ');
    return L.divIcon({
      className: classes,
      html: '<span>' + markerLabel(item.category) + '</span>',
      iconSize: [56, 30],
      iconAnchor: [28, 15]
    });
  }

  function lineClass(item, state) {
    return [
      'river-tour-leaflet-line',
      'river-tour-leaflet-line--' + item.category,
      isPracticeGate(item) ? 'is-practice-gate' : '',
      item.id === state.selectedId ? 'is-selected' : '',
      state.viewed.has(item.id) ? 'is-viewed' : '',
      state.coachQuestions.has(item.id) ? 'ask-coach' : ''
    ].filter(Boolean).join(' ');
  }

  function markerLabel(category) {
    const labels = {
      dock: 'Dock',
      direction: 'Flow',
      turn: 'Turn',
      limit: 'Gate',
      bridge: 'Bridge',
      hazard: 'Hazard',
      current: 'Drift',
      corner: 'Bend',
      break: 'Break',
      marker: 'Info'
    };
    return labels[category] || 'Info';
  }

  function lineColor(item) {
    if (item.id === 'no-rowing-beyond-this-point') return '#d0272f';
    if (item.id === 'end-point') return '#6a3db5';
    if (isPracticeGate(item)) return '#f0c64b';
    return '#e0a51f';
  }

  function lineWeight(item, state) {
    if (item.id === state.selectedId) return isPracticeGate(item) ? 5 : 7;
    return isPracticeGate(item) ? 3 : 5;
  }

  function lineOpacity(item, state) {
    if (item.id === state.selectedId) return 0.95;
    return isPracticeGate(item) ? 0.72 : 0.96;
  }

  function lineDash(item) {
    if (isPracticeGate(item)) return '4 10';
    if (item.id === 'end-point') return '4 6';
    return '12 8';
  }

  function isPracticeGate(item) {
    return item && item.id && item.id.indexOf('lts-') === 0;
  }

  function tooltipText(item, state) {
    const status = isPracticeGate(item)
      ? 'Coach boundary context'
      : isKeyPlace(state, item.id) ? 'Key place' : 'Additional marker';
    return item.title + ' - ' + status;
  }

  function fitToItems(state, latLngs) {
    const points = latLngs.length ? latLngs : state.course.route.coordinates.map(toLatLng);
    const bounds = L.latLngBounds(points);
    state.leafletMap.fitBounds(bounds, {
      padding: [34, 34],
      maxZoom: DEFAULT_ZOOM
    });
  }

  function centerItem(state, item) {
    const latLng = item.geometry === 'LineString'
      ? L.latLngBounds(item.coordinates.map(toLatLng)).getCenter()
      : toLatLng(item.coordinates[0]);
    state.leafletMap.setView(latLng, Math.max(state.leafletMap.getZoom(), DEFAULT_ZOOM), { animate: true });
  }

  function formatRoutePositions(item) {
    const positions = item.routePositions || [item.distanceMeters];
    const label = positions.length > 1 ? 'Route positions: ' : 'Route position: ';
    return label + positions.map(formatDistance).join(', ');
  }

  function formatDistance(distanceMeters) {
    return distanceMeters >= 1000 ? (distanceMeters / 1000).toFixed(1) + ' km' : Math.round(distanceMeters) + ' m';
  }

  function itemCountLabel(count) {
    return count === 1 ? '1 key place' : count + ' key places';
  }

  function toLatLng(coord) {
    return [coord.lat, coord.lon];
  }

  function saveState(state) {
    const payload = {
      guideMapId: state.guideMapId,
      selectedId: state.selectedId,
      viewed: Array.from(state.viewed),
      coachQuestions: Array.from(state.coachQuestions),
      answers: state.answers
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      // The guide remains usable without persistence.
    }
  }

  function loadSavedState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch (error) {
      return {};
    }
  }

  function unique(values) {
    return Array.from(new Set(values));
  }

  function uniqueItems(items) {
    const ids = new Set();
    return items.filter(function (item) {
      if (ids.has(item.id)) return false;
      ids.add(item.id);
      return true;
    });
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
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
