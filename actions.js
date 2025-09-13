/**
 * This is the COMPLETE and corrected set of action handlers.
 * It includes all required functions, not just a subset.
 */

const rightPanel = document.getElementById('right-panel-content');

function resetPanels() {
  rightPanel.innerHTML = `<h1>職涯求生！</h1><p>職涯生存</p><hr>`;
  document.querySelectorAll('.slide-panel').forEach(p => p.classList.remove('visible'));
}

export const actionHandlers = {
  showMessage: (payload) => {
    document.querySelectorAll('.slide-panel').forEach(p => p.classList.remove('visible'));
    const panel = document.getElementById(payload);
    if (panel) {
      panel.classList.add('visible');
    } else {
      console.warn(`showMessage failed: Panel with ID "${payload}" not found.`);
    }
  },

  showImage: (payload) => {
    resetPanels();
    const img = document.createElement('img');
    img.src = payload.url;
    img.alt = payload.alt;
    img.style.width = '100%';
    img.style.borderRadius = '8px';
    rightPanel.appendChild(img);
  },

  playMedia: (payload) => {
    resetPanels();
    const mediaElement = document.createElement(payload.type);
    mediaElement.src = payload.url;
    mediaElement.controls = true;
    mediaElement.autoplay = true;
    if (payload.type === 'video') {
      mediaElement.style.width = '100%';
    }
    rightPanel.appendChild(mediaElement);
  },

  openExternalLink: (payload) => {
    window.open(payload.url, '_blank');
  },

  incrementLevel: () => {
    if (window.playerState) {
      window.playerState.level++;
      const levelDisplay = document.getElementById('player-level-display');
      if (levelDisplay) {
        levelDisplay.textContent = `Player Level: ${window.playerState.level}`;
      }
    }
  },

  loadScene: (payload) => {
    let sceneName;
    if (typeof payload === 'string') {
      sceneName = payload;
    } else {
      sceneName = payload.scene;
      window.startPositionOverride = { x: payload.x, y: payload.y };
    }
    return { type: 'loadScene', payload: sceneName };
  },

  resetPlayerPosition: () => {
    return { type: 'loadScene', payload: 'Exploration' };
  }
};