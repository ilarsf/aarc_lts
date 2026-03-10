(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        const root = document.querySelector('[data-river-trainer]');
        if (!root) return;
        initRiverTrainer(root).catch(function (error) {
            console.error('River trainer failed to initialize.', error);
            const message = root.querySelector('[data-game-message]');
            if (message) {
                message.textContent = 'The river trainer could not load. Check the course JSON path and try again.';
                message.classList.add('is-danger');
            }
        });
    });

    const MODES = {
        demo: {
            label: 'Coach demo',
            summary: 'Autopilot shows the correct line and explains each landmark.',
            showIdealLine: true,
            showRiskLabels: true,
            pauseOnWarn: false,
            pauseOnFail: false,
            autopilot: true,
            hintWindow: 999
        },
        guided: {
            label: 'Guided practice',
            summary: 'You row the route. Coach prompts and the ideal line remain visible.',
            showIdealLine: true,
            showRiskLabels: true,
            pauseOnWarn: true,
            pauseOnFail: true,
            autopilot: false,
            hintWindow: 4.5
        },
        assessment: {
            label: 'Assessment mode',
            summary: 'Minimal prompts. Your feedback arrives in the debrief.',
            showIdealLine: false,
            showRiskLabels: false,
            pauseOnWarn: false,
            pauseOnFail: false,
            autopilot: false,
            hintWindow: 3.6
        }
    };

    const CONFIG = {
        width: 1100,
        height: 640,
        playerScreenX: 550,
        playerScreenY: 462,
        laneDisciplineThreshold: 2.2,
        awarenessDecay: 7.8,
        awarenessRecover: 100,
        lookDuration: 1.4,
        maxSpeed: 11.2,
        cruiseSpeed: 6.2,
        holdWaterSpeed: 1.0,
        touchScaleCap: 2,
        collisionPenalty: 16,
        courtesyPenalty: 8,
        featurePassScore: 140,
        featureWarnScore: 55,
        featureFailScore: -80,
        passScore: 95,
        nearMissScore: 18,
        mapPadding: 22
    };

    async function initRiverTrainer(root) {
        const courseUrl = root.getAttribute('data-course-url');
        const course = normalizeCourse(await loadCourse(courseUrl));
        const ui = buildUi(root);
        const state = createState(course);
        bindEvents(ui, state);
        buildMenu(ui, state);
        resizeCanvas(ui.canvas, ui.ctx);
        resizeCanvas(ui.minimap, ui.minimapCtx, true);
        syncOverlay(ui, state, 'menu');
        syncHud(ui, state);
        requestAnimationFrame(function frame(timestamp) {
            tick(timestamp, ui, state);
            requestAnimationFrame(frame);
        });
    }

    async function loadCourse(url) {
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error('Could not load course JSON from ' + url + ' (' + response.status + ')');
        }
        return response.json();
    }

    function normalizeCourse(data) {
        const packs = (data.packs || []).map(function (pack) {
            const route = preprocessRoute(pack.route || []);
            return {
                id: pack.id,
                name: pack.name,
                badge: pack.badge || '',
                summary: pack.summary || '',
                outboundLabel: pack.outboundLabel || 'Outbound',
                returnLabel: pack.returnLabel || 'Return',
                briefing: Array.isArray(pack.briefing) ? pack.briefing.slice() : [],
                route: route,
                halfLength: route.totalLength,
                features: (pack.features || []).map(function (feature) {
                    return {
                        id: feature.id,
                        type: feature.type,
                        position: clamp(feature.position || 0, 0, route.totalLength),
                        title: feature.title || '',
                        brief: feature.brief || '',
                        alignment: feature.alignment || null,
                        lookDistance: feature.lookDistance || 160,
                        commitDistance: feature.commitDistance || 90,
                        stopOffset: feature.stopOffset || 22,
                        crossTarget: feature.crossTarget || -26,
                        clearDistance: feature.clearDistance || 110,
                        appliesLeg: Array.isArray(feature.appliesLeg) ? feature.appliesLeg.slice() : feature.type === 'turn' ? ['outbound'] : ['outbound', 'return'],
                        render: feature.render || null
                    };
                }),
                hazards: (pack.hazards || []).map(function (hazard) {
                    return {
                        id: hazard.id,
                        start: clamp(hazard.start || 0, 0, route.totalLength),
                        end: clamp(hazard.end || 0, 0, route.totalLength),
                        bankSign: hazard.bankSign || 1,
                        thresholdFromBank: hazard.thresholdFromBank || 18,
                        title: hazard.title || '',
                        brief: hazard.brief || '',
                        appliesLeg: Array.isArray(hazard.appliesLeg) ? hazard.appliesLeg.slice() : ['outbound', 'return']
                    };
                }),
                actors: (pack.actors || []).map(function (actor, index) {
                    return {
                        id: actor.id || 'actor-' + index,
                        kind: actor.kind || 'shell',
                        appliesLeg: Array.isArray(actor.appliesLeg) ? actor.appliesLeg.slice() : ['outbound'],
                        position: clamp(actor.position || 0, 0, route.totalLength),
                        travelSign: typeof actor.travelSign === 'number' ? actor.travelSign : 1,
                        offset: actor.offset || 0,
                        baseOffset: actor.offset || 0,
                        speed: actor.speed || 0,
                        radius: actor.radius || 16,
                        label: actor.label || 'River user',
                        coach: actor.coach || '',
                        crossAmplitude: actor.crossAmplitude || 0,
                        crossSpeed: actor.crossSpeed || 0,
                        seed: (index + 1) * 0.91
                    };
                })
            };
        });

        return {
            version: data.version || 1,
            name: data.name || 'River Rules Rally',
            note: data.note || '',
            packs: packs
        };
    }

    function preprocessRoute(points) {
        if (!points || points.length < 2) {
            throw new Error('Route must contain at least two points.');
        }
        const normalized = [];
        let total = 0;
        for (let index = 0; index < points.length; index += 1) {
            const point = points[index];
            if (index > 0) {
                const prev = points[index - 1];
                total += distance(prev.x, prev.y, point.x, point.y);
            }
            normalized.push({
                x: point.x,
                y: point.y,
                width: point.width || 140,
                s: total
            });
        }
        return {
            points: normalized,
            totalLength: total
        };
    }

    function buildUi(root) {
        const canvas = root.querySelector('[data-canvas]');
        const ctx = canvas.getContext('2d');
        const minimap = root.querySelector('[data-minimap]');
        const minimapCtx = minimap.getContext('2d');
        return {
            root: root,
            canvas: canvas,
            ctx: ctx,
            minimap: minimap,
            minimapCtx: minimapCtx,
            overlay: root.querySelector('[data-overlay]'),
            overlayCard: root.querySelector('[data-overlay-card]'),
            overlayTitle: root.querySelector('[data-overlay-title]'),
            overlayCopy: root.querySelector('[data-overlay-copy]'),
            overlayNote: root.querySelector('[data-overlay-note]'),
            packOptions: root.querySelector('[data-pack-options]'),
            modeOptions: root.querySelector('[data-mode-options]'),
            overlayStart: root.querySelector('[data-action="start"]'),
            overlayResume: root.querySelector('[data-action="resume"]'),
            overlayMenu: root.querySelector('[data-action="menu"]'),
            pause: root.querySelector('[data-action="pause"]'),
            restart: root.querySelector('[data-action="restart"]'),
            nextLandmark: root.querySelector('[data-next-landmark]'),
            nextBrief: root.querySelector('[data-next-brief]'),
            message: root.querySelector('[data-game-message]'),
            messageTone: root.querySelector('[data-message-tone]'),
            packName: root.querySelector('[data-pack-name]'),
            legName: root.querySelector('[data-leg-name]'),
            score: root.querySelector('[data-stat="score"]'),
            safety: root.querySelector('[data-stat="safety"]'),
            awareness: root.querySelector('[data-stat="awareness"]'),
            progress: root.querySelector('[data-stat="progress"]'),
            look: root.querySelector('[data-stat="look"]'),
            progressFill: root.querySelector('[data-progress-fill]'),
            briefingList: root.querySelector('[data-briefing-list]'),
            debrief: root.querySelector('[data-debrief]'),
            debriefSummary: root.querySelector('[data-debrief-summary]'),
            debriefList: root.querySelector('[data-debrief-list]'),
            debriefScores: root.querySelector('[data-debrief-scores]'),
            touchButtons: Array.from(root.querySelectorAll('[data-control]'))
        };
    }

    function createState(course) {
        return {
            course: course,
            selectedPackId: course.packs[0] ? course.packs[0].id : null,
            selectedModeId: 'guided',
            pack: null,
            mode: MODES.guided,
            phase: 'menu',
            pausedReason: '',
            clock: 0,
            lastFrame: 0,
            leg: 'outbound',
            pathProgress: 0,
            speed: 0,
            lateralOffset: 0,
            lateralVelocity: 0,
            laneTimer: 0,
            awareness: 100,
            lookFlash: 0,
            lastLookTime: -999,
            awarenessIntegral: 0,
            awarenessSamples: 0,
            score: 0,
            safety: 100,
            smoothness: 100,
            cautionCooldown: 0,
            message: 'Choose a drill and launch the run.',
            messageTone: 'calm',
            messageTimer: 4,
            keys: {
                left: false,
                right: false,
                up: false,
                down: false,
                look: false
            },
            featureStates: {},
            actors: [],
            log: [],
            actorPassRecords: {},
            turn: {
                active: false,
                featureId: null,
                stage: 'idle',
                stageTimer: 0,
                warnedFast: false,
                warnedWrongSide: false,
                crossProgress: 0,
                completed: false
            },
            samples: [],
            activeHint: null,
            needsRebuildMenu: true
        };
    }

    function bindEvents(ui, state) {
        const keyMap = {
            ArrowLeft: 'left',
            KeyA: 'left',
            ArrowRight: 'right',
            KeyD: 'right',
            ArrowUp: 'up',
            KeyW: 'up',
            ArrowDown: 'down',
            KeyS: 'down',
            Space: 'look'
        };

        window.addEventListener('keydown', function (event) {
            if (isEditable(event.target)) return;
            const control = keyMap[event.code] || keyMap[event.key];
            if (control) {
                event.preventDefault();
                state.keys[control] = true;
                if (control === 'look') {
                    performLook(state);
                }
                return;
            }
            if (event.code === 'KeyP') {
                event.preventDefault();
                if (state.phase === 'running') {
                    pauseRun(ui, state, 'Paused');
                } else if (state.phase === 'paused') {
                    resumeRun(ui, state);
                }
                return;
            }
            if (event.code === 'Enter') {
                event.preventDefault();
                if (state.phase === 'menu') {
                    startRun(ui, state);
                } else if (state.phase === 'paused') {
                    resumeRun(ui, state);
                } else if (state.phase === 'debrief') {
                    showMenu(ui, state);
                }
            }
        }, { passive: false });

        window.addEventListener('keyup', function (event) {
            const control = keyMap[event.code] || keyMap[event.key];
            if (!control) return;
            event.preventDefault();
            state.keys[control] = false;
        }, { passive: false });

        window.addEventListener('resize', function () {
            resizeCanvas(ui.canvas, ui.ctx);
            resizeCanvas(ui.minimap, ui.minimapCtx, true);
        });

        document.addEventListener('visibilitychange', function () {
            if (document.hidden && state.phase === 'running') {
                pauseRun(ui, state, 'Paused because the tab was hidden.');
            }
        });

        ui.overlayStart.addEventListener('click', function () {
            startRun(ui, state);
        });

        ui.overlayResume.addEventListener('click', function () {
            if (state.phase === 'paused') {
                resumeRun(ui, state);
            } else if (state.phase === 'debrief') {
                showMenu(ui, state);
            }
        });

        ui.overlayMenu.addEventListener('click', function () {
            showMenu(ui, state);
        });

        ui.pause.addEventListener('click', function () {
            if (state.phase === 'running') {
                pauseRun(ui, state, 'Paused');
            } else if (state.phase === 'paused') {
                resumeRun(ui, state);
            }
        });

        ui.restart.addEventListener('click', function () {
            startRun(ui, state);
        });

        ui.touchButtons.forEach(function (button) {
            const control = button.getAttribute('data-control');
            const press = function (event) {
                event.preventDefault();
                state.keys[control] = true;
                button.classList.add('is-pressed');
                if (control === 'look') {
                    performLook(state);
                }
            };
            const release = function () {
                state.keys[control] = false;
                button.classList.remove('is-pressed');
            };
            button.addEventListener('pointerdown', press);
            ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (name) {
                button.addEventListener(name, release);
            });
        });
    }

    function buildMenu(ui, state) {
        if (!state.needsRebuildMenu) return;
        ui.packOptions.innerHTML = '';
        state.course.packs.forEach(function (pack) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'river-trainer-choice';
            button.setAttribute('data-pack-id', pack.id);
            button.innerHTML = '<strong>' + escapeHtml(pack.name) + '</strong><span>' + escapeHtml(pack.badge) + '</span><small>' + escapeHtml(pack.summary) + '</small>';
            button.addEventListener('click', function () {
                state.selectedPackId = pack.id;
                highlightMenuSelection(ui, state);
            });
            ui.packOptions.appendChild(button);
        });

        ui.modeOptions.innerHTML = '';
        Object.keys(MODES).forEach(function (modeId) {
            const mode = MODES[modeId];
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'river-trainer-choice river-trainer-choice--mode';
            button.setAttribute('data-mode-id', modeId);
            button.innerHTML = '<strong>' + escapeHtml(mode.label) + '</strong><small>' + escapeHtml(mode.summary) + '</small>';
            button.addEventListener('click', function () {
                state.selectedModeId = modeId;
                highlightMenuSelection(ui, state);
            });
            ui.modeOptions.appendChild(button);
        });
        state.needsRebuildMenu = false;
        highlightMenuSelection(ui, state);
    }

    function highlightMenuSelection(ui, state) {
        Array.from(ui.packOptions.querySelectorAll('[data-pack-id]')).forEach(function (button) {
            button.classList.toggle('is-selected', button.getAttribute('data-pack-id') === state.selectedPackId);
        });
        Array.from(ui.modeOptions.querySelectorAll('[data-mode-id]')).forEach(function (button) {
            button.classList.toggle('is-selected', button.getAttribute('data-mode-id') === state.selectedModeId);
        });
        const selectedPack = getSelectedPack(state);
        const selectedMode = MODES[state.selectedModeId];
        ui.overlayTitle.textContent = selectedPack ? selectedPack.name : 'River trainer';
        ui.overlayCopy.textContent = selectedPack ? selectedPack.summary : 'Choose a drill.';
        ui.overlayNote.textContent = selectedMode ? selectedMode.summary + ' Press Space to look ahead every few strokes.' : '';
    }

    function getSelectedPack(state) {
        return state.course.packs.find(function (pack) {
            return pack.id === state.selectedPackId;
        }) || state.course.packs[0];
    }

    function startRun(ui, state) {
        state.pack = clonePackForRun(getSelectedPack(state));
        state.mode = MODES[state.selectedModeId] || MODES.guided;
        state.phase = 'running';
        state.pausedReason = '';
        state.clock = 0;
        state.lastFrame = performance.now();
        state.leg = 'outbound';
        state.pathProgress = 0;
        state.speed = state.mode.autopilot ? 5.6 : 0;
        state.lateralOffset = defaultLaneOffset(state.pack, state.pathProgress, 1);
        state.lateralVelocity = 0;
        state.laneTimer = 0;
        state.awareness = 100;
        state.lookFlash = 0;
        state.lastLookTime = 0;
        state.awarenessIntegral = 0;
        state.awarenessSamples = 0;
        state.score = 0;
        state.safety = 100;
        state.smoothness = 100;
        state.cautionCooldown = 0;
        state.message = state.pack.briefing[0] || 'Hold your line and look ahead.';
        state.messageTone = 'calm';
        state.messageTimer = 5;
        state.featureStates = buildFeatureStates(state.pack);
        state.actors = state.pack.actors.map(cloneActor);
        state.log = [];
        state.actorPassRecords = {};
        state.turn = {
            active: false,
            featureId: null,
            stage: 'idle',
            stageTimer: 0,
            warnedFast: false,
            warnedWrongSide: false,
            crossProgress: 0,
            completed: false
        };
        state.samples = [];
        state.activeHint = null;

        renderBriefingList(ui, state.pack);
        ui.debrief.hidden = true;
        syncOverlay(ui, state, 'hidden');
        syncHud(ui, state);
        performLook(state);
    }

    function clonePackForRun(pack) {
        return {
            id: pack.id,
            name: pack.name,
            badge: pack.badge,
            summary: pack.summary,
            outboundLabel: pack.outboundLabel,
            returnLabel: pack.returnLabel,
            briefing: pack.briefing.slice(),
            route: pack.route,
            halfLength: pack.halfLength,
            features: pack.features.map(function (feature) {
                return Object.assign({}, feature, {
                    appliesLeg: feature.appliesLeg.slice(),
                    render: feature.render ? JSON.parse(JSON.stringify(feature.render)) : null
                });
            }),
            hazards: pack.hazards.map(function (hazard) {
                return Object.assign({}, hazard, {
                    appliesLeg: hazard.appliesLeg.slice()
                });
            }),
            actors: pack.actors.map(function (actor) {
                return Object.assign({}, actor, {
                    appliesLeg: actor.appliesLeg.slice()
                });
            })
        };
    }

    function cloneActor(actor) {
        return Object.assign({}, actor, {
            offset: actor.baseOffset,
            baseOffset: actor.baseOffset,
            passed: false,
            resolved: false,
            passPending: false,
            nearWarned: false,
            inactive: false,
            alpha: 1
        });
    }

    function buildFeatureStates(pack) {
        const result = {};
        pack.features.forEach(function (feature) {
            feature.appliesLeg.forEach(function (leg) {
                result[getFeatureKey(feature, leg)] = {
                    active: false,
                    resolved: false,
                    status: 'pending',
                    samples: [],
                    seen: false
                };
            });
        });
        return result;
    }

    function renderBriefingList(ui, pack) {
        ui.briefingList.innerHTML = '';
        pack.briefing.forEach(function (item) {
            const li = document.createElement('li');
            li.textContent = item;
            ui.briefingList.appendChild(li);
        });
    }

    function showMenu(ui, state) {
        state.phase = 'menu';
        state.pausedReason = '';
        buildMenu(ui, state);
        syncOverlay(ui, state, 'menu');
        syncHud(ui, state);
    }

    function pauseRun(ui, state, reason) {
        state.phase = 'paused';
        state.pausedReason = reason || 'Paused';
        syncOverlay(ui, state, 'paused');
    }

    function resumeRun(ui, state) {
        state.phase = 'running';
        state.pausedReason = '';
        state.lastFrame = performance.now();
        syncOverlay(ui, state, 'hidden');
    }

    function finishRun(ui, state) {
        state.phase = 'debrief';
        buildDebrief(ui, state);
        syncOverlay(ui, state, 'debrief');
    }

    function tick(timestamp, ui, state) {
        if (!state.lastFrame) {
            state.lastFrame = timestamp;
        }
        const dt = Math.min((timestamp - state.lastFrame) / 1000, 0.033);
        state.lastFrame = timestamp;

        if (state.phase === 'running') {
            update(dt, ui, state);
        }

        if (state.phase === 'menu') syncOverlay(ui, state, 'menu');
        else if (state.phase === 'paused') syncOverlay(ui, state, 'paused');
        else if (state.phase === 'debrief') syncOverlay(ui, state, 'debrief');
        else syncOverlay(ui, state, 'hidden');

        render(ui, state);
        renderMinimap(ui, state);
        syncHud(ui, state);
    }

    function update(dt, ui, state) {
        const pack = state.pack;
        const travelSign = currentTravelSign(state);
        state.clock += dt;
        state.lookFlash = Math.max(0, state.lookFlash - dt);
        state.messageTimer = Math.max(0, state.messageTimer - dt);
        state.awareness = clamp(state.awareness - CONFIG.awarenessDecay * dt, 14, 100);
        state.awarenessIntegral += state.awareness;
        state.awarenessSamples += 1;
        state.cautionCooldown = Math.max(0, state.cautionCooldown - dt);

        updateMessageFromEnvironment(state);

        if (state.mode.autopilot) {
            applyAutopilot(dt, state);
        } else {
            updatePlayerControl(dt, state);
        }

        const prevProgress = state.pathProgress;

        if (state.turn.active) {
            updateTurn(dt, state);
        } else {
            state.pathProgress += travelSign * state.speed * dt;
            state.pathProgress = clamp(state.pathProgress, 0, pack.halfLength);
        }

        updateActors(dt, state);
        evaluateHazards(dt, state);
        evaluateLaneDiscipline(dt, state);
        evaluateActors(state);
        evaluateFeatures(prevProgress, state);

        if (state.safety <= 0) {
            addLogEntry(state, 'fail', 'Run stopped', 'The shell accumulated too many safety faults to continue.');
            finishRun(ui, state);
            return;
        }

        if (!state.turn.active && state.leg === 'return' && state.pathProgress <= 2) {
            state.pathProgress = 0;
            addLogEntry(state, 'pass', 'Return to dock', 'You completed the drill and returned to the dock under control.');
            finishRun(ui, state);
        }
    }

    function updatePlayerControl(dt, state) {
        const turnSensitivity = 120;
        const steerInput = (state.keys.right ? 1 : 0) - (state.keys.left ? 1 : 0);
        const drift = computeDrift(state);
        const desiredSpeed = state.keys.down ? CONFIG.holdWaterSpeed : state.keys.up ? CONFIG.maxSpeed : CONFIG.cruiseSpeed;
        state.speed += (desiredSpeed - state.speed) * Math.min(1, dt * 3.2);
        state.lateralVelocity += (steerInput * turnSensitivity + drift - state.lateralVelocity * 2.8) * dt;
        state.lateralOffset += state.lateralVelocity * dt;
        constrainToRiver(state);
    }

    function applyAutopilot(dt, state) {
        const targetOffset = idealOffset(state, 100);
        const desiredSpeed = idealSpeed(state);
        state.speed += (desiredSpeed - state.speed) * Math.min(1, dt * 3.2);
        const error = targetOffset - state.lateralOffset;
        state.lateralVelocity += (error * 4.2 - state.lateralVelocity * 3.1) * dt;
        state.lateralOffset += state.lateralVelocity * dt;
        if (state.clock - state.lastLookTime > 1.8) {
            performLook(state);
        }
        constrainToRiver(state);
    }

    function updateTurn(dt, state) {
        const feature = getTurnFeature(state);
        if (!feature) return;
        state.turn.stageTimer += dt;

        if (state.turn.stage === 'approach') {
            state.pathProgress = Math.min(state.pathProgress, feature.position);
            if (state.speed > 3.4 && !state.turn.warnedFast && state.pathProgress > feature.position - 16) {
                state.turn.warnedFast = true;
                applyPenalty(state, 10, 6, 'You entered the turn box too hot. Stop first, then cross.', 'danger');
            }
            if (currentTravelSign(state) * state.lateralOffset < feature.stopOffset - 16 && !state.turn.warnedWrongSide && state.pathProgress > feature.position - 26) {
                state.turn.warnedWrongSide = true;
                applyPenalty(state, 6, 4, 'Set up on the right side before stopping for the turn.', 'alert');
            }
            if (state.mode.autopilot) {
                state.pathProgress = Math.min(state.pathProgress, feature.position);
                if (state.pathProgress >= feature.position - 8) {
                    state.speed = Math.max(0.8, state.speed * 0.9);
                }
            }
            if (state.pathProgress >= feature.position - 4) {
                state.pathProgress = feature.position;
            }
            if (state.pathProgress >= feature.position - 2 && state.speed <= 2.25 && currentTravelSign(state) * state.lateralOffset >= feature.stopOffset - 8) {
                state.turn.stage = 'cross';
                state.turn.stageTimer = 0;
                state.speed = 1.6;
                setMessage(state, 'Good stop. Now turn left, cross the river, and set up for the return leg.', 'success');
            }
            return;
        }

        if (state.turn.stage === 'cross') {
            state.pathProgress = feature.position;
            if (!state.mode.autopilot) {
                state.speed += ((state.keys.up ? 3.4 : state.keys.down ? 0.8 : 1.8) - state.speed) * Math.min(1, dt * 4);
                const steerInput = (state.keys.right ? 1 : 0) - (state.keys.left ? 1 : 0);
                state.lateralVelocity += (steerInput * 135 - state.lateralVelocity * 2.7) * dt;
            }
            state.lateralOffset += state.lateralVelocity * dt;
            constrainToRiver(state);
            if ((state.lateralOffset - feature.crossTarget) * sign(feature.crossTarget) >= 0 || (feature.crossTarget < 0 && state.lateralOffset <= feature.crossTarget) || (feature.crossTarget > 0 && state.lateralOffset >= feature.crossTarget)) {
                state.leg = 'return';
                state.turn.stage = 'clear';
                state.turn.stageTimer = 0;
                state.speed = Math.max(3.8, state.speed);
                state.lateralVelocity = 0;
                performLook(state);
                setMessage(state, 'Turn complete. Clear the area and settle onto the right side for the return.', 'success');
            }
            return;
        }

        if (state.turn.stage === 'clear') {
            state.pathProgress -= state.speed * dt;
            state.pathProgress = clamp(state.pathProgress, 0, feature.position);
            if (state.pathProgress <= feature.position - feature.clearDistance) {
                state.turn.active = false;
                state.turn.completed = true;
                resolveTurnFeature(state, feature, 'pass', 'You stopped, crossed, and cleared the turn area under control.');
            }
        }
    }

    function currentTravelSign(state) {
        return state.leg === 'outbound' ? 1 : -1;
    }

    function evaluateHazards(dt, state) {
        if (state.cautionCooldown > 0) return;
        const pack = state.pack;
        const routeSample = sampleRoute(pack.route, state.pathProgress);
        const halfWidth = routeSample.width / 2;
        const rightBankDistance = halfWidth - state.lateralOffset;
        const leftBankDistance = halfWidth + state.lateralOffset;

        pack.hazards.forEach(function (hazard) {
            if (hazard.appliesLeg.indexOf(state.leg) === -1) return;
            if (state.pathProgress < hazard.start || state.pathProgress > hazard.end) return;
            const bankDistance = hazard.bankSign > 0 ? rightBankDistance : leftBankDistance;
            if (bankDistance < hazard.thresholdFromBank) {
                state.cautionCooldown = 1.8;
                applyPenalty(state, 3, 2, hazard.brief, 'alert');
            }
        });
    }

    function evaluateLaneDiscipline(dt, state) {
        if (state.turn.active || isPassingAllowed(state)) {
            state.laneTimer = 0;
            return;
        }
        const rightSign = currentTravelSign(state);
        if (rightSign * state.lateralOffset < -8) {
            state.laneTimer += dt;
            if (state.laneTimer > CONFIG.laneDisciplineThreshold) {
                state.laneTimer = 0;
                applyPenalty(state, 5, 3, 'Default lane discipline slipped. Stay right unless you are passing or turning.', 'alert');
            }
        } else {
            state.laneTimer = Math.max(0, state.laneTimer - dt * 2);
        }
    }

    function evaluateActors(state) {
        const travelSign = currentTravelSign(state);
        const playerWorld = positionToWorld(state.pack.route, state.pathProgress, state.lateralOffset);

        state.actors.forEach(function (actor) {
            if (actor.inactive || actor.appliesLeg.indexOf(state.leg) === -1) return;
            const actorWorld = actorToWorld(state.pack.route, actor);
            const d = distance(playerWorld.x, playerWorld.y, actorWorld.x, actorWorld.y);

            if (!actor.nearWarned && d < actor.radius + 24) {
                actor.nearWarned = true;
                if (actor.kind === 'swimmer' || actor.kind === 'paddler') {
                    if (state.speed > 6) {
                        applyPenalty(state, CONFIG.courtesyPenalty, 4, actor.label + ' too close at speed. Ease off earlier and give more room.', 'alert');
                    } else {
                        state.score += CONFIG.nearMissScore;
                        setMessage(state, actor.label + ' cleared safely. Hold your line and keep scanning.', 'success');
                    }
                }
            }

            if (!actor.resolved && d < actor.radius + 11) {
                actor.resolved = true;
                applyPenalty(state, CONFIG.collisionPenalty, 10, 'Contact with ' + actor.label.toLowerCase() + '. On the water that would be unacceptable.', 'danger');
            }

            if (actor.kind === 'shell' && actor.travelSign === travelSign && !actor.passPending && !actor.passed && (state.pathProgress - actor.position) * travelSign > 12) {
                actor.passPending = true;
            }

            if (actor.kind === 'shell' && actor.passPending && !actor.passed && Math.abs(state.pathProgress - actor.position) > 34) {
                actor.passed = true;
                const rightSign = currentTravelSign(state);
                const passedOnLeft = (state.lateralOffset - actor.offset) * rightSign < -10;
                const looked = state.clock - state.lastLookTime < state.mode.hintWindow;
                if (passedOnLeft && looked) {
                    state.score += CONFIG.passScore;
                    addLogEntry(state, 'pass', 'Clean pass', 'You passed ' + actor.label.toLowerCase() + ' on the left and had looked recently.');
                    setMessage(state, 'Clean pass. Move back right once the lane is clear.', 'success');
                } else if (passedOnLeft) {
                    applyPenalty(state, 4, 2, 'You passed on the correct side, but the last look came too late.', 'alert');
                } else {
                    applyPenalty(state, 12, 7, 'That was not a proper left-side pass. Look, move left, and settle back right after the overtake.', 'danger');
                }
            }
        });
    }

    function evaluateFeatures(prevProgress, state) {
        const travelSign = currentTravelSign(state);
        const lookAge = state.clock - state.lastLookTime;
        const pack = state.pack;
        const upcoming = [];

        pack.features.forEach(function (feature) {
            if (feature.appliesLeg.indexOf(state.leg) === -1) return;
            const featureKey = getFeatureKey(feature, state.leg);
            const featureState = state.featureStates[featureKey];
            if (!featureState || featureState.resolved) return;

            const distanceAlongLeg = (feature.position - state.pathProgress) * travelSign;
            if (distanceAlongLeg >= -20 && distanceAlongLeg <= feature.lookDistance) {
                featureState.active = true;
                featureState.seen = true;
                featureState.samples.push({
                    progress: state.pathProgress,
                    offset: state.lateralOffset,
                    speed: state.speed,
                    lookAge: lookAge,
                    time: state.clock
                });
                upcoming.push(feature);
                if (feature.type === 'turn' && !state.turn.active && distanceAlongLeg <= 42 && state.leg === 'outbound') {
                    beginTurn(state, feature);
                }
            }

            const crossed = travelSign > 0 ? prevProgress < feature.position && state.pathProgress >= feature.position : prevProgress > feature.position && state.pathProgress <= feature.position;
            if (crossed && feature.type === 'bridge') {
                const evaluation = evaluateBridgeFeature(feature, featureState.samples, state);
                resolveFeature(state, feature, evaluation);
            }
        });

        state.activeHint = chooseHighestPriorityHint(state, upcoming);
    }

    function chooseHighestPriorityHint(state, upcomingFeatures) {
        if (state.turn.active) {
            const turnFeature = getTurnFeature(state);
            return turnFeature ? {
                title: turnFeature.title,
                brief: turnBrief(turnFeature, state),
                priority: 100
            } : null;
        }

        const slowShell = state.actors.find(function (actor) {
            return !actor.inactive && !actor.resolved && !actor.passed && actor.appliesLeg.indexOf(state.leg) !== -1 && actor.kind === 'shell' && actor.travelSign === currentTravelSign(state) && (actor.position - state.pathProgress) * currentTravelSign(state) > 16 && (actor.position - state.pathProgress) * currentTravelSign(state) < 120;
        });
        if (slowShell) {
            return {
                title: slowShell.label,
                brief: slowShell.coach,
                priority: 80
            };
        }

        if (upcomingFeatures.length > 0) {
            const nearest = upcomingFeatures.slice().sort(function (a, b) {
                return Math.abs(a.position - state.pathProgress) - Math.abs(b.position - state.pathProgress);
            })[0];
            return {
                title: nearest.title,
                brief: nearest.brief,
                priority: 60
            };
        }

        const zone = state.pack.hazards.find(function (hazard) {
            return hazard.appliesLeg.indexOf(state.leg) !== -1 && state.pathProgress >= hazard.start && state.pathProgress <= hazard.end;
        });
        if (zone) {
            return {
                title: zone.title,
                brief: zone.brief,
                priority: 40
            };
        }

        return {
            title: 'Stay right and keep scanning',
            brief: 'Most of the drill is about holding a calm line, looking often, and only moving left for a real reason.',
            priority: 10
        };
    }

    function beginTurn(state, feature) {
        state.turn.active = true;
        state.turn.featureId = feature.id;
        state.turn.stage = 'approach';
        state.turn.stageTimer = 0;
        state.turn.warnedFast = false;
        state.turn.warnedWrongSide = false;
        setMessage(state, feature.brief, 'alert');
    }

    function getTurnFeature(state) {
        if (!state.pack) return null;
        return state.pack.features.find(function (feature) {
            return feature.id === state.turn.featureId;
        }) || null;
    }

    function turnBrief(feature, state) {
        if (!feature) return '';
        if (state.turn.stage === 'approach') {
            return 'Approach on the right and come fully under control before crossing.';
        }
        if (state.turn.stage === 'cross') {
            return 'Turn left and row across. Do not drift or rush the crossing.';
        }
        if (state.turn.stage === 'clear') {
            return 'You are now on the return leg. Clear the turn area and settle onto the right side.';
        }
        return feature.brief;
    }

    function evaluateBridgeFeature(feature, samples, state) {
        const rightSign = currentTravelSign(state);
        const last = samples.length > 0 ? samples[samples.length - 1] : {
            offset: state.lateralOffset,
            lookAge: state.clock - state.lastLookTime,
            speed: state.speed,
            progress: state.pathProgress
        };
        const target = targetOffsetForFeature(feature, state.pack, rightSign, feature.position);
        const diff = last.offset - target;
        const absDiff = Math.abs(diff);
        const lateCommitDistance = commitmentDistance(samples, target, feature);
        const looked = last.lookAge <= state.mode.hintWindow;

        let status = 'pass';
        let detail = '';

        if (feature.alignment === 'center') {
            if (absDiff <= 10) {
                detail = 'Held the centered main span line.';
            } else if (absDiff <= 22) {
                status = 'warn';
                detail = 'You made it through the main span, but the alignment drifted off center.';
            } else {
                status = 'fail';
                detail = 'You drifted toward structure instead of staying between the main pillars.';
            }
        }

        if (feature.alignment === 'centerRight') {
            if (rightSign * last.offset < 4) {
                status = 'fail';
                detail = 'That line was too far left for the low bridge.';
            } else if (absDiff <= 12) {
                detail = 'You held the composed center-right corridor.';
            } else if (absDiff <= 22) {
                status = 'warn';
                detail = 'You were in the correct half of the bridge, but the line came together late.';
            } else {
                status = 'fail';
                detail = 'The approach was too ragged for the low bridge corridor.';
            }
        }

        if (feature.alignment === 'rightOpening') {
            if (rightSign * last.offset < 18) {
                status = 'fail';
                detail = 'You selected the wrong bridge opening.';
            } else if (absDiff <= 12) {
                detail = 'Correct opening, chosen early enough to stay composed.';
            } else if (absDiff <= 20) {
                status = 'warn';
                detail = 'Correct opening, but the commitment came later than it should have.';
            } else {
                status = 'fail';
                detail = 'You reached the correct opening too late to count as a controlled choice.';
            }
        }

        if (feature.alignment === 'insidePillar') {
            const outerDistance = bridgeOuterEdgeDistance(feature, state, last.offset);
            if (outerDistance < 10) {
                status = 'fail';
                detail = 'You drifted onto the shallow outside edge instead of taking the inside line.';
            } else if (absDiff <= 10) {
                detail = 'Good inside-pillar judgment: safe side of the structure and off the shallows.';
            } else if (absDiff <= 18) {
                status = 'warn';
                detail = 'You found the safe side, but the line was not settled early enough.';
            } else {
                status = 'fail';
                detail = 'That was not a committed inside line at the high bridge.';
            }
        }

        if (lateCommitDistance < feature.commitDistance * 0.35 && status === 'pass') {
            status = 'warn';
            detail = 'The final line was correct, but the commitment happened later than ideal.';
        }

        if (!looked && status === 'pass') {
            status = 'warn';
            detail += ' You also looked too late for the feature.';
        }

        return {
            status: status,
            detail: detail
        };
    }

    function resolveFeature(state, feature, evaluation) {
        const featureKey = getFeatureKey(feature, state.leg);
        const featureState = state.featureStates[featureKey];
        if (!featureState || featureState.resolved) return;
        featureState.resolved = true;
        featureState.status = evaluation.status;
        if (evaluation.status === 'pass') {
            state.score += CONFIG.featurePassScore;
            addLogEntry(state, 'pass', feature.title, evaluation.detail);
            setMessage(state, feature.title + ': ' + evaluation.detail, 'success');
            return;
        }
        if (evaluation.status === 'warn') {
            state.score += CONFIG.featureWarnScore;
            state.smoothness = clamp(state.smoothness - 5, 0, 100);
            addLogEntry(state, 'warn', feature.title, evaluation.detail);
            setMessage(state, feature.title + ': ' + evaluation.detail, 'alert');
            if (state.mode.pauseOnWarn) {
                state.phase = 'paused';
                state.pausedReason = feature.title + ': ' + evaluation.detail;
            }
            return;
        }
        state.score += CONFIG.featureFailScore;
        state.safety = clamp(state.safety - 12, 0, 100);
        state.smoothness = clamp(state.smoothness - 10, 0, 100);
        addLogEntry(state, 'fail', feature.title, evaluation.detail);
        setMessage(state, feature.title + ': ' + evaluation.detail, 'danger');
        if (state.mode.pauseOnFail) {
            state.phase = 'paused';
            state.pausedReason = feature.title + ': ' + evaluation.detail;
        }
    }

    function resolveTurnFeature(state, feature, status, detail) {
        const featureKey = getFeatureKey(feature, 'outbound');
        const featureState = state.featureStates[featureKey];
        if (featureState) {
            featureState.resolved = true;
            featureState.status = status;
        }
        if (status === 'pass') {
            state.score += CONFIG.featurePassScore + 30;
            addLogEntry(state, 'pass', feature.title, detail);
        } else {
            state.score += CONFIG.featureFailScore;
            state.safety = clamp(state.safety - 12, 0, 100);
            addLogEntry(state, 'fail', feature.title, detail);
        }
    }

    function updateActors(dt, state) {
        state.actors.forEach(function (actor) {
            if (actor.inactive || actor.appliesLeg.indexOf(state.leg) === -1) return;
            if (actor.travelSign !== 0) {
                actor.position += actor.travelSign * actor.speed * dt;
            }
            if (actor.crossAmplitude) {
                actor.offset = actor.baseOffset + Math.sin(state.clock * actor.crossSpeed + actor.seed) * actor.crossAmplitude;
            }
            if (actor.position < 0 || actor.position > state.pack.halfLength) {
                actor.inactive = true;
            }
        });
    }

    function updateMessageFromEnvironment(state) {
        if (state.turn.active) return;
        if (state.activeHint) {
            if (state.messageTimer <= 0) {
                setMessage(state, state.activeHint.brief, state.activeHint.priority >= 80 ? 'alert' : 'calm', 1.6);
            }
            return;
        }
        if (state.clock - state.lastLookTime > 4.8) {
            if (state.messageTimer <= 0) {
                setMessage(state, 'Look ahead. On the real river you need a shoulder check every few strokes.', 'alert', 1.8);
            }
        }
    }

    function setMessage(state, text, tone, duration) {
        state.message = text;
        state.messageTone = tone || 'calm';
        state.messageTimer = typeof duration === 'number' ? duration : tone === 'danger' ? 4.4 : tone === 'alert' ? 3.2 : 2.4;
    }

    function performLook(state) {
        state.lastLookTime = state.clock;
        state.awareness = CONFIG.awarenessRecover;
        state.lookFlash = CONFIG.lookDuration;
    }

    function applyPenalty(state, safetyPenalty, smoothnessPenalty, message, tone) {
        state.safety = clamp(state.safety - safetyPenalty, 0, 100);
        state.smoothness = clamp(state.smoothness - smoothnessPenalty, 0, 100);
        state.score += Math.max(-40, -(safetyPenalty * 3));
        state.cautionCooldown = Math.max(state.cautionCooldown, 1.2);
        setMessage(state, message, tone || 'alert');
    }

    function defaultLaneOffset(pack, progress, rightSign) {
        const width = sampleRoute(pack.route, progress).width;
        return rightSign * Math.min(28, width * 0.19);
    }

    function idealOffset(state, previewDistance) {
        const pack = state.pack;
        const progress = clamp(state.pathProgress + currentTravelSign(state) * (previewDistance || 0), 0, pack.halfLength);
        const rightSign = currentTravelSign(state);
        const turnFeature = getTurnFeature(state);

        if (state.turn.active && turnFeature) {
            if (state.turn.stage === 'approach') return rightSign * turnFeature.stopOffset;
            if (state.turn.stage === 'cross') return turnFeature.crossTarget;
            if (state.turn.stage === 'clear') return defaultLaneOffset(pack, progress, rightSign);
        }

        const sameDirectionShell = state.actors.find(function (actor) {
            return !actor.inactive && !actor.resolved && !actor.passed && actor.kind === 'shell' && actor.travelSign === rightSign && actor.appliesLeg.indexOf(state.leg) !== -1 && (actor.position - state.pathProgress) * rightSign > 22 && (actor.position - state.pathProgress) * rightSign < 110;
        });
        if (sameDirectionShell) {
            const oncomingConflict = state.actors.some(function (actor) {
                return !actor.inactive && !actor.resolved && actor.appliesLeg.indexOf(state.leg) !== -1 && actor.travelSign === -rightSign && (actor.position - state.pathProgress) * rightSign > 0 && (actor.position - state.pathProgress) * rightSign < 90;
            });
            if (!oncomingConflict) {
                return sameDirectionShell.offset - (rightSign * 26);
            }
        }

        const upcomingFeature = state.pack.features.find(function (feature) {
            if (feature.appliesLeg.indexOf(state.leg) === -1) return false;
            const d = (feature.position - progress) * rightSign;
            return feature.type === 'bridge' && d >= -10 && d <= feature.commitDistance;
        });
        if (upcomingFeature) {
            return targetOffsetForFeature(upcomingFeature, pack, rightSign, upcomingFeature.position);
        }

        return defaultLaneOffset(pack, progress, rightSign);
    }

    function idealSpeed(state) {
        const turnFeature = getTurnFeature(state);
        if (state.turn.active && turnFeature) {
            if (state.turn.stage === 'approach') return 2.3;
            if (state.turn.stage === 'cross') return 1.8;
            return 6.2;
        }
        const upcomingTurn = state.pack.features.find(function (feature) {
            return feature.type === 'turn' && feature.appliesLeg.indexOf(state.leg) !== -1 && (feature.position - state.pathProgress) * currentTravelSign(state) > 0 && (feature.position - state.pathProgress) * currentTravelSign(state) < 110;
        });
        if (upcomingTurn) return 4.1;
        const zone = state.pack.hazards.find(function (hazard) {
            return hazard.appliesLeg.indexOf(state.leg) !== -1 && state.pathProgress >= hazard.start - 30 && state.pathProgress <= hazard.end + 10;
        });
        if (zone) return 5.4;
        return 7.1;
    }

    function isPassingAllowed(state) {
        return state.actors.some(function (actor) {
            return !actor.inactive && !actor.resolved && !actor.passed && actor.kind === 'shell' && actor.appliesLeg.indexOf(state.leg) !== -1 && actor.travelSign === currentTravelSign(state) && (actor.position - state.pathProgress) * currentTravelSign(state) > 10 && (actor.position - state.pathProgress) * currentTravelSign(state) < 85;
        });
    }

    function commitmentDistance(samples, target, feature) {
        if (!samples || samples.length === 0) return 0;
        for (let index = 0; index < samples.length; index += 1) {
            const sample = samples[index];
            if (Math.abs(sample.offset - target) <= 12) {
                const last = samples[samples.length - 1];
                return Math.abs(last.progress - sample.progress);
            }
        }
        return 0;
    }

    function targetOffsetForFeature(feature, pack, rightSign, position) {
        const width = sampleRoute(pack.route, position || feature.position).width;
        if (feature.alignment === 'center') return 0;
        if (feature.alignment === 'centerRight') return rightSign * Math.min(22, width * 0.16);
        if (feature.alignment === 'rightOpening') return rightSign * Math.min(38, width * 0.28);
        if (feature.alignment === 'insidePillar') return rightSign * Math.min(18, width * 0.14);
        return defaultLaneOffset(pack, position || feature.position, rightSign);
    }

    function bridgeOuterEdgeDistance(feature, state, offset) {
        const width = sampleRoute(state.pack.route, feature.position).width;
        const halfWidth = width / 2;
        const outer = currentTravelSign(state) * offset;
        return halfWidth - outer;
    }

    function constrainToRiver(state) {
        const width = sampleRoute(state.pack.route, state.pathProgress).width;
        const halfWidth = width / 2;
        const limit = Math.max(halfWidth - 12, 12);
        if (state.lateralOffset > limit) {
            state.lateralOffset = limit;
            state.lateralVelocity *= -0.16;
        }
        if (state.lateralOffset < -limit) {
            state.lateralOffset = -limit;
            state.lateralVelocity *= -0.16;
        }
    }

    function computeDrift(state) {
        const deficiency = 1 - (state.awareness / 100);
        if (deficiency <= 0.05) return 0;
        return Math.sin(state.clock * 1.9 + 0.8) * deficiency * 9;
    }

    function render(ui, state) {
        const ctx = ui.ctx;
        const canvas = ui.canvas;
        const width = canvas.width / currentScaleFactor(canvas);
        const height = canvas.height / currentScaleFactor(canvas);

        ctx.clearRect(0, 0, width, height);
        drawBackdrop(ctx, width, height);

        if (!state.pack) {
            drawIdleScreen(ctx, width, height);
            return;
        }

        const camera = buildCamera(state, width, height);
        drawRiver(ctx, state, camera, width, height);
        drawGuidance(ctx, state, camera);
        drawStructures(ctx, state, camera);
        drawActors(ctx, state, camera);
        drawPlayer(ctx, state, width, height);
        drawLookPulse(ctx, state, width, height);
        drawRunLabels(ctx, state, width, height);
    }

    function drawBackdrop(ctx, width, height) {
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#1d4e57');
        gradient.addColorStop(0.45, '#175464');
        gradient.addColorStop(1, '#0f3340');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        const shore = ctx.createLinearGradient(0, 0, width, height);
        shore.addColorStop(0, 'rgba(214, 201, 162, 0.14)');
        shore.addColorStop(1, 'rgba(133, 170, 107, 0.09)');
        ctx.fillStyle = shore;
        ctx.fillRect(0, 0, width, height);
    }

    function drawIdleScreen(ctx, width, height) {
        ctx.fillStyle = 'rgba(255,255,255,0.16)';
        ctx.font = '600 26px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Choose a drill to load the route trainer.', width / 2, height / 2);
    }

    function buildCamera(state, width, height) {
        const playerWorld = positionToWorld(state.pack.route, state.pathProgress, state.lateralOffset);
        const tangentBase = tangentAt(state.pack.route, state.pathProgress);
        const travelSign = currentTravelSign(state);
        const forward = {
            x: tangentBase.x * travelSign,
            y: tangentBase.y * travelSign
        };
        const right = rotateClockwise(forward);
        return {
            x: playerWorld.x,
            y: playerWorld.y,
            forward: forward,
            right: right,
            scale: Math.min(width / 420, height / 310),
            playerX: CONFIG.playerScreenX * (width / CONFIG.width),
            playerY: CONFIG.playerScreenY * (height / CONFIG.height)
        };
    }

    function drawRiver(ctx, state, camera, width, height) {
        const route = state.pack.route;
        const before = 110;
        const ahead = 360;
        const step = 16;
        const leftBank = [];
        const rightBank = [];

        for (let d = state.pathProgress - before; d <= state.pathProgress + ahead; d += step) {
            const progress = clamp(d, 0, route.totalLength);
            const sample = sampleRoute(route, progress);
            const normal = normalAt(route, progress);
            const halfWidth = sample.width / 2;
            const leftWorld = {
                x: sample.x - normal.x * halfWidth,
                y: sample.y - normal.y * halfWidth
            };
            const rightWorld = {
                x: sample.x + normal.x * halfWidth,
                y: sample.y + normal.y * halfWidth
            };
            leftBank.push(worldToScreen(leftWorld, camera));
            rightBank.push(worldToScreen(rightWorld, camera));
        }

        ctx.beginPath();
        const polygon = leftBank.concat(rightBank.reverse());
        polygon.forEach(function (point, index) {
            if (index === 0) ctx.moveTo(point.x, point.y);
            else ctx.lineTo(point.x, point.y);
        });
        ctx.closePath();

        const fill = ctx.createLinearGradient(0, 0, 0, height);
        fill.addColorStop(0, 'rgba(83, 213, 220, 0.95)');
        fill.addColorStop(1, 'rgba(17, 92, 122, 0.96)');
        ctx.fillStyle = fill;
        ctx.fill();

        ctx.lineWidth = 4;
        ctx.strokeStyle = 'rgba(234, 242, 239, 0.15)';
        ctx.stroke();

        drawBankHighlights(ctx, state, camera);
    }

    function drawBankHighlights(ctx, state, camera) {
        state.pack.hazards.forEach(function (hazard) {
            if (hazard.appliesLeg.indexOf(state.leg) === -1) return;
            const visibleStart = Math.max(state.pathProgress - 60, hazard.start);
            const visibleEnd = Math.min(state.pathProgress + 300, hazard.end);
            if (visibleEnd <= visibleStart) return;
            const points = [];
            const innerPoints = [];
            for (let d = visibleStart; d <= visibleEnd; d += 14) {
                const sample = sampleRoute(state.pack.route, d);
                const normal = normalAt(state.pack.route, d);
                const halfWidth = sample.width / 2;
                const outer = {
                    x: sample.x + normal.x * halfWidth * hazard.bankSign,
                    y: sample.y + normal.y * halfWidth * hazard.bankSign
                };
                const inner = {
                    x: sample.x + normal.x * (halfWidth - 12) * hazard.bankSign,
                    y: sample.y + normal.y * (halfWidth - 12) * hazard.bankSign
                };
                points.push(worldToScreen(outer, camera));
                innerPoints.push(worldToScreen(inner, camera));
            }
            if (points.length < 2) return;
            ctx.beginPath();
            const polygon = points.concat(innerPoints.reverse());
            polygon.forEach(function (point, index) {
                if (index === 0) ctx.moveTo(point.x, point.y);
                else ctx.lineTo(point.x, point.y);
            });
            ctx.closePath();
            ctx.fillStyle = 'rgba(242, 143, 61, 0.24)';
            ctx.fill();
        });
    }

    function drawGuidance(ctx, state, camera) {
        if (!state.mode.showIdealLine && state.lookFlash <= 0) return;
        ctx.save();
        ctx.beginPath();
        const ahead = 250;
        for (let d = -20; d <= ahead; d += 12) {
            const progress = clamp(state.pathProgress + currentTravelSign(state) * d, 0, state.pack.halfLength);
            const target = idealOffset(state, d);
            const point = positionToWorld(state.pack.route, progress, target);
            const screen = worldToScreen(point, camera);
            if (d === -20) ctx.moveTo(screen.x, screen.y);
            else ctx.lineTo(screen.x, screen.y);
        }
        ctx.lineWidth = 4;
        ctx.strokeStyle = state.mode.showIdealLine ? 'rgba(255, 236, 168, 0.84)' : 'rgba(255, 236, 168, 0.45)';
        ctx.setLineDash([10, 10]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
    }

    function drawStructures(ctx, state, camera) {
        state.pack.features.forEach(function (feature) {
            if (feature.type !== 'bridge' && feature.type !== 'bridge-preview' && feature.type !== 'turn') return;
            const travelSign = currentTravelSign(state);
            const delta = (feature.position - state.pathProgress) * travelSign;
            if (Math.abs(delta) > 320) return;

            if (feature.type === 'turn') {
                drawTurnBox(ctx, state, camera, feature);
                return;
            }

            const sample = sampleRoute(state.pack.route, feature.position);
            const normal = normalAt(state.pack.route, feature.position);
            const tangent = tangentAt(state.pack.route, feature.position);
            const halfWidth = sample.width / 2;
            const left = worldToScreen({ x: sample.x - normal.x * (halfWidth + 10), y: sample.y - normal.y * (halfWidth + 10) }, camera);
            const right = worldToScreen({ x: sample.x + normal.x * (halfWidth + 10), y: sample.y + normal.y * (halfWidth + 10) }, camera);

            ctx.lineWidth = feature.render && feature.render.style === 'low-bridge' ? 16 : 18;
            ctx.strokeStyle = feature.type === 'bridge-preview' ? 'rgba(222, 228, 236, 0.44)' : 'rgba(232, 238, 247, 0.72)';
            ctx.beginPath();
            ctx.moveTo(left.x, left.y);
            ctx.lineTo(right.x, right.y);
            ctx.stroke();

            if (feature.render && Array.isArray(feature.render.pillars)) {
                feature.render.pillars.forEach(function (pillarOffset) {
                    const pillarWorld = {
                        x: sample.x + normal.x * pillarOffset,
                        y: sample.y + normal.y * pillarOffset
                    };
                    const pillar = worldToScreen(pillarWorld, camera);
                    ctx.save();
                    ctx.translate(pillar.x, pillar.y);
                    ctx.rotate(screenAngleForDirection(tangent, camera) + (Math.PI / 2));
                    ctx.fillStyle = 'rgba(63, 72, 86, 0.95)';
                    ctx.fillRect(-7, -18, 14, 36);
                    ctx.restore();
                });
            }

            if ((state.mode.showRiskLabels || state.lookFlash > 0.1) && delta > -40) {
                const label = worldToScreen({ x: sample.x, y: sample.y }, camera);
                drawFlagLabel(ctx, label.x, label.y - 28, feature.title, feature.type === 'bridge-preview' ? 'muted' : 'accent');
            }
        });
    }

    function drawTurnBox(ctx, state, camera, feature) {
        const center = sampleRoute(state.pack.route, feature.position);
        const normal = normalAt(state.pack.route, feature.position);
        const forward = tangentAt(state.pack.route, feature.position);
        const rightSign = 1;
        const stopWorld = {
            x: center.x + normal.x * feature.stopOffset * rightSign,
            y: center.y + normal.y * feature.stopOffset * rightSign
        };
        const crossWorld = {
            x: center.x + normal.x * feature.crossTarget,
            y: center.y + normal.y * feature.crossTarget
        };
        const stopScreen = worldToScreen(stopWorld, camera);
        const crossScreen = worldToScreen(crossWorld, camera);

        ctx.save();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(255, 210, 122, 0.85)';
        ctx.setLineDash([12, 10]);
        drawDiamond(ctx, stopScreen.x, stopScreen.y, 18);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.strokeStyle = 'rgba(136, 220, 230, 0.84)';
        drawDiamond(ctx, crossScreen.x, crossScreen.y, 16);
        ctx.stroke();

        if ((state.mode.showRiskLabels || state.lookFlash > 0.2) && Math.abs((feature.position - state.pathProgress) * currentTravelSign(state)) < 260) {
            drawFlagLabel(ctx, stopScreen.x + 16, stopScreen.y - 10, feature.title, 'accent');
        }
        ctx.restore();
    }

    function drawActors(ctx, state, camera) {
        state.actors.forEach(function (actor) {
            if (actor.inactive || actor.appliesLeg.indexOf(state.leg) === -1) return;
            const delta = (actor.position - state.pathProgress) * currentTravelSign(state);
            if (delta < -80 || delta > 300) return;
            const world = actorToWorld(state.pack.route, actor);
            const screen = worldToScreen(world, camera);
            const rotation = actorRotation(state.pack.route, actor, camera);

            ctx.save();
            ctx.translate(screen.x, screen.y);
            ctx.rotate(rotation);
            if (actor.kind === 'shell') {
                ctx.fillStyle = actor.travelSign === currentTravelSign(state) ? '#f8f5e6' : '#ffcc8a';
                ctx.fillRect(-4, -16, 8, 32);
                ctx.fillRect(-18, -2, 36, 4);
            } else if (actor.kind === 'paddler') {
                ctx.fillStyle = '#f3d494';
                roundRect(ctx, -10, -7, 20, 14, 7);
                ctx.fill();
                ctx.strokeStyle = '#223242';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(-18, 0);
                ctx.lineTo(18, 0);
                ctx.stroke();
            } else {
                ctx.fillStyle = '#f7c7c2';
                ctx.beginPath();
                ctx.arc(0, 0, actor.radius / 2.1, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();

            if ((state.mode.showRiskLabels || state.lookFlash > 0.2) && actor.coach && delta > -20) {
                drawFlagLabel(ctx, screen.x + 12, screen.y - 18, actor.label, actor.kind === 'shell' ? 'light' : 'accent');
            }
        });
    }

    function drawPlayer(ctx, state, width, height) {
        const x = width * 0.5;
        const y = height * 0.72;
        ctx.save();
        ctx.translate(x, y);
        ctx.fillStyle = '#fff7e9';
        ctx.fillRect(-5, -22, 10, 44);
        ctx.fillStyle = '#0e1f2f';
        ctx.fillRect(-26, -2, 52, 4);
        ctx.fillRect(-18, -10, 36, 2);
        ctx.fillRect(-18, 8, 36, 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.35)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, -28);
        ctx.lineTo(0, -42);
        ctx.stroke();
        ctx.restore();
    }

    function drawLookPulse(ctx, state, width, height) {
        if (state.lookFlash <= 0) return;
        const alpha = state.lookFlash / CONFIG.lookDuration;
        const x = width * 0.5;
        const y = height * 0.72;
        const radius = 140 + ((1 - alpha) * 120);
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 244, 194, ' + (alpha * 0.22).toFixed(3) + ')';
        ctx.lineWidth = 14 * alpha;
        ctx.beginPath();
        ctx.arc(x, y, radius, Math.PI * 1.1, Math.PI * 1.9);
        ctx.stroke();
        ctx.restore();
    }

    function drawRunLabels(ctx, state, width, height) {
        ctx.save();
        ctx.font = '600 14px system-ui, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillStyle = 'rgba(255,255,255,0.74)';
        ctx.fillText(state.mode.label + ' • ' + (state.leg === 'outbound' ? state.pack.outboundLabel : state.pack.returnLabel), 26, 34);
        ctx.restore();
    }

    function renderMinimap(ui, state) {
        const ctx = ui.minimapCtx;
        const canvas = ui.minimap;
        const scaleFactor = currentScaleFactor(canvas);
        const width = canvas.width / scaleFactor;
        const height = canvas.height / scaleFactor;
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#0f2431';
        roundRect(ctx, 0, 0, width, height, 18);
        ctx.fill();

        if (!state.pack) return;

        const bounds = routeBounds(state.pack.route);
        const padding = CONFIG.mapPadding;
        const scale = Math.min((width - padding * 2) / Math.max(bounds.maxX - bounds.minX, 1), (height - padding * 2) / Math.max(bounds.maxY - bounds.minY, 1));

        ctx.save();
        ctx.translate(padding, padding);
        ctx.beginPath();
        state.pack.route.points.forEach(function (point, index) {
            const x = (point.x - bounds.minX) * scale;
            const y = (point.y - bounds.minY) * scale;
            if (index === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.lineWidth = 9;
        ctx.strokeStyle = '#4ec7d3';
        ctx.lineCap = 'round';
        ctx.stroke();

        state.pack.features.forEach(function (feature) {
            const point = sampleRoute(state.pack.route, feature.position);
            const x = (point.x - bounds.minX) * scale;
            const y = (point.y - bounds.minY) * scale;
            ctx.fillStyle = feature.type === 'bridge' ? '#ffd17f' : feature.type === 'turn' ? '#9ee6f0' : '#d8e3ec';
            ctx.beginPath();
            ctx.arc(x, y, feature.type === 'turn' ? 4.8 : 3.6, 0, Math.PI * 2);
            ctx.fill();
        });

        const player = sampleRoute(state.pack.route, state.pathProgress);
        const px = (player.x - bounds.minX) * scale;
        const py = (player.y - bounds.minY) * scale;
        ctx.fillStyle = state.leg === 'outbound' ? '#fff7e9' : '#ffb86a';
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    function buildDebrief(ui, state) {
        const averageAwareness = state.awarenessSamples ? Math.round(state.awarenessIntegral / state.awarenessSamples) : Math.round(state.awareness);
        const finalGrade = gradeForRun(state, averageAwareness);
        ui.debrief.hidden = false;
        ui.debriefSummary.innerHTML = '<strong>' + escapeHtml(finalGrade.label) + '</strong><span>' + escapeHtml(finalGrade.summary) + '</span>';
        ui.debriefScores.innerHTML = [
            debriefStat('Score', Math.max(0, Math.round(state.score))),
            debriefStat('Safety', Math.round(state.safety) + '/100'),
            debriefStat('Smoothness', Math.round(state.smoothness) + '/100'),
            debriefStat('Average awareness', averageAwareness + '/100')
        ].join('');
        ui.debriefList.innerHTML = '';
        state.log.forEach(function (entry) {
            const item = document.createElement('article');
            item.className = 'river-trainer-debrief__item river-trainer-debrief__item--' + entry.status;
            item.innerHTML = '<h4>' + escapeHtml(entry.title) + '</h4><p>' + escapeHtml(entry.detail) + '</p>';
            ui.debriefList.appendChild(item);
        });
        if (state.log.length === 0) {
            ui.debriefList.innerHTML = '<article class="river-trainer-debrief__item river-trainer-debrief__item--muted"><h4>Run summary</h4><p>No landmark notes were recorded.</p></article>';
        }
    }

    function gradeForRun(state, averageAwareness) {
        const weighted = (state.safety * 0.45) + (state.smoothness * 0.2) + (averageAwareness * 0.2) + clamp(state.score / 10, 0, 100) * 0.15;
        if (weighted >= 88) {
            return {
                label: 'Coach-ready line choices',
                summary: 'You looked often, held the proper lane, and made the difficult decisions early enough to stay composed.'
            };
        }
        if (weighted >= 72) {
            return {
                label: 'Solid training run',
                summary: 'The route was mostly correct. Tighten the late looks and settle the line earlier around bridges and turns.'
            };
        }
        if (weighted >= 55) {
            return {
                label: 'Useful but uneven',
                summary: 'You completed the drill, but some decisions came together too late to feel calm or repeatable on real water.'
            };
        }
        return {
            label: 'More reps needed',
            summary: 'Before taking this on the water, repeat the drill and focus on looking earlier, staying right by default, and committing sooner.'
        };
    }

    function syncHud(ui, state) {
        const pack = state.pack || getSelectedPack(state);
        const progressText = state.pack ? Math.round(runProgressPercent(state)) + '%' : '0%';
        ui.packName.textContent = pack ? pack.name : 'Choose a drill';
        ui.legName.textContent = state.pack ? (state.leg === 'outbound' ? state.pack.outboundLabel : state.pack.returnLabel) : '';
        ui.score.textContent = state.pack ? String(Math.max(0, Math.round(state.score))).padStart(4, '0') : '0000';
        ui.safety.textContent = state.pack ? Math.round(state.safety) + '/100' : '100/100';
        ui.awareness.textContent = state.pack ? Math.round(state.awareness) + '/100' : '100/100';
        ui.progress.textContent = progressText;
        ui.look.textContent = state.pack ? (state.clock - state.lastLookTime < 2.6 ? 'Recent' : state.clock - state.lastLookTime < 4.6 ? 'Due soon' : 'Look now') : '—';
        ui.progressFill.style.width = Math.round(runProgressPercent(state)) + '%';
        ui.message.textContent = state.phase === 'paused' && state.pausedReason ? state.pausedReason : state.message;
        ui.message.className = 'river-trainer-message river-trainer-message--' + (state.phase === 'paused' && state.pausedReason ? 'alert' : state.messageTone || 'calm');
        ui.nextLandmark.textContent = state.activeHint ? state.activeHint.title : (state.pack ? 'Stay right and keep scanning' : '');
        ui.nextBrief.textContent = state.activeHint ? state.activeHint.brief : (state.pack ? 'Most of the drill is about line choice and awareness, not speed.' : '');
        if (state.phase === 'debrief') {
            ui.debrief.hidden = false;
        }
    }

    function syncOverlay(ui, state, mode) {
        ui.overlay.classList.toggle('is-hidden', mode === 'hidden');
        ui.overlay.classList.toggle('is-menu', mode === 'menu');
        ui.overlay.classList.toggle('is-debrief', mode === 'debrief');

        if (mode === 'menu') {
            buildMenu(ui, state);
            highlightMenuSelection(ui, state);
            ui.overlayTitle.textContent = getSelectedPack(state).name;
            ui.overlayCopy.textContent = getSelectedPack(state).summary;
            ui.overlayNote.textContent = MODES[state.selectedModeId].summary + ' Space = look ahead. Arrows or WASD = line and pace.';
            ui.overlayStart.hidden = false;
            ui.overlayResume.hidden = true;
            ui.overlayMenu.hidden = true;
            return;
        }

        if (mode === 'paused') {
            ui.overlayTitle.textContent = 'Review the last move';
            ui.overlayCopy.textContent = state.pausedReason || 'Paused.';
            ui.overlayNote.textContent = 'Resume when you are ready to row the next section again.';
            ui.overlayStart.hidden = true;
            ui.overlayResume.hidden = false;
            ui.overlayResume.textContent = 'Resume run';
            ui.overlayMenu.hidden = false;
            return;
        }

        if (mode === 'debrief') {
            ui.overlayTitle.textContent = 'Run complete';
            ui.overlayCopy.textContent = 'Open the debrief below to see what held up and what still needs work.';
            ui.overlayNote.textContent = 'Pick another drill or run this one again in a tougher mode.';
            ui.overlayStart.hidden = true;
            ui.overlayResume.hidden = false;
            ui.overlayResume.textContent = 'Back to drill menu';
            ui.overlayMenu.hidden = false;
        }
    }

    function runProgressPercent(state) {
        if (!state.pack) return 0;
        const outboundFraction = state.pathProgress / state.pack.halfLength;
        const returnFraction = (state.pack.halfLength - state.pathProgress) / state.pack.halfLength;
        const progress = state.leg === 'outbound' ? outboundFraction * 0.5 : 0.5 + (returnFraction * 0.5);
        return clamp(progress * 100, 0, 100);
    }

    function addLogEntry(state, status, title, detail) {
        state.log.push({
            status: status,
            title: title,
            detail: detail
        });
    }

    function positionToWorld(route, progress, offset) {
        const sample = sampleRoute(route, progress);
        const normal = normalAt(route, progress);
        return {
            x: sample.x + normal.x * offset,
            y: sample.y + normal.y * offset,
            width: sample.width
        };
    }

    function actorToWorld(route, actor) {
        return positionToWorld(route, actor.position, actor.offset);
    }

    function actorRotation(route, actor, camera) {
        const tangent = tangentAt(route, actor.position);
        const forward = {
            x: tangent.x * actor.travelSign,
            y: tangent.y * actor.travelSign
        };
        return screenAngleForDirection(forward, camera);
    }

    function screenAngleForDirection(direction, camera) {
        const sx = dot(direction, camera.right);
        const sy = -dot(direction, camera.forward);
        return Math.atan2(sx, sy);
    }

    function sampleRoute(route, progress) {
        const points = route.points;
        const s = clamp(progress, 0, route.totalLength);
        for (let index = 1; index < points.length; index += 1) {
            const a = points[index - 1];
            const b = points[index];
            if (s <= b.s || index === points.length - 1) {
                const segmentLength = Math.max(b.s - a.s, 0.0001);
                const t = clamp((s - a.s) / segmentLength, 0, 1);
                return {
                    x: lerp(a.x, b.x, t),
                    y: lerp(a.y, b.y, t),
                    width: lerp(a.width, b.width, t)
                };
            }
        }
        const last = points[points.length - 1];
        return { x: last.x, y: last.y, width: last.width };
    }

    function tangentAt(route, progress) {
        const p0 = sampleRoute(route, clamp(progress - 1, 0, route.totalLength));
        const p1 = sampleRoute(route, clamp(progress + 1, 0, route.totalLength));
        return normalize({ x: p1.x - p0.x, y: p1.y - p0.y });
    }

    function normalAt(route, progress) {
        return rotateClockwise(tangentAt(route, progress));
    }

    function buildFeatureKey(feature, leg) {
        return feature.id + '::' + leg;
    }

    function getFeatureKey(feature, leg) {
        return buildFeatureKey(feature, leg);
    }

    function worldToScreen(world, camera) {
        const rel = {
            x: world.x - camera.x,
            y: world.y - camera.y
        };
        const localX = dot(rel, camera.right);
        const localY = dot(rel, camera.forward);
        return {
            x: camera.playerX + (localX * camera.scale),
            y: camera.playerY - (localY * camera.scale)
        };
    }

    function screenVectorFromWorld(vector, scale) {
        return {
            x: vector.x * scale,
            y: vector.y * scale
        };
    }

    function routeBounds(route) {
        return route.points.reduce(function (bounds, point) {
            bounds.minX = Math.min(bounds.minX, point.x);
            bounds.maxX = Math.max(bounds.maxX, point.x);
            bounds.minY = Math.min(bounds.minY, point.y);
            bounds.maxY = Math.max(bounds.maxY, point.y);
            return bounds;
        }, {
            minX: Infinity,
            maxX: -Infinity,
            minY: Infinity,
            maxY: -Infinity
        });
    }

    function drawFlagLabel(ctx, x, y, text, tone) {
        ctx.save();
        ctx.font = '600 13px system-ui, sans-serif';
        const paddingX = 10;
        const paddingY = 7;
        const metrics = ctx.measureText(text);
        const width = metrics.width + (paddingX * 2);
        const height = 28;
        let fill = 'rgba(255, 231, 163, 0.94)';
        let ink = '#17323f';
        if (tone === 'light') {
            fill = 'rgba(255,255,255,0.92)';
            ink = '#17323f';
        }
        if (tone === 'muted') {
            fill = 'rgba(232, 238, 247, 0.68)';
            ink = '#17323f';
        }
        roundRect(ctx, x, y, width, height, 12);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.fillStyle = ink;
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x + paddingX, y + (height / 2) + 0.5);
        ctx.restore();
    }

    function drawDiamond(ctx, x, y, size) {
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x, y + size);
        ctx.lineTo(x - size, y);
        ctx.closePath();
    }

    function roundRect(ctx, x, y, width, height, radius) {
        const r = Math.min(radius, width / 2, height / 2);
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + width, y, x + width, y + height, r);
        ctx.arcTo(x + width, y + height, x, y + height, r);
        ctx.arcTo(x, y + height, x, y, r);
        ctx.arcTo(x, y, x + width, y, r);
        ctx.closePath();
    }

    function currentScaleFactor(canvas) {
        const cssWidth = canvas.clientWidth || CONFIG.width;
        return Math.max(1, canvas.width / cssWidth);
    }

    function resizeCanvas(canvas, ctx, compact) {
        const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, CONFIG.touchScaleCap));
        const targetWidth = compact ? canvas.clientWidth || 320 : canvas.clientWidth || CONFIG.width;
        const targetHeight = compact ? canvas.clientHeight || 220 : canvas.clientHeight || CONFIG.height;
        canvas.width = Math.round(targetWidth * dpr);
        canvas.height = Math.round(targetHeight * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function debriefStat(label, value) {
        return '<div class="river-trainer-score-card"><span>' + escapeHtml(label) + '</span><strong>' + escapeHtml(String(value)) + '</strong></div>';
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function isEditable(target) {
        return !!target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
    }

    function rotateClockwise(vector) {
        return {
            x: vector.y,
            y: -vector.x
        };
    }

    function normalize(vector) {
        const length = Math.hypot(vector.x, vector.y) || 1;
        return {
            x: vector.x / length,
            y: vector.y / length
        };
    }

    function dot(a, b) {
        return (a.x * b.x) + (a.y * b.y);
    }

    function lerp(a, b, t) {
        return a + ((b - a) * t);
    }

    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }

    function sign(value) {
        return value < 0 ? -1 : 1;
    }

    function distance(x1, y1, x2, y2) {
        return Math.hypot(x2 - x1, y2 - y1);
    }
}());
