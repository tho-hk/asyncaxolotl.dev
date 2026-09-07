import { explorationScene } from './scenes/exploration.js';
import { actionHandlers } from './actions.js';

const scenes = {
  'Exploration': explorationScene,
};

const character = document.getElementById('character');
const gameBoard = document.getElementById('game-board');
const gameWorld = document.getElementById('game-world');

let obstacles = [];
let activeTriggers = [];
const player = { x: 0, y: 0, speed: 3, width: 32, height: 32 };
const pressedKeys = {};
const camera = { x: 0, y: 0, zoom: 2.6 };
let lastTime = 0;
let world = { width: 0, height: 0 };

window.playerState = { level: 1 };

function loadScene(sceneName) {
  const sceneData = scenes[sceneName];
  if (!sceneData) { console.error(`Scene "${sceneName}" not found!`); return; }

  gameWorld.innerHTML = '';
  gameWorld.appendChild(character);
  obstacles = [];
  activeTriggers = [];
  world = sceneData.worldSize;
  gameWorld.style.width = world.width + 'px';
  gameWorld.style.height = world.height + 'px';
  gameWorld.style.backgroundImage = `url('${sceneData.backgroundImage}')`;
  document.getElementById('header-scene-name').textContent = `Scene: ${sceneData.name}`;

  // Check for a special payload from a reset action
  if (window.startPositionOverride) {
    player.x = window.startPositionOverride.x;
    player.y = window.startPositionOverride.y;
    delete window.startPositionOverride; // Use it once and clear it
  } else {
    player.x = sceneData.startPosition.x;
    player.y = sceneData.startPosition.y;
  }

  (sceneData.scenery || []).forEach(item => {
    const elem = document.createElement('div');
    elem.id = item.id;
    elem.className = 'scenery';
    Object.assign(elem.style, item.style);
    gameWorld.appendChild(elem);
    obstacles.push(elem);
  });

  (sceneData.triggers || []).forEach(triggerData => {
    const elem = document.createElement('div');
    elem.id = triggerData.id;
    elem.className = 'trigger-zone';
    // --- BUG FIX IS HERE ---
    // We now correctly assign left, top, width, and height with 'px' units.
    elem.style.left = triggerData.rect.x + 'px';
    elem.style.top = triggerData.rect.y + 'px';
    elem.style.width = triggerData.rect.width + 'px';
    elem.style.height = triggerData.rect.height + 'px';
    // --- END BUG FIX ---
    gameWorld.appendChild(elem);
    activeTriggers.push({ element: elem, ...triggerData });
  });
}

function isColliding(rect1, rect2) { return (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y); }

function gameLoop(timestamp) {
  // (Player movement, collision, camera, etc. are unchanged)
  if (!lastTime) lastTime = timestamp;
  const deltaTime = timestamp - lastTime;
  let dx = 0, dy = 0;
  if (pressedKeys['ArrowLeft']) dx = -1; if (pressedKeys['ArrowRight']) dx = 1;
  if (pressedKeys['ArrowUp']) dy = -1; if (pressedKeys['ArrowDown']) dy = 1;
  let proposedX = player.x + dx * player.speed;
  let playerRectX = { ...player, x: proposedX };
  for (const obstacle of obstacles) { const obstacleRect = { x: obstacle.offsetLeft, y: obstacle.offsetTop, width: obstacle.offsetWidth, height: obstacle.offsetHeight }; if (isColliding(playerRectX, obstacleRect)) { if (dx > 0) proposedX = obstacleRect.x - player.width; else if (dx < 0) proposedX = obstacleRect.x + obstacleRect.width; break; } }
  player.x = proposedX;
  let proposedY = player.y + dy * player.speed;
  let playerRectY = { ...player, y: proposedY };
  for (const obstacle of obstacles) { const obstacleRect = { x: obstacle.offsetLeft, y: obstacle.offsetTop, width: obstacle.offsetWidth, height: obstacle.offsetHeight }; if (isColliding(playerRectY, obstacleRect)) { if (dy > 0) proposedY = obstacleRect.y - player.height; else if (dy < 0) proposedY = obstacleRect.y + obstacleRect.height; break; } }
  player.y = proposedY;
  player.x = Math.max(0, Math.min(player.x, world.width - player.width));
  player.y = Math.max(0, Math.min(player.y, world.height - player.height));
  character.style.left = player.x + 'px'; character.style.top = player.y + 'px';
  let targetCameraX = player.x - (gameBoard.clientWidth / camera.zoom / 2);
  let targetCameraY = player.y - (gameBoard.clientHeight / camera.zoom / 2);
  camera.x = Math.max(0, Math.min(targetCameraX, world.width - (gameBoard.clientWidth / camera.zoom)));
  camera.y = Math.max(0, Math.min(targetCameraY, world.height - (gameBoard.clientHeight / camera.zoom)));
  gameWorld.style.transform = `scale(${camera.zoom}) translate(${-camera.x}px, ${-camera.y}px)`;

  // --- Trigger Processing Logic (Unchanged) ---
  const charRect = { x: player.x, y: player.y, width: player.width, height: player.height };
  let sceneToLoad = null;
  let triggeredThisFrame = false;
  activeTriggers.forEach(t => t.element.classList.remove('collided'));
  for (const trigger of activeTriggers) {
    if (!triggeredThisFrame && isColliding(charRect, trigger.rect)) {
      trigger.element.classList.add('collided');
      triggeredThisFrame = true;
      const actionsToRun = trigger.actions || (trigger.action ? [trigger.action] : []);
      for (const action of actionsToRun) {
        const handler = actionHandlers[action.type];
        if (handler) {
          const result = handler(action.payload);
          if (result && result.type === 'loadScene') {
            sceneToLoad = result.payload;
          }
        }
      }
    }
  }

  if (sceneToLoad) {
    loadScene(sceneToLoad);
    lastTime = timestamp;
    requestAnimationFrame(gameLoop);
    return;
  }

  lastTime = timestamp;
  requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (e) => { pressedKeys[e.key] = true; });
window.addEventListener('keyup', (e) => { delete pressedKeys[e.key]; });

loadScene('Exploration');
requestAnimationFrame(gameLoop);