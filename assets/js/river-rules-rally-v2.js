(function () {
  'use strict';

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const STORAGE_KEY = 'aarc-river-rules-rally-v3';

  document.addEventListener('DOMContentLoaded', function () {
    const root = document.querySelector('[data-river-tour]');
    if (!root) return;
    initRiverTour(root).catch(function (error) {
      console.error('River Rules Rally failed to load.', error);
      const title = root.querySelector('[data-current-title]');
      const description = root.querySelector('[data-current-description]');
      if (title) title.textContent = 'Map could not load';
      if (description) description.textContent = 'Check the processed course JSON path and rebuild the site.';
    });
  });

  async function initRiverTour(root) {
    const response = await fetch(root.getAttribute('data-course-url'), { cache: 'no-store' });
    if (!response.ok) throw new Error('Course JSON failed: ' + response.status);
    const course = await response.json();
    const ui = buildUi(root);
    const saved = loadSavedState();
    const state = {
      course: course,
      sectionId: course.sections[0].id,
      selectedId: firstSectionItemId(course.sections[0]),
      filter: 'all',
      viewed: new Set(saved.viewed || []),
      review: new Set(saved.review || []),
      answers: saved.answers || {}
    };

    bindEvents(ui, state);
    renderAll(ui, state);
  }

  function buildUi(root) {
    return {
      root: root,
      map: root.querySelector('[data-map]'),
      tabs: root.querySelector('[data-section-tabs]'),
      filterBar: root.querySelector('[data-filter-bar]'),
      progressCount: root.querySelector('[data-progress-count]'),
      progressLabel: root.querySelector('[data-progress-label]'),
      sectionTitle: root.querySelector('[data-section-title]'),
      sectionSummary: root.querySelector('[data-section-summary]'),
      sectionCount: root.querySelector('[data-section-count]'),
      stopList: root.querySelector('[data-stop-list]'),
      category: root.querySelector('[data-current-category]'),
      distance: root.querySelector('[data-current-distance]'),
      title: root.querySelector('[data-current-title]'),
      description: root.querySelector('[data-current-description]'),
      action: root.querySelector('[data-current-action]'),
      check: root.querySelector('[data-check]'),
      prev: root.querySelector('[data-action="prev"]'),
      next: root.querySelector('[data-action="next"]'),
      reviewButton: root.querySelector('[data-action="review"]')
    };
  }

  function bindEvents(ui, state) {
    ui.prev.addEventListener('click', function () {
      moveSelection(state, -1);
      renderAll(ui, state);
    });
    ui.next.addEventListener('click', function () {
      moveSelection(state, 1);
      renderAll(ui, state);
    });
    ui.reviewButton.addEventListener('click', function () {
      if (state.review.has(state.selectedId)) state.review.delete(state.selectedId);
      else state.review.add(state.selectedId);
      saveState(state);
      renderAll(ui, state);
    });
    window.addEventListener('resize', function () {
      renderMap(ui, state);
    });
  }

  function renderAll(ui, state) {
    ensureSelectionVisible(state);
    if (state.selectedId) state.viewed.add(state.selectedId);
    saveState(state);
    renderTabs(ui, state);
    renderFilters(ui, state);
    renderMap(ui, state);
    renderStopList(ui, state);
    renderCurrentStop(ui, state);
    renderProgress(ui, state);
  }

  function renderTabs(ui, state) {
    ui.tabs.innerHTML = '';
    state.course.sections.forEach(function (section) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'river-tour-tab';
      button.classList.toggle('is-selected', section.id === state.sectionId);
      button.textContent = section.name;
      button.addEventListener('click', function () {
        state.sectionId = section.id;
        state.filter = 'all';
        state.selectedId = getVisibleStops(state)[0]?.id || null;
        renderAll(ui, state);
      });
      ui.tabs.appendChild(button);
    });
  }

  function renderFilters(ui, state) {
    const sectionStops = getSectionItems(state);
    const categories = unique(sectionStops.map(function (stop) { return stop.category; }));
    const filters = ['all'].concat(categories);
    ui.filterBar.innerHTML = '';
    filters.forEach(function (category) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'river-tour-filter';
      button.classList.toggle('is-selected', state.filter === category);
      button.textContent = category === 'all' ? 'All markers' : state.course.categories[category] || category;
      button.addEventListener('click', function () {
        state.filter = category;
        state.selectedId = getVisibleStops(state)[0]?.id || null;
        renderAll(ui, state);
      });
      ui.filterBar.appendChild(button);
    });
  }

  function renderMap(ui, state) {
    const section = getSection(state);
    const stops = getSectionPointStops(state);
    const visibleItems = getVisibleStops(state);
    const visibleItemIds = visibleItems.map(function (item) { return item.id; });
    const lines = state.course.lines.filter(function (line) {
      return section.lineIds.indexOf(line.id) !== -1 && visibleItemIds.indexOf(line.id) !== -1;
    });
    const route = state.course.route.points;
    const bounds = getBounds(route);
    const width = 1000;
    const height = 680;
    const padding = 44;
    const scale = Math.min((width - padding * 2) / Math.max(1, bounds.maxX - bounds.minX), (height - padding * 2) / Math.max(1, bounds.maxY - bounds.minY));
    const project = function (point) {
      return {
        x: padding + ((point.x - bounds.minX) * scale),
        y: padding + ((point.y - bounds.minY) * scale)
      };
    };

    ui.map.innerHTML = '';
    ui.map.setAttribute('viewBox', '0 0 ' + width + ' ' + height);

    const routeLine = svg('polyline', {
      class: 'river-tour-map__route',
      points: route.map(function (point) {
        const p = project(point);
        return p.x.toFixed(1) + ',' + p.y.toFixed(1);
      }).join(' ')
    });
    ui.map.appendChild(routeLine);

    lines.forEach(function (line) {
      const points = line.projections.map(function (projection) {
        return routePointAt(state.course.route, projection.distanceMeters, projection.offsetMeters);
      }).map(project);
      const lineElement = svg('polyline', {
        class: lineClass(line, state),
        tabindex: '0',
        role: 'button',
        'data-stop-id': line.id,
        points: points.map(function (point) { return point.x.toFixed(1) + ',' + point.y.toFixed(1); }).join(' ')
      });
      lineElement.appendChild(svgTitle(line.title));
      lineElement.addEventListener('click', function () {
        state.selectedId = line.id;
        renderAll(ui, state);
      });
      lineElement.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          state.selectedId = line.id;
          renderAll(ui, state);
        }
      });
      ui.map.appendChild(lineElement);
    });

    stops.forEach(function (stop) {
      if (state.filter !== 'all' && stop.category !== state.filter) return;
      const p = project(routePointAt(state.course.route, stop.distanceMeters, stop.offsetMeters));
      const group = svg('g', {
        class: markerClass(stop, state, visibleItems),
        tabindex: '0',
        role: 'button',
        'data-stop-id': stop.id,
        transform: 'translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ')'
      });
      group.appendChild(svgTitle(stop.title));
      group.appendChild(svg('circle', { class: 'river-tour-map__marker-dot', r: markerRadius(stop) }));
      group.appendChild(svg('text', {
        class: 'river-tour-map__marker-symbol',
        'text-anchor': 'middle',
        dy: '5'
      }, markerSymbol(stop.category)));
      group.addEventListener('click', function () {
        state.selectedId = stop.id;
        renderAll(ui, state);
      });
      group.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          state.selectedId = stop.id;
          renderAll(ui, state);
        }
      });
      ui.map.appendChild(group);
    });
  }

  function renderStopList(ui, state) {
    const section = getSection(state);
    const stops = getVisibleStops(state);
    ui.sectionTitle.textContent = section.name;
    ui.sectionSummary.textContent = section.summary;
    ui.sectionCount.textContent = stops.length + ' stops';
    ui.stopList.innerHTML = '';
    stops.forEach(function (stop, index) {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'river-tour-stop';
      button.classList.toggle('is-selected', stop.id === state.selectedId);
      button.classList.toggle('is-viewed', state.viewed.has(stop.id));
      button.classList.toggle('needs-review', state.review.has(stop.id));
      button.innerHTML = '<span>' + (index + 1) + '</span><strong>' + escapeHtml(stop.title) + '</strong><small>' + escapeHtml(state.course.categories[stop.category] || stop.category) + '</small>';
      button.addEventListener('click', function () {
        state.selectedId = stop.id;
        renderAll(ui, state);
      });
      li.appendChild(button);
      ui.stopList.appendChild(li);
    });
  }

  function renderCurrentStop(ui, state) {
    const stop = getSelectedStop(state);
    if (!stop) return;
    ui.category.textContent = state.course.categories[stop.category] || stop.category;
    ui.distance.textContent = formatDistance(stop.distanceMeters);
    ui.title.textContent = stop.title;
    ui.description.textContent = stop.description || 'Map marker from the AARC river traffic map.';
    ui.action.textContent = stop.action || 'Review this point before rowing.';
    ui.reviewButton.classList.toggle('is-active', state.review.has(stop.id));
    ui.reviewButton.innerHTML = state.review.has(stop.id) ? '<i class="fas fa-bookmark"></i> Marked for review' : '<i class="fas fa-bookmark"></i> Needs review';
    renderCheck(ui, state, stop);
  }

  function renderCheck(ui, state, stop) {
    ui.check.innerHTML = '';
    if (!stop.check) {
      ui.check.hidden = true;
      return;
    }
    ui.check.hidden = false;
    const answer = state.answers[stop.id];
    const heading = document.createElement('h4');
    heading.textContent = 'Check yourself';
    const question = document.createElement('p');
    question.textContent = stop.check.question;
    const choices = document.createElement('div');
    choices.className = 'river-tour-check__choices';
    stop.check.choices.forEach(function (choice, index) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'river-tour-check__choice';
      button.classList.toggle('is-correct', answer !== undefined && index === stop.check.answer);
      button.classList.toggle('is-wrong', answer === index && index !== stop.check.answer);
      button.textContent = choice;
      button.addEventListener('click', function () {
        state.answers[stop.id] = index;
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
      feedback.textContent = answer === stop.check.answer ? stop.check.feedback : 'Review this one: ' + stop.check.feedback;
      ui.check.appendChild(feedback);
    }
  }

  function renderProgress(ui, state) {
    const allIds = state.course.sections.reduce(function (ids, section) {
      section.stopIds.forEach(function (id) { ids.add(id); });
      section.lineIds.forEach(function (id) { ids.add(id); });
      return ids;
    }, new Set());
    const viewedCount = Array.from(allIds).filter(function (id) { return state.viewed.has(id); }).length;
    const total = allIds.size;
    const sectionStops = getSectionItems(state);
    const sectionViewed = sectionStops.filter(function (stop) { return state.viewed.has(stop.id); }).length;
    ui.progressCount.textContent = viewedCount + ' of ' + total + ' map stops viewed';
    ui.progressLabel.textContent = sectionViewed + '/' + sectionStops.length + ' in this section';
  }

  function getSection(state) {
    return state.course.sections.find(function (section) { return section.id === state.sectionId; }) || state.course.sections[0];
  }

  function getSectionItems(state) {
    const section = getSection(state);
    const items = section.stopIds.concat(section.lineIds).map(function (id) {
      return getStopById(state, id);
    }).filter(Boolean);
    return items.sort(function (a, b) {
      return a.distanceMeters - b.distanceMeters || a.title.localeCompare(b.title);
    });
  }

  function getSectionPointStops(state) {
    const section = getSection(state);
    return section.stopIds.map(function (id) { return getStopById(state, id); }).filter(Boolean);
  }

  function getVisibleStops(state) {
    return getSectionItems(state).filter(function (stop) {
      return state.filter === 'all' || stop.category === state.filter;
    });
  }

  function getSelectedStop(state) {
    return getStopById(state, state.selectedId) || getVisibleStops(state)[0] || null;
  }

  function getStopById(state, id) {
    return state.course.stops.concat(state.course.lines).find(function (stop) { return stop.id === id; });
  }

  function ensureSelectionVisible(state) {
    const visible = getVisibleStops(state);
    if (!visible.length) {
      state.selectedId = null;
      return;
    }
    if (!visible.some(function (stop) { return stop.id === state.selectedId; })) {
      state.selectedId = visible[0].id;
    }
  }

  function moveSelection(state, direction) {
    const visible = getVisibleStops(state);
    if (!visible.length) return;
    const index = Math.max(0, visible.findIndex(function (stop) { return stop.id === state.selectedId; }));
    const nextIndex = clamp(index + direction, 0, visible.length - 1);
    state.selectedId = visible[nextIndex].id;
  }

  function routePointAt(route, distanceMeters, offsetMeters) {
    const points = route.points;
    const distance = clamp(distanceMeters, 0, route.lengthMeters);
    for (let index = 1; index < points.length; index += 1) {
      const a = points[index - 1];
      const b = points[index];
      if (distance <= b.distanceMeters || index === points.length - 1) {
        const span = Math.max(1, b.distanceMeters - a.distanceMeters);
        const t = clamp((distance - a.distanceMeters) / span, 0, 1);
        const x = lerp(a.x, b.x, t);
        const y = lerp(a.y, b.y, t);
        const tangent = normalize({ x: b.x - a.x, y: b.y - a.y });
        const normal = { x: -tangent.y, y: tangent.x };
        return {
          x: x + (normal.x * offsetMeters),
          y: y + (normal.y * offsetMeters)
        };
      }
    }
    return { x: points[points.length - 1].x, y: points[points.length - 1].y };
  }

  function getBounds(points) {
    return points.reduce(function (bounds, point) {
      bounds.minX = Math.min(bounds.minX, point.x);
      bounds.maxX = Math.max(bounds.maxX, point.x);
      bounds.minY = Math.min(bounds.minY, point.y);
      bounds.maxY = Math.max(bounds.maxY, point.y);
      return bounds;
    }, { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity });
  }

  function markerClass(stop, state, visibleStops) {
    return [
      'river-tour-map__marker',
      'river-tour-map__marker--' + stop.category,
      stop.id === state.selectedId ? 'is-selected' : '',
      state.viewed.has(stop.id) ? 'is-viewed' : '',
      state.review.has(stop.id) ? 'needs-review' : '',
      visibleStops.some(function (item) { return item.id === stop.id; }) ? '' : 'is-muted'
    ].filter(Boolean).join(' ');
  }

  function lineClass(line, state) {
    return [
      'river-tour-map__limit',
      'river-tour-map__limit--' + line.category,
      line.id === state.selectedId ? 'is-selected' : '',
      state.viewed.has(line.id) ? 'is-viewed' : '',
      state.review.has(line.id) ? 'needs-review' : ''
    ].filter(Boolean).join(' ');
  }

  function firstSectionItemId(section) {
    return (section.stopIds[0] || section.lineIds[0] || null);
  }

  function markerSymbol(category) {
    const symbols = {
      dock: 'D',
      direction: '>',
      turn: 'T',
      limit: '!',
      bridge: 'B',
      hazard: 'H',
      current: '~',
      corner: 'C',
      break: 'R'
    };
    return symbols[category] || 'M';
  }

  function markerRadius(stop) {
    if (stop.category === 'limit') return 14;
    if (stop.category === 'turn' || stop.category === 'bridge') return 12;
    return 10;
  }

  function formatDistance(distanceMeters) {
    return distanceMeters >= 1000 ? (distanceMeters / 1000).toFixed(1) + ' km' : Math.round(distanceMeters) + ' m';
  }

  function saveState(state) {
    const payload = {
      viewed: Array.from(state.viewed),
      review: Array.from(state.review),
      answers: state.answers
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      // Ignore localStorage failures; the tour should still work.
    }
  }

  function loadSavedState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch (error) {
      return {};
    }
  }

  function svg(tag, attrs, text) {
    const node = document.createElementNS(SVG_NS, tag);
    Object.keys(attrs || {}).forEach(function (key) {
      node.setAttribute(key, attrs[key]);
    });
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function svgTitle(text) {
    return svg('title', {}, text);
  }

  function unique(values) {
    return Array.from(new Set(values));
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function lerp(a, b, t) {
    return a + ((b - a) * t);
  }

  function normalize(vector) {
    const length = Math.hypot(vector.x, vector.y) || 1;
    return { x: vector.x / length, y: vector.y / length };
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
