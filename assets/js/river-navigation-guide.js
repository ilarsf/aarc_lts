(function () {
  'use strict';

  const STORAGE_KEY = 'aarc-river-navigation-guide-v3';
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
    if (!window.L) throw new Error('Leaflet did not load, so the zoomable satellite course map is unavailable.');

    const course = await response.json();
    const ui = buildUi(root);
    const saved = loadSavedState();
    const firstMap = course.maps[0];
    const state = {
      course: course,
      guideMapId: saved.guideMapId || firstMap.id,
      selectedId: saved.selectedId || firstMap.keyPlaceIds[0],
      viewed: new Set(saved.viewed || []),
      coachQuestions: new Set(saved.coachQuestions || []),
      answers: saved.answers || {},
      leafletMap: null,
      baseLayers: {},
      routeLayer: null,
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
      fitBridge: root.querySelector('[data-action="fit-bridge"]'),
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

    state.routeLayer = L.layerGroup().addTo(state.leafletMap);
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
    ui.fitBridge.addEventListener('click', function () {
      fitBridgePattern(state);
    });
    ui.centerCurrent.addEventListener('click', function () {
      state.pendingCenter = true;
      renderMap(ui, state);
    });
  }

  function renderAll(ui, state) {
    ensureSelectedItem(state);
    if (state.selectedId) state.viewed.add(state.selectedId);
    saveState(state);
    renderMapSelectors(ui, state);
    renderMapTools(ui, state);
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
        state.selectedId = getKeyPlaces(state)[0]?.id || null;
        state.pendingFit = true;
        renderAll(ui, state);
      });
      ui.mapSelectors.appendChild(button);
    });
  }

  function renderMapTools(ui, state) {
    const guideMap = getGuideMap(state);
    ui.fitBridge.hidden = !(guideMap.bridgeFocusIds && guideMap.bridgeFocusIds.length);
  }

  function renderMap(ui, state) {
    state.routeLayer.clearLayers();
    state.itemLayer.clearLayers();
    const rendered = getRenderedItems(state);
    const selected = getSelectedItem(state);
    const boundsPoints = renderRoute(state);

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
        title: itemLabel(stop),
        keyboard: true
      }).addTo(state.itemLayer);
      marker.bindTooltip(tooltipText(stop, state), { direction: 'top', offset: [0, -12] });
      marker.on('click', function () {
        selectItem(ui, state, stop.id, true);
      });
    });

    renderSelectedFocus(state, selected);

    if (state.pendingFit) {
      fitToItems(state, boundsPoints);
      state.pendingFit = false;
    }
    if (state.pendingCenter && selected) {
      centerItem(state, selected);
      state.pendingCenter = false;
    }
  }

  function renderRoute(state) {
    const segments = getRouteSegments(state);
    const boundsPoints = [];
    segments.forEach(function (segment) {
      segment.forEach(function (latLng) { boundsPoints.push(latLng); });
      L.polyline(segment, {
        className: 'river-tour-route-underlay',
        color: '#ffffff',
        weight: 8,
        opacity: 0.86,
        interactive: false
      }).addTo(state.routeLayer);
      L.polyline(segment, {
        className: 'river-tour-route-line',
        color: '#167c96',
        weight: 4,
        opacity: 0.94,
        interactive: false
      }).addTo(state.routeLayer);
    });
    return boundsPoints;
  }

  function getRouteSegments(state) {
    const guideMap = getGuideMap(state);
    const ranges = guideMap.routeRanges || [[0, state.course.route.lengthMeters]];
    return ranges.map(function (range) {
      const segment = [];
      state.course.route.coordinates.forEach(function (coord, index) {
        const point = state.course.route.points[index];
        if (point && point.distanceMeters >= range[0] && point.distanceMeters <= range[1]) {
          segment.push(toLatLng(coord));
        }
      });
      return segment;
    }).filter(function (segment) {
      return segment.length > 1;
    });
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
      button.classList.toggle('has-check', isCourseCheck(state, item.id));
      button.classList.toggle('is-check-correct', isCorrectAnswer(state, item));
      button.classList.toggle('is-check-wrong', isAnsweredCheck(state, item) && !isCorrectAnswer(state, item));
      const detailParts = [state.course.categories[item.category] || item.category];
      const checkStatus = checkStatusLabel(state, item);
      if (checkStatus) detailParts.push(checkStatus);
      button.innerHTML = '<span>' + (index + 1) + '</span><strong>' + escapeHtml(itemLabel(item)) + '</strong><small>' + escapeHtml(detailParts.join(' · ')) + '</small>';
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
      ? 'Coach route limit'
      : isKey ? state.course.categories[item.category] || item.category : 'River marker';
    ui.distance.textContent = formatRoutePositions(item);
    ui.title.textContent = itemLabel(item);
    ui.description.textContent = item.description || 'Review this location before rowing the route.';
    ui.action.textContent = item.action || 'Review this location before rowing the route.';
    ui.coachButton.classList.toggle('is-active', state.coachQuestions.has(item.id));
    ui.coachButton.innerHTML = state.coachQuestions.has(item.id)
      ? '<i class="fas fa-bookmark"></i> Coach question noted'
      : '<i class="fas fa-bookmark"></i> Ask coach about this';
    renderCheck(ui, state, item);
  }

  function renderCheck(ui, state, item) {
    ui.check.innerHTML = '';
    if (!isCourseCheck(state, item.id)) {
      ui.check.hidden = true;
      return;
    }
    ui.check.hidden = false;
    const courseChecks = getCourseChecks(state);
    const checkIndex = courseChecks.findIndex(function (checkItem) { return checkItem.id === item.id; });
    const answer = state.answers[item.id];
    const answered = answer !== undefined;
    const correct = isCorrectAnswer(state, item);
    const heading = document.createElement('h4');
    heading.textContent = 'Course check ' + (checkIndex + 1) + ' of ' + courseChecks.length;
    const question = document.createElement('p');
    question.textContent = item.check.question;
    const choices = document.createElement('div');
    choices.className = 'river-tour-check__choices';
    item.check.choices.forEach(function (choice, index) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'river-tour-check__choice';
      button.classList.toggle('is-selected', answer === index);
      button.classList.toggle('is-correct', answered && index === item.check.answer);
      button.classList.toggle('is-wrong', answer === index && index !== item.check.answer);
      button.setAttribute('aria-pressed', answer === index ? 'true' : 'false');
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
    if (answered) {
      const feedback = document.createElement('p');
      feedback.className = 'river-tour-check__feedback';
      feedback.textContent = correct ? 'Correct. ' + item.check.feedback : 'Review this point: ' + item.check.feedback;
      ui.check.appendChild(feedback);

      const actions = document.createElement('div');
      actions.className = 'river-tour-check__actions';
      if (!correct) {
        const retry = document.createElement('button');
        retry.type = 'button';
        retry.className = 'river-tour-check__action';
        retry.textContent = 'Try again';
        retry.addEventListener('click', function () {
          delete state.answers[item.id];
          saveState(state);
          renderAll(ui, state);
        });
        actions.appendChild(retry);
      } else {
        const nextCheck = getNextCourseCheck(state, item.id);
        if (nextCheck) {
          const next = document.createElement('button');
          next.type = 'button';
          next.className = 'river-tour-check__action river-tour-check__action--primary';
          next.textContent = 'Next check';
          next.addEventListener('click', function () {
            state.selectedId = nextCheck.id;
            state.pendingCenter = true;
            renderAll(ui, state);
          });
          actions.appendChild(next);
        }
      }
      if (actions.childNodes.length) ui.check.appendChild(actions);
    }
  }

  function renderProgress(ui, state) {
    const allKeyIds = state.course.maps.reduce(function (ids, guideMap) {
      guideMap.keyPlaceIds.forEach(function (id) { ids.add(id); });
      return ids;
    }, new Set());
    const viewedCount = Array.from(allKeyIds).filter(function (id) { return state.viewed.has(id); }).length;
    const allCheckIds = state.course.maps.reduce(function (ids, guideMap) {
      (guideMap.checkPlaceIds || []).forEach(function (id) { ids.add(id); });
      return ids;
    }, new Set());
    const correctCheckCount = Array.from(allCheckIds).filter(function (id) {
      return isCorrectAnswer(state, getItemById(state, id));
    }).length;
    const keyPlaces = getKeyPlaces(state);
    const mapViewed = keyPlaces.filter(function (item) { return state.viewed.has(item.id); }).length;
    const courseChecks = getCourseChecks(state);
    const courseCorrect = courseChecks.filter(function (item) { return isCorrectAnswer(state, item); }).length;
    ui.progressCount.textContent = viewedCount + ' of ' + allKeyIds.size + ' key places viewed'
      + (allCheckIds.size ? ' · ' + correctCheckCount + ' of ' + allCheckIds.size + ' checks correct' : '');
    ui.progressLabel.textContent = mapViewed + '/' + keyPlaces.length + ' on this course'
      + (courseChecks.length ? ' · ' + courseCorrect + '/' + courseChecks.length + ' checks correct' : '');
  }

  function getRenderedItems(state) {
    const guideMap = getGuideMap(state);
    const lines = guideMap.lineIds.map(function (id) { return getItemById(state, id); }).filter(Boolean);
    const stops = guideMap.markerIds.map(function (id) {
      return getItemById(state, id);
    }).filter(function (item) {
      return item && item.geometry !== 'LineString';
    });
    return {
      stops: uniqueItems(stops),
      lines: uniqueItems(lines)
    };
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

  function isCourseCheck(state, id) {
    const item = getItemById(state, id);
    return !!(item && item.check && (getGuideMap(state).checkPlaceIds || []).indexOf(id) !== -1);
  }

  function getCourseChecks(state) {
    const guideMap = getGuideMap(state);
    return (guideMap.checkPlaceIds || []).map(function (id) {
      return getItemById(state, id);
    }).filter(function (item) {
      return item && item.check;
    });
  }

  function getNextCourseCheck(state, id) {
    const checks = getCourseChecks(state);
    const currentIndex = checks.findIndex(function (item) { return item.id === id; });
    if (currentIndex === -1 || currentIndex >= checks.length - 1) return null;
    return checks[currentIndex + 1];
  }

  function isAnsweredCheck(state, item) {
    return !!(item && item.check && state.answers[item.id] !== undefined);
  }

  function isCorrectAnswer(state, item) {
    return !!(item && item.check && state.answers[item.id] === item.check.answer);
  }

  function checkStatusLabel(state, item) {
    if (!isCourseCheck(state, item.id)) return '';
    if (!isAnsweredCheck(state, item)) return 'Course check';
    return isCorrectAnswer(state, item) ? 'Check complete' : 'Review check';
  }

  function isMapLine(state, id) {
    return getGuideMap(state).lineIds.indexOf(id) !== -1;
  }

  function moveSelection(state, direction) {
    const keyPlaces = getKeyPlaces(state);
    if (!keyPlaces.length) return;
    const currentIndex = keyPlaces.findIndex(function (item) { return item.id === state.selectedId; });
    const nextIndex = currentIndex === -1
      ? (direction > 0 ? 0 : keyPlaces.length - 1)
      : clamp(currentIndex + direction, 0, keyPlaces.length - 1);
    state.selectedId = keyPlaces[nextIndex].id;
  }

  function markerIcon(item, state) {
    const classes = [
      'river-tour-leaflet-marker',
      'river-tour-leaflet-marker--' + item.category,
      item.id === state.selectedId ? 'is-selected' : '',
      state.viewed.has(item.id) ? 'is-viewed' : '',
      state.coachQuestions.has(item.id) ? 'ask-coach' : '',
      isKeyPlace(state, item.id) ? 'is-key-place' : 'is-additional-marker',
      isCourseCheck(state, item.id) ? 'has-check' : '',
      isCorrectAnswer(state, item) ? 'is-check-correct' : '',
      isAnsweredCheck(state, item) && !isCorrectAnswer(state, item) ? 'is-check-wrong' : ''
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
    return itemLabel(item);
  }

  function fitBridgePattern(state) {
    const guideMap = getGuideMap(state);
    const bridgeIds = guideMap.bridgeFocusIds || [];
    if (!bridgeIds.length) return;
    const latLngs = bridgeIds.map(function (id) {
      return getItemById(state, id);
    }).filter(Boolean).reduce(function (points, item) {
      return points.concat(itemLatLngs(item));
    }, []);
    fitToItems(state, latLngs);
  }

  function renderSelectedFocus(state, item) {
    if (!item) return;
    if (item.geometry === 'LineString') {
      const latLngs = item.coordinates.map(toLatLng);
      const selectedLine = L.polyline(latLngs, {
        className: 'river-tour-selected-line',
        color: '#101820',
        weight: 9,
        opacity: 0.86,
        interactive: false
      }).addTo(state.itemLayer);
      selectedLine.bindTooltip(itemLabel(item), {
        permanent: true,
        direction: 'center',
        className: 'river-tour-selected-tooltip'
      }).openTooltip();
      return;
    }

    const latLng = toLatLng(item.coordinates[0]);
    L.circleMarker(latLng, {
      className: 'river-tour-selected-halo',
      radius: 22,
      color: '#101820',
      weight: 4,
      opacity: 0.96,
      fillColor: '#ffffff',
      fillOpacity: 0.18,
      interactive: false
    }).addTo(state.itemLayer);
    L.tooltip({
      permanent: true,
      direction: 'top',
      offset: [0, -26],
      className: 'river-tour-selected-tooltip'
    }).setLatLng(latLng).setContent(itemLabel(item)).addTo(state.itemLayer);
  }

  function itemLabel(item) {
    return item.displayTitle || item.title;
  }

  function itemLatLngs(item) {
    return item.coordinates.map(toLatLng);
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
