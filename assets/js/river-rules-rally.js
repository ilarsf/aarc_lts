document.addEventListener('DOMContentLoaded', function () {
    const root = document.querySelector('[data-river-rules-rally]');
    if (!root) return;

    initRiverRulesRally(root);
});

function initRiverRulesRally(root) {
    const CONFIG = {
        width: 960,
        height: 540,
        playerY: 392,
        courseLength: 1200,
        cruiseSpeed: 14.2,
        boostSpeed: 18.4,
        brakeSpeed: 6.1,
        steerRate: 255,
        lookAhead: 760,
        playerHalfWidth: 16,
        playerHalfHeight: 30
    };

    const canvas = root.querySelector('.river-rally-game__canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const ui = {
        overlay: root.querySelector('[data-overlay]'),
        overlayKicker: root.querySelector('[data-overlay-kicker]'),
        overlayTitle: root.querySelector('[data-overlay-title]'),
        overlayCopy: root.querySelector('[data-overlay-copy]'),
        overlayNote: root.querySelector('[data-overlay-note]'),
        overlayButton: root.querySelector('[data-action="overlay-start"]'),
        pauseButton: root.querySelector('[data-action="pause"]'),
        restartButton: root.querySelector('[data-action="restart"]'),
        score: root.querySelector('[data-stat="score"]'),
        distance: root.querySelector('[data-stat="distance"]'),
        lives: root.querySelector('[data-stat="lives"]'),
        combo: root.querySelector('[data-stat="combo"]'),
        progress: root.querySelector('[data-progress]'),
        message: root.querySelector('[data-game-message]'),
        missions: {
            lane: root.querySelector('[data-mission="lane"]'),
            pass: root.querySelector('[data-mission="pass"]'),
            turn: root.querySelector('[data-mission="turn"]')
        }
    };

    const state = createState();
    const keyMap = {
        ArrowLeft: 'left',
        ArrowRight: 'right',
        ArrowUp: 'up',
        ArrowDown: 'down'
    };

    resetState();
    resizeCanvas();
    syncOverlay();
    syncHud();
    requestAnimationFrame(frame);

    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('keydown', onKeyDown, { passive: false });
    window.addEventListener('keyup', onKeyUp, { passive: false });

    ui.overlayButton.addEventListener('click', function () {
        if (state.phase === 'paused') {
            resumeRun();
            return;
        }

        startNewRun();
    });

    ui.pauseButton.addEventListener('click', function () {
        if (state.phase === 'running') {
            pauseRun();
            return;
        }

        if (state.phase === 'paused') {
            resumeRun();
        }
    });

    ui.restartButton.addEventListener('click', function () {
        startNewRun();
    });

    root.querySelectorAll('[data-control]').forEach(function (button) {
        const control = button.getAttribute('data-control');

        button.addEventListener('pointerdown', function (event) {
            event.preventDefault();
            state.controls[control] = true;
            button.classList.add('is-pressed');
        });

        ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (eventName) {
            button.addEventListener(eventName, function () {
                state.controls[control] = false;
                button.classList.remove('is-pressed');
            });
        });
    });

    function createState() {
        return {
            phase: 'ready',
            lastFrame: 0,
            renderClock: 0,
            distance: 0,
            score: 0,
            lives: 3,
            combo: 0,
            safePasses: 0,
            turnsCompleted: 0,
            speed: CONFIG.cruiseSpeed,
            message: 'Hold the right side unless you are passing or making a river turn.',
            messageTone: 'calm',
            messageTimer: 0,
            penaltyCooldown: 0,
            flashTimer: 0,
            shakeTimer: 0,
            recentPassTimer: 0,
            recentTurnTimer: 0,
            wrongSideTime: 0,
            nextRegularDistance: 90,
            nextTurnDistance: 320,
            player: {
                x: 0
            },
            controls: {
                left: false,
                right: false,
                up: false,
                down: false
            },
            entities: [],
            particles: [],
            seenTips: new Set(),
            seed: 713
        };
    }

    function resetState() {
        state.distance = 0;
        state.score = 0;
        state.lives = 3;
        state.combo = 0;
        state.safePasses = 0;
        state.turnsCompleted = 0;
        state.speed = CONFIG.cruiseSpeed;
        state.message = 'Hold the right side unless you are passing or making a river turn.';
        state.messageTone = 'calm';
        state.messageTimer = 2.5;
        state.penaltyCooldown = 0;
        state.flashTimer = 0;
        state.shakeTimer = 0;
        state.recentPassTimer = 0;
        state.recentTurnTimer = 0;
        state.wrongSideTime = 0;
        state.nextRegularDistance = 90;
        state.nextTurnDistance = 320;
        state.entities = [];
        state.particles = [];
        state.seenTips = new Set();
        state.controls.left = false;
        state.controls.right = false;
        state.controls.up = false;
        state.controls.down = false;
        state.player.x = laneX(0, 0.22);
    }

    function resizeCanvas() {
        const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
        canvas.width = CONFIG.width * dpr;
        canvas.height = CONFIG.height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function frame(timestamp) {
        if (!state.lastFrame) {
            state.lastFrame = timestamp;
        }

        const dt = Math.min((timestamp - state.lastFrame) / 1000, 0.033);
        state.lastFrame = timestamp;
        state.renderClock += dt;

        if (state.phase === 'running') {
            update(dt);
        } else {
            updateParticles(dt);
        }

        render();
        syncHud();
        requestAnimationFrame(frame);
    }

    function startNewRun() {
        resetState();
        state.phase = 'running';
        state.lastFrame = performance.now();
        syncOverlay();
    }

    function pauseRun() {
        if (state.phase !== 'running') return;
        state.phase = 'paused';
        syncOverlay();
    }

    function resumeRun() {
        if (state.phase !== 'paused') return;
        state.phase = 'running';
        state.lastFrame = performance.now();
        syncOverlay();
    }

    function finishRun(victory) {
        state.phase = victory ? 'won' : 'gameover';
        syncOverlay();
    }

    function handleVisibilityChange() {
        if (document.hidden && state.phase === 'running') {
            pauseRun();
        }
    }

    function onKeyDown(event) {
        if (isEditable(event.target)) return;

        const control = keyMap[event.key];
        if (control) {
            event.preventDefault();
            state.controls[control] = true;
            return;
        }

        if (event.code === 'Space') {
            event.preventDefault();

            if (state.phase === 'running') {
                pauseRun();
            } else if (state.phase === 'paused') {
                resumeRun();
            } else {
                startNewRun();
            }
        }
    }

    function onKeyUp(event) {
        const control = keyMap[event.key];
        if (!control) return;

        event.preventDefault();
        state.controls[control] = false;
    }

    function update(dt) {
        state.penaltyCooldown = Math.max(0, state.penaltyCooldown - dt);
        state.flashTimer = Math.max(0, state.flashTimer - dt);
        state.shakeTimer = Math.max(0, state.shakeTimer - dt);
        state.messageTimer = Math.max(0, state.messageTimer - dt);
        state.recentPassTimer = Math.max(0, state.recentPassTimer - dt);
        state.recentTurnTimer = Math.max(0, state.recentTurnTimer - dt);

        updatePlayer(dt);
        state.distance = Math.min(CONFIG.courseLength, state.distance + state.speed * dt);

        spawnEntities();
        updateEntities(dt);
        updateParticles(dt);
        enforceRiverBanks();
        evaluateLaneRule(dt);

        if (state.messageTimer === 0) {
            const hint = getHintMessage();
            state.message = hint.text;
            state.messageTone = hint.tone;
        }

        if (state.distance >= CONFIG.courseLength) {
            state.score += 150;
            state.combo += 1;
            finishRun(true);
        }
    }

    function updatePlayer(dt) {
        const steering = (state.controls.right ? 1 : 0) - (state.controls.left ? 1 : 0);
        const targetSpeed = state.controls.down ? CONFIG.brakeSpeed : state.controls.up ? CONFIG.boostSpeed : CONFIG.cruiseSpeed;

        state.speed += (targetSpeed - state.speed) * Math.min(1, dt * 3.5);
        state.player.x += steering * CONFIG.steerRate * dt * (0.88 + (state.speed / 24));
        state.player.x = clamp(state.player.x, 35, CONFIG.width - 35);
    }

    function spawnEntities() {
        while (state.nextTurnDistance < state.distance + CONFIG.lookAhead) {
            createTurnEntity(state.nextTurnDistance);
            state.nextTurnDistance += randomBetween(260, 330);
        }

        while (state.nextRegularDistance < state.distance + CONFIG.lookAhead) {
            if (state.entities.some(function (entity) {
                return entity.kind === 'turn' && Math.abs(entity.worldY - state.nextRegularDistance) < 90;
            })) {
                state.nextRegularDistance += 110;
                continue;
            }

            createRegularEntity(state.nextRegularDistance);
            state.nextRegularDistance += randomBetween(62, 96);
        }
    }

    function createRegularEntity(worldY) {
        const roll = Math.random();
        const progress = state.distance / CONFIG.courseLength;

        if (roll < 0.24) {
            createSameDirectionBoat(worldY);
            if (progress > 0.35 && Math.random() < 0.28) {
                createOncomingBoat(worldY + randomBetween(28, 48));
            }
            return;
        }

        if (roll < 0.48) {
            createOncomingBoat(worldY);
            return;
        }

        if (roll < 0.68) {
            createWeedPatch(worldY);
            return;
        }

        if (roll < 0.86) {
            createCrossingPaddler(worldY);
            return;
        }

        createSwimmer(worldY);
    }

    function createSameDirectionBoat(worldY) {
        state.entities.push({
            kind: 'slow-boat',
            worldY: worldY,
            speed: randomBetween(7.8, 10.8),
            offset: randomBetween(0.17, 0.25),
            drift: randomBetween(-6, 6),
            wobbleSeed: Math.random() * Math.PI * 2,
            resolved: false
        });
    }

    function createOncomingBoat(worldY) {
        state.entities.push({
            kind: 'oncoming',
            worldY: worldY,
            speed: randomBetween(10.8, 14.6),
            offset: randomBetween(-0.28, -0.16),
            drift: randomBetween(-8, 8),
            wobbleSeed: Math.random() * Math.PI * 2,
            resolved: false
        });
    }

    function createWeedPatch(worldY) {
        state.entities.push({
            kind: 'weeds',
            worldY: worldY,
            offset: Math.random() < 0.5 ? randomBetween(0.34, 0.42) : randomBetween(-0.42, -0.34),
            radius: randomBetween(24, 32),
            resolved: false
        });
    }

    function createCrossingPaddler(worldY) {
        const startLeft = Math.random() < 0.5;
        state.entities.push({
            kind: 'paddler',
            worldY: worldY,
            absoluteX: laneX(worldY, startLeft ? -0.36 : 0.36),
            vx: startLeft ? randomBetween(35, 46) : randomBetween(-46, -35),
            speed: randomBetween(-1.4, 1.2),
            resolved: false
        });
    }

    function createSwimmer(worldY) {
        const startLeft = Math.random() < 0.5;
        state.entities.push({
            kind: 'swimmer',
            worldY: worldY,
            absoluteX: laneX(worldY, startLeft ? -0.39 : 0.39),
            vx: startLeft ? randomBetween(18, 28) : randomBetween(-28, -18),
            speed: randomBetween(-0.8, 0.8),
            resolved: false
        });
    }

    function createTurnEntity(worldY) {
        state.entities.push({
            kind: 'turn',
            worldY: worldY,
            currentStep: 0,
            resolved: false,
            failed: false,
            steps: [
                {
                    label: 'Brake',
                    type: 'stop',
                    worldY: worldY,
                    offset: 0.22,
                    radius: 30
                },
                {
                    label: 'Cross',
                    type: 'cross',
                    worldY: worldY + 36,
                    offset: -0.08,
                    radius: 30
                },
                {
                    label: 'Clear',
                    type: 'clear',
                    worldY: worldY + 78,
                    offset: 0.2,
                    radius: 32
                }
            ]
        });
    }

    function updateEntities(dt) {
        state.entities = state.entities.filter(function (entity) {
            if (entity.kind === 'slow-boat') {
                entity.worldY += entity.speed * dt;
                handleBoatCollision(entity, 21, 32, 'Pass left, not through the other shell.');
                resolveSafePass(entity);
                return screenY(entity.worldY) < CONFIG.height + 120;
            }

            if (entity.kind === 'oncoming') {
                entity.worldY -= entity.speed * dt;
                handleBoatCollision(entity, 22, 34, 'Oncoming traffic. Hold right and leave room.');

                if (!entity.resolved && entity.worldY < state.distance - 26) {
                    entity.resolved = true;
                    state.score += 18;
                }

                return screenY(entity.worldY) < CONFIG.height + 120 && screenY(entity.worldY) > -140;
            }

            if (entity.kind === 'weeds') {
                handleCircularCollision(entity, entity.radius, 'Weeds near shore. Give the shoreline more room.');

                if (!entity.resolved && entity.worldY < state.distance - 40) {
                    entity.resolved = true;
                    state.score += 10;
                }

                return screenY(entity.worldY) < CONFIG.height + 120;
            }

            if (entity.kind === 'paddler' || entity.kind === 'swimmer') {
                entity.worldY += entity.speed * dt;
                entity.absoluteX += entity.vx * dt;

                const halfWidth = Math.max(18, riverWidthAt(entity.worldY) / 2 - 16);
                const center = riverCenterAt(entity.worldY);
                const minX = center - halfWidth;
                const maxX = center + halfWidth;

                if (entity.absoluteX < minX || entity.absoluteX > maxX) {
                    entity.vx *= -1;
                    entity.absoluteX = clamp(entity.absoluteX, minX, maxX);
                }

                handleCircularCollision(entity, entity.kind === 'swimmer' ? 19 : 22, entity.kind === 'swimmer' ? 'Swimmer ahead. Slow down and steer clear.' : 'Unpredictable paddler. Stay cautious and give room.');

                if (!entity.resolved && entity.worldY < state.distance - 35) {
                    entity.resolved = true;
                    state.score += entity.kind === 'swimmer' ? 16 : 14;
                }

                return screenY(entity.worldY) < CONFIG.height + 120;
            }

            if (entity.kind === 'turn') {
                handleTurnEntity(entity);
                return !entity.resolved || entity.steps[entity.steps.length - 1].worldY > state.distance - 90;
            }

            return true;
        });
    }

    function updateParticles(dt) {
        state.particles = state.particles.filter(function (particle) {
            particle.life -= dt;
            if (particle.life <= 0) return false;

            particle.x += particle.vx * dt;
            particle.y += particle.vy * dt;
            particle.vy += 8 * dt;
            return true;
        });
    }

    function handleBoatCollision(entity, widthThreshold, heightThreshold, message) {
        const entityX = entityXPosition(entity);
        const entityY = screenY(entity.worldY);

        if (Math.abs(entityY - CONFIG.playerY) < heightThreshold && Math.abs(entityX - state.player.x) < widthThreshold) {
            entity.resolved = true;
            spawnBurst(entityX, entityY, '#f25f4c', 18);
            applyPenalty(message);
        }
    }

    function handleCircularCollision(entity, radius, message) {
        if (entity.resolved) return;

        const entityX = entityXPosition(entity);
        const entityY = screenY(entity.worldY);
        const dx = entityX - state.player.x;
        const dy = entityY - CONFIG.playerY;

        if ((dx * dx) + (dy * dy) < Math.pow(radius + 18, 2)) {
            entity.resolved = true;
            spawnBurst(entityX, entityY, '#f25f4c', 14);
            applyPenalty(message);
        }
    }

    function resolveSafePass(entity) {
        if (entity.resolved) return;

        if (entity.worldY < state.distance - 34) {
            entity.resolved = true;

            if (state.player.x < entityXPosition(entity) - 16) {
                state.safePasses += 1;
                state.combo += 1;
                state.recentPassTimer = 2.8;
                state.score += 85 + (state.combo * 8);
                spawnBurst(state.player.x, CONFIG.playerY - 18, '#f7b538', 16);
                setMessage('Clean pass. Move back right once the lane is clear.', 'success', 2.8);
                return;
            }

            applyPenalty('That pass was on the right side. Move left to overtake.');
        }
    }

    function handleTurnEntity(entity) {
        if (entity.resolved) return;

        const step = entity.steps[entity.currentStep];
        if (!step) {
            entity.resolved = true;
            entity.failed = false;
            state.turnsCompleted += 1;
            state.combo += 2;
            state.recentTurnTimer = 3.2;
            state.score += 130 + (state.combo * 6);
            spawnBurst(state.player.x, CONFIG.playerY - 10, '#8ad2d0', 22);
            setMessage('River turn complete. Clear of the zone and back to normal traffic.', 'success', 3);
            return;
        }

        if (!state.seenTips.has('turn') && entity.worldY - state.distance < 210) {
            state.seenTips.add('turn');
            setMessage('Turn zone ahead. Brake in the first ring, then cross left and clear out.', 'alert', 3.2);
        }

        if (state.distance > step.worldY + 16) {
            entity.resolved = true;
            entity.failed = true;
            applyPenalty('Missed the turn pattern. Stop, cross, then clear the area.');
            return;
        }

        const stepX = laneX(step.worldY, step.offset);
        const inWindow = Math.abs(state.distance - step.worldY) < 14 && Math.abs(state.player.x - stepX) < step.radius;

        if (!inWindow) return;

        if (step.type === 'stop' && state.speed > 7.3) {
            entity.resolved = true;
            entity.failed = true;
            applyPenalty('Too fast into the stop box. Brake before the turn.');
            return;
        }

        entity.currentStep += 1;
        spawnBurst(stepX, screenY(step.worldY), '#8ad2d0', 10);

        if (step.type === 'stop') {
            state.score += 25;
            setMessage('Good stop. Now swing left across the river.', 'alert', 2.2);
        } else if (step.type === 'cross') {
            state.score += 35;
            setMessage('Crossing cleanly. Finish the second turn and clear the lane.', 'alert', 2.2);
        }
    }

    function enforceRiverBanks() {
        const center = riverCenterAt(state.distance);
        const width = riverWidthAt(state.distance);
        const leftBank = center - (width / 2) + 8;
        const rightBank = center + (width / 2) - 8;

        if (state.player.x < leftBank || state.player.x > rightBank) {
            state.player.x = clamp(state.player.x, leftBank, rightBank);
            applyPenalty('Too close to shore. Stay off the banks and shallow edges.');
        }
    }

    function evaluateLaneRule(dt) {
        const center = riverCenterAt(state.distance);
        const hasPassWindow = getNearestEntity('slow-boat', 200) !== null;
        const activeTurn = getActiveTurn();
        const unsafeLeft = state.player.x < center - 18 && !hasPassWindow && !activeTurn;

        if (unsafeLeft) {
            state.wrongSideTime += dt;

            if (state.wrongSideTime > 1.15) {
                state.wrongSideTime = 0;
                applyPenalty('Left side is only for passing or turn setup. Return right.');
            }
        } else {
            state.wrongSideTime = Math.max(0, state.wrongSideTime - (dt * 2));
        }
    }

    function getHintMessage() {
        const activeTurn = getActiveTurn();
        if (activeTurn) {
            const step = activeTurn.steps[activeTurn.currentStep];
            if (step && step.type === 'stop') {
                return { text: 'Turn zone ahead. Brake into the first ring.', tone: 'alert' };
            }
            if (step && step.type === 'cross') {
                return { text: 'Move left across the river to the next ring.', tone: 'alert' };
            }
            if (step && step.type === 'clear') {
                return { text: 'Finish the turn and clear the lane for the next boat.', tone: 'alert' };
            }
        }

        const slowBoat = getNearestEntity('slow-boat', 220);
        if (slowBoat) {
            return { text: 'Slow shell ahead. Pass on the left, then settle back to the right side.', tone: 'alert' };
        }

        const oncoming = getNearestEntity('oncoming', 220);
        if (oncoming) {
            return { text: 'Oncoming traffic ahead. Hold right and keep the left side clear.', tone: 'calm' };
        }

        const center = riverCenterAt(state.distance);
        if (state.player.x < center - 18) {
            return { text: 'Return to the right side unless you are actively passing.', tone: 'danger' };
        }

        return { text: 'Clean water. Stay right, scan ahead, and be ready to adapt.', tone: 'calm' };
    }

    function applyPenalty(message) {
        if (state.penaltyCooldown > 0 || state.phase !== 'running') return;

        state.lives -= 1;
        state.combo = 0;
        state.score = Math.max(0, state.score - 70);
        state.speed = Math.max(CONFIG.brakeSpeed, state.speed - 3.5);
        state.penaltyCooldown = 1.2;
        state.flashTimer = 0.38;
        state.shakeTimer = 0.28;
        setMessage(message, 'danger', 2.8);

        if (state.lives <= 0) {
            finishRun(false);
        }
    }

    function setMessage(text, tone, duration) {
        state.message = text;
        state.messageTone = tone;
        state.messageTimer = duration;
    }

    function getNearestEntity(kind, maxAheadDistance) {
        let closest = null;
        let closestGap = Infinity;

        state.entities.forEach(function (entity) {
            if (entity.kind !== kind || entity.resolved) return;

            const gap = entity.worldY - state.distance;
            if (gap > 0 && gap < maxAheadDistance && gap < closestGap) {
                closest = entity;
                closestGap = gap;
            }
        });

        return closest;
    }

    function getActiveTurn() {
        return state.entities.find(function (entity) {
            return entity.kind === 'turn'
                && !entity.resolved
                && entity.worldY - state.distance < 220
                && entity.steps[entity.steps.length - 1].worldY - state.distance > -30;
        }) || null;
    }

    function syncHud() {
        ui.score.textContent = String(Math.max(0, Math.floor(state.score))).padStart(5, '0');
        ui.distance.textContent = `${Math.min(CONFIG.courseLength, Math.floor(state.distance))}m / ${CONFIG.courseLength}m`;
        ui.lives.textContent = String(state.lives);
        ui.combo.textContent = `${state.combo}x`;
        ui.progress.style.width = `${(Math.min(state.distance, CONFIG.courseLength) / CONFIG.courseLength) * 100}%`;
        ui.message.textContent = state.message;
        ui.message.className = `river-rally-panel__message is-${state.messageTone}`;

        syncMissionState(ui.missions.lane, laneMissionState());
        syncMissionState(ui.missions.pass, passMissionState());
        syncMissionState(ui.missions.turn, turnMissionState());
        ui.pauseButton.textContent = state.phase === 'paused' ? 'Resume' : 'Pause';
    }

    function syncMissionState(node, value) {
        if (!node) return;
        node.setAttribute('data-state', value);
    }

    function laneMissionState() {
        const center = riverCenterAt(state.distance);
        const passing = getNearestEntity('slow-boat', 200);
        if (state.player.x < center - 18 && !passing && !getActiveTurn()) {
            return 'danger';
        }

        if (state.penaltyCooldown > 0 && state.messageTone === 'danger') {
            return 'danger';
        }

        return 'active';
    }

    function passMissionState() {
        if (state.recentPassTimer > 0) return 'success';
        if (getNearestEntity('slow-boat', 220)) return 'active';
        return 'idle';
    }

    function turnMissionState() {
        if (state.recentTurnTimer > 0) return 'success';
        if (getActiveTurn()) return 'active';
        return 'idle';
    }

    function syncOverlay() {
        const summaries = {
            ready: {
                kicker: 'Safety Arcade',
                title: 'Launch River Rules Rally',
                copy: 'Use the arrow keys to steer, boost, and brake. Score points by following the real river rules instead of improvising.',
                note: 'Reach 1200m. Three mistakes and the session is over.',
                button: 'Launch run'
            },
            paused: {
                kicker: 'Session Paused',
                title: 'Your shell is waiting',
                copy: `You are ${Math.floor(state.distance)}m into the course with ${state.lives} lives left.`,
                note: 'Resume when you are ready to keep the lane clean.',
                button: 'Resume run'
            },
            won: {
                kicker: 'Course Complete',
                title: 'Clean row',
                copy: `Finished ${CONFIG.courseLength}m with ${state.lives} lives left, ${state.safePasses} safe passes, and ${state.turnsCompleted} clean turns.`,
                note: 'Run it again and see if you can finish with a bigger streak.',
                button: 'Row again'
            },
            gameover: {
                kicker: 'Practice Round Over',
                title: 'Back to the dock',
                copy: `You made it ${Math.floor(state.distance)}m with ${state.safePasses} safe passes and ${state.turnsCompleted} clean turns.`,
                note: 'Reset the course and try to keep the right side cleaner on the next run.',
                button: 'Try again'
            }
        };

        const mode = summaries[state.phase] || summaries.ready;
        ui.overlayKicker.textContent = mode.kicker;
        ui.overlayTitle.textContent = mode.title;
        ui.overlayCopy.textContent = mode.copy;
        ui.overlayNote.textContent = mode.note;
        ui.overlayButton.textContent = mode.button;
        ui.overlay.classList.toggle('is-hidden', state.phase === 'running');
    }

    function render() {
        ctx.clearRect(0, 0, CONFIG.width, CONFIG.height);

        ctx.save();
        applyShake();
        drawRiver();
        drawTurnPaths();
        drawEntities();
        drawParticles();
        drawPlayer();
        drawHudDecorations();

        if (state.flashTimer > 0) {
            ctx.fillStyle = `rgba(242, 95, 76, ${state.flashTimer * 0.35})`;
            ctx.fillRect(0, 0, CONFIG.width, CONFIG.height);
        }

        ctx.restore();
    }

    function drawRiver() {
        const landGradient = ctx.createLinearGradient(0, 0, 0, CONFIG.height);
        landGradient.addColorStop(0, '#8cb271');
        landGradient.addColorStop(0.55, '#7ba166');
        landGradient.addColorStop(1, '#c49a56');
        ctx.fillStyle = landGradient;
        ctx.fillRect(0, 0, CONFIG.width, CONFIG.height);

        const leftPoints = [];
        const rightPoints = [];

        for (let y = -24; y <= CONFIG.height + 24; y += 18) {
            const worldY = state.distance + (CONFIG.playerY - y);
            const center = riverCenterAt(worldY);
            const width = riverWidthAt(worldY);
            leftPoints.push({ x: center - (width / 2), y: y });
            rightPoints.push({ x: center + (width / 2), y: y });
        }

        const waterGradient = ctx.createLinearGradient(0, 0, 0, CONFIG.height);
        waterGradient.addColorStop(0, '#62cfd4');
        waterGradient.addColorStop(0.46, '#16718b');
        waterGradient.addColorStop(1, '#0d4b66');

        ctx.beginPath();
        ctx.moveTo(leftPoints[0].x, leftPoints[0].y);
        leftPoints.forEach(function (point) {
            ctx.lineTo(point.x, point.y);
        });
        rightPoints.slice().reverse().forEach(function (point) {
            ctx.lineTo(point.x, point.y);
        });
        ctx.closePath();
        ctx.fillStyle = waterGradient;
        ctx.fill();

        ctx.beginPath();
        leftPoints.forEach(function (point, index) {
            if (index === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        });
        ctx.strokeStyle = '#f3d48a';
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.beginPath();
        rightPoints.forEach(function (point, index) {
            if (index === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        });
        ctx.stroke();

        drawLaneRibbon(0.2, 'rgba(247, 181, 56, 0.45)');
        drawLaneRibbon(-0.2, 'rgba(255, 255, 255, 0.18)');
    }

    function drawLaneRibbon(offset, color) {
        ctx.beginPath();
        for (let y = -12; y <= CONFIG.height + 12; y += 18) {
            const worldY = state.distance + (CONFIG.playerY - y);
            const x = laneX(worldY, offset);
            if (y === -12) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.setLineDash([10, 10]);
        ctx.lineWidth = 2;
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.setLineDash([]);
    }

    function drawTurnPaths() {
        state.entities.forEach(function (entity) {
            if (entity.kind !== 'turn' || entity.resolved) return;

            const visibleSteps = entity.steps.filter(function (step) {
                return screenY(step.worldY) > -80 && screenY(step.worldY) < CONFIG.height + 80;
            });

            if (!visibleSteps.length) return;

            ctx.beginPath();
            visibleSteps.forEach(function (step, index) {
                const x = laneX(step.worldY, step.offset);
                const y = screenY(step.worldY);
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.strokeStyle = 'rgba(138, 210, 208, 0.55)';
            ctx.lineWidth = 3;
            ctx.setLineDash([8, 8]);
            ctx.stroke();
            ctx.setLineDash([]);

            entity.steps.forEach(function (step, index) {
                const x = laneX(step.worldY, step.offset);
                const y = screenY(step.worldY);
                if (y < -60 || y > CONFIG.height + 60) return;

                const isCurrent = entity.currentStep === index;
                const isPast = entity.currentStep > index;
                ctx.beginPath();
                ctx.arc(x, y, step.radius, 0, Math.PI * 2);
                ctx.fillStyle = isPast ? 'rgba(138, 210, 208, 0.18)' : 'rgba(8, 28, 35, 0.18)';
                ctx.fill();
                ctx.lineWidth = isCurrent ? 4 : 2;
                ctx.strokeStyle = isPast ? '#8ad2d0' : 'rgba(138, 210, 208, 0.8)';
                ctx.stroke();

                ctx.fillStyle = '#eff7f8';
                ctx.font = 'bold 14px "Courier New", monospace';
                ctx.textAlign = 'center';
                ctx.fillText(step.label, x, y + 4);
            });
        });
    }

    function drawEntities() {
        const drawable = state.entities
            .filter(function (entity) {
                return entity.kind !== 'turn';
            })
            .map(function (entity) {
                return {
                    entity: entity,
                    x: entityXPosition(entity),
                    y: screenY(entity.worldY)
                };
            })
            .filter(function (entry) {
                return entry.y > -120 && entry.y < CONFIG.height + 120;
            })
            .sort(function (a, b) {
                return a.y - b.y;
            });

        drawable.forEach(function (entry) {
            if (entry.entity.kind === 'slow-boat') {
                drawShell(entry.x, entry.y, 0, '#f7b538', '#734c00');
            } else if (entry.entity.kind === 'oncoming') {
                drawShell(entry.x, entry.y, Math.PI, '#ff875f', '#5b1f17');
            } else if (entry.entity.kind === 'weeds') {
                drawWeeds(entry.x, entry.y, entry.entity.radius);
            } else if (entry.entity.kind === 'paddler') {
                drawPaddler(entry.x, entry.y);
            } else if (entry.entity.kind === 'swimmer') {
                drawSwimmer(entry.x, entry.y);
            }
        });
    }

    function drawShell(x, y, rotation, hullColor, detailColor) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
        ctx.beginPath();
        ctx.ellipse(0, 22, 9, 22, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = detailColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-26, 2);
        ctx.lineTo(26, 2);
        ctx.moveTo(-24, 12);
        ctx.lineTo(24, 12);
        ctx.stroke();

        ctx.fillStyle = hullColor;
        ctx.beginPath();
        ctx.moveTo(0, -26);
        ctx.quadraticCurveTo(12, -8, 10, 20);
        ctx.quadraticCurveTo(0, 28, -10, 20);
        ctx.quadraticCurveTo(-12, -8, 0, -26);
        ctx.fill();

        ctx.strokeStyle = detailColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#f6f2e9';
        ctx.beginPath();
        ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    function drawWeeds(x, y, radius) {
        for (let index = 0; index < 7; index += 1) {
            const angle = (Math.PI * 2 * index) / 7;
            const leafX = x + Math.cos(angle) * (radius * 0.48);
            const leafY = y + Math.sin(angle) * (radius * 0.38);
            ctx.fillStyle = index % 2 === 0 ? '#1f7a4c' : '#2da764';
            ctx.beginPath();
            ctx.ellipse(leafX, leafY, 6, 12, angle, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.strokeStyle = '#11472e';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, radius * 0.85, 0, Math.PI * 2);
        ctx.stroke();
    }

    function drawPaddler(x, y) {
        ctx.save();
        ctx.translate(x, y);
        ctx.fillStyle = '#f6d743';
        ctx.beginPath();
        ctx.ellipse(0, 0, 18, 10, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#523311';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-22, -10);
        ctx.lineTo(22, 10);
        ctx.stroke();
        ctx.restore();
    }

    function drawSwimmer(x, y) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.42)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, 14, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#f25f4c';
        ctx.beginPath();
        ctx.arc(x, y - 4, 6, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawParticles() {
        state.particles.forEach(function (particle) {
            const alpha = particle.life / particle.maxLife;
            ctx.globalAlpha = alpha;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        });
    }

    function drawPlayer() {
        const boostFactor = state.controls.up && state.phase === 'running' ? 1.2 : 1;

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
        ctx.lineWidth = 3 * boostFactor;
        ctx.beginPath();
        ctx.moveTo(state.player.x - 6, CONFIG.playerY + 26);
        ctx.lineTo(state.player.x - 10, CONFIG.playerY + 48);
        ctx.moveTo(state.player.x + 6, CONFIG.playerY + 26);
        ctx.lineTo(state.player.x + 10, CONFIG.playerY + 48);
        ctx.stroke();

        drawShell(state.player.x, CONFIG.playerY, 0, '#f2f4f7', '#163745');

        ctx.strokeStyle = '#ff9852';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(state.player.x - 24, CONFIG.playerY - 2);
        ctx.lineTo(state.player.x - 54, CONFIG.playerY + 12);
        ctx.moveTo(state.player.x + 24, CONFIG.playerY - 2);
        ctx.lineTo(state.player.x + 54, CONFIG.playerY + 12);
        ctx.stroke();
    }

    function drawHudDecorations() {
        ctx.fillStyle = 'rgba(4, 13, 19, 0.18)';
        ctx.fillRect(16, 16, 170, 42);
        ctx.fillStyle = '#fff6e9';
        ctx.font = 'bold 13px "Courier New", monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`Speed ${Math.round(state.speed)} | Safe passes ${state.safePasses}`, 28, 42);
    }

    function applyShake() {
        if (state.shakeTimer <= 0) return;

        const intensity = state.shakeTimer * 9;
        ctx.translate((Math.random() - 0.5) * intensity, (Math.random() - 0.5) * intensity);
    }

    function spawnBurst(x, y, color, count) {
        for (let index = 0; index < count; index += 1) {
            const life = randomBetween(0.35, 0.7);
            state.particles.push({
                x: x,
                y: y,
                vx: randomBetween(-50, 50),
                vy: randomBetween(-55, 10),
                color: color,
                size: randomBetween(2, 4),
                life: life,
                maxLife: life
            });
        }
    }

    function entityXPosition(entity) {
        if (typeof entity.absoluteX === 'number') {
            return entity.absoluteX;
        }

        const wobbleAmount = entity.drift || 0;
        const wobbleSeed = entity.wobbleSeed || 0;
        const wobble = wobbleAmount ? Math.sin((state.renderClock * 2.4) + wobbleSeed) * wobbleAmount : 0;
        return laneX(entity.worldY, entity.offset) + wobble;
    }

    function riverCenterAt(worldY) {
        return (CONFIG.width / 2)
            + (Math.sin((worldY + state.seed) / 165) * 112)
            + (Math.sin((worldY + (state.seed * 0.4)) / 72) * 34);
    }

    function riverWidthAt(worldY) {
        return 328
            + (Math.sin((worldY + state.seed) / 205) * 30)
            + (Math.sin((worldY + 90) / 94) * 11);
    }

    function laneX(worldY, offset) {
        return riverCenterAt(worldY) + (riverWidthAt(worldY) * offset);
    }

    function screenY(worldY) {
        return CONFIG.playerY - (worldY - state.distance);
    }

    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }

    function randomBetween(min, max) {
        return min + (Math.random() * (max - min));
    }

    function isEditable(target) {
        return target instanceof HTMLElement && (
            target.isContentEditable ||
            target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.tagName === 'SELECT'
        );
    }
}
