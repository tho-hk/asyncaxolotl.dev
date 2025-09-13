import { explorationScene } from './scenes/exploration.js';
import { secretBaseScene } from './scenes/secretBase.js';

const scenes = {
  'Exploration': explorationScene,
  'SecretBase': secretBaseScene,
};

const character = document.getElementById('character');
const gameBoard = document.getElementById('game-board');
const gameWorld = document.getElementById('game-world');
const allSlidePanels = document.querySelectorAll('.slide-panel');

let obstacles = [];
let activeTriggers = [];

const player = { x: 0, y: 0, speed: 3, width: 32, height: 32 };
const pressedKeys = {};

const camera = { x: 0, y: 0, zoom: 2.6 };

const animations = {
  'idle-down': { frameY: 0, endFrame: 0 }, 'walk-down': { frameY: 0, endFrame: 3 },
  'idle-up': { frameY: 1, endFrame: 0 }, 'walk-up': { frameY: 1, endFrame: 3 },
  'idle-left': { frameY: 3, endFrame: 0 }, 'walk-left': { frameY: 3, endFrame: 3 },
  'idle-right': { frameY: 2, endFrame: 0 }, 'walk-right': { frameY: 2, endFrame: 3 },
};
let currentAnimation = 'idle-up';
let frameX = 0;
let frameTimer = 0;
const frameInterval = 150;

let lastTime = 0;
let world = { width: 0, height: 0 };

function loadScene(sceneName) {
  const sceneData = scenes[sceneName];
  if (!sceneData) {
    console.error(`Scene "${sceneName}" not found!`);
    return;
  }

  gameWorld.innerHTML = '';
  gameWorld.appendChild(character);
  obstacles = [];
  activeTriggers = [];

  world = sceneData.worldSize;
  gameWorld.style.width = world.width + 'px';
  gameWorld.style.height = world.height + 'px';
  gameWorld.style.backgroundImage = `url('${sceneData.backgroundImage}')`;

  document.getElementById('header-scene-name').textContent = `Scene: ${sceneData.name}`;

  player.x = sceneData.startPosition.x;
  player.y = sceneData.startPosition.y;

  sceneData.scenery.forEach(item => {
    const elem = document.createElement('div');
    elem.id = item.id;
    elem.className = 'scenery';
    Object.assign(elem.style, item.style);
    elem.style.backgroundImage = `url('assets/images/assets.png')`;
    gameWorld.appendChild(elem);
    obstacles.push(elem);
  });

  sceneData.triggers.forEach(triggerData => {
    const elem = document.createElement('div');
    elem.id = triggerData.id;
    elem.className = 'trigger-zone';
    elem.style.left = triggerData.rect.x + 'px';
    elem.style.top = triggerData.rect.y + 'px';
    elem.style.width = triggerData.rect.width + 'px';
    elem.style.height = triggerData.rect.height + 'px';
    gameWorld.appendChild(elem);
    activeTriggers.push({ element: elem, ...triggerData });
  });
}

function isColliding(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y
  );
}

function gameLoop(timestamp) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  let dx = 0, dy = 0;
  if (pressedKeys['ArrowLeft']) dx = -1;
  if (pressedKeys['ArrowRight']) dx = 1;
  if (pressedKeys['ArrowUp']) dy = -1;
  if (pressedKeys['ArrowDown']) dy = 1;

  let proposedX = player.x + dx * player.speed;
  let playerRectX = { ...player, x: proposedX };

  for (const obstacle of obstacles) {
    const obstacleRect = { x: obstacle.offsetLeft, y: obstacle.offsetTop, width: obstacle.offsetWidth, height: obstacle.offsetHeight };
    if (isColliding(playerRectX, obstacleRect)) {
      if (dx > 0) proposedX = obstacleRect.x - player.width;
      else if (dx < 0) proposedX = obstacleRect.x + obstacleRect.width;
      break;
    }
  }
  player.x = proposedX;

  let proposedY = player.y + dy * player.speed;
  let playerRectY = { ...player, y: proposedY };

  for (const obstacle of obstacles) {
    const obstacleRect = { x: obstacle.offsetLeft, y: obstacle.offsetTop, width: obstacle.offsetWidth, height: obstacle.offsetHeight };
    if (isColliding(playerRectY, obstacleRect)) {
      if (dy > 0) proposedY = obstacleRect.y - player.height;
      else if (dy < 0) proposedY = obstacleRect.y + obstacleRect.height;
      break;
    }
  }
  player.y = proposedY;

  player.x = Math.max(0, Math.min(player.x, world.width - player.width));
  player.y = Math.max(0, Math.min(player.y, world.height - player.height));

  const isMoving = dx !== 0 || dy !== 0;
  let direction = currentAnimation.split('-')[1] || 'down';
  if (dx === -1) direction = 'left'; if (dx === 1) direction = 'right';
  if (dy === -1) direction = 'up'; if (dy === 1) direction = 'down';
  currentAnimation = `${isMoving ? 'walk' : 'idle'}-${direction}`;

  frameTimer += deltaTime;
  if (frameTimer > frameInterval) {
    frameTimer = 0;
    const anim = animations[currentAnimation];
    frameX = (frameX + 1) % (anim.endFrame + 1);
  }

  character.style.left = player.x + 'px';
  character.style.top = player.y + 'px';
  const animData = animations[currentAnimation];
  character.style.backgroundPosition = `-${frameX * player.width}px -${animData.frameY * player.height}px`;

  let targetCameraX = player.x - (gameBoard.clientWidth / camera.zoom / 2);
  let targetCameraY = player.y - (gameBoard.clientHeight / camera.zoom / 2);

  const maxCameraX = world.width - (gameBoard.clientWidth / camera.zoom);
  const maxCameraY = world.height - (gameBoard.clientHeight / camera.zoom);
  camera.x = Math.max(0, Math.min(targetCameraX, maxCameraX));
  camera.y = Math.max(0, Math.min(targetCameraY, maxCameraY));

  gameWorld.style.transform = `scale(${camera.zoom}) translate(${-camera.x}px, ${-camera.y}px)`;

  const charRect = { x: player.x, y: player.y, width: player.width, height: player.height };
  let sceneToLoad = null;

  allSlidePanels.forEach(p => p.classList.remove('visible'));
  activeTriggers.forEach(t => t.element.classList.remove('collided'));

  for (const trigger of activeTriggers) {
    if (isColliding(charRect, trigger.rect)) {
      trigger.element.classList.add('collided');

      if (trigger.action) {
        switch (trigger.action.type) {
          case 'showMessage':
            const slideContent = document.getElementById(trigger.action.payload);
            if (slideContent) slideContent.classList.add('visible');
            break;
          case 'loadScene':
            sceneToLoad = trigger.action.payload;
            break;
        }
      }
    }
  }

  // --- BUG FIX: Restart the game loop after loading a new scene ---
  if (sceneToLoad) {
    loadScene(sceneToLoad);
    lastTime = timestamp; // Reset delta time to prevent frame jump
    requestAnimationFrame(gameLoop); // Restart the loop
    return; // End the current frame
  }
  // --- End of bug fix ---

  requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (e) => { pressedKeys[e.key] = true; });
window.addEventListener('keyup', (e) => { delete pressedKeys[e.key]; });

loadScene('Exploration');
requestAnimationFrame(gameLoop);