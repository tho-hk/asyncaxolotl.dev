/**
 * This version enforces a consistent data structure.
 * ALL triggers now use the plural `actions` array.
 */
export const explorationScene = {
  name: 'Town Exploration',
  backgroundImage: '../assets/images/map1.png',
  worldSize: { width: 1280, height: 720 },
  startPosition: { x: 0, y: 256 },
  scenery: [
    { id: 'building-top-left', style: { left: '192px', top: '0px', width: '288px', height: '224px' } },
    { id: 'building-top-right-group', style: { left: '860px', top: '32px', width: '495px', height: '192px' } },
    { id: 'building-bottom-right', style: { left: '192px', top: '420px', width: '1008px', height: '192px' } },
    { id: 'park-bench-1', style: { left: '550px', top: '100px', width: '80px', height: '30px' } },
    { id: 'park-bench-2', style: { left: '550px', top: '180px', width: '80px', height: '30px' } },
    { id: 'park-sign', style: { left: '725px', top: '35px', width: '25px', height: '40px' } },
    { id: 'tree-1', style: { left: '350px', top: '295px', width: '20px', height: '20px' } },
    { id: 'tree-2', style: { left: '500px', top: '60px', width: '20px', height: '20px' } },
    { id: 'tree-3', style: { left: '650px', top: '130px', width: '20px', height: '20px' } },
    { id: 'tree-4', style: { left: '955px', top: '295px', width: '20px', height: '20px' } },
    { id: 'tree-5', style: { left: '115px', top: '670px', width: '20px', height: '20px' } },
    { id: 'tree-6', style: { left: '485px', top: '670px', width: '20px', height: '20px' } },
    { id: 'tree-8', style: { left: '1180px', top: '670px', width: '20px', height: '20px' } },
  ],

  triggers: [
    // Top Row Triggers
    {
      id: 'trigger-boutique', rect: { x: 250, y: 200, width: 40, height: 64 }, actions: [
        { type: 'showMessage', payload: 'slide-boutique-door' },
        { type: 'openExternalLink', payload: { url: 'https://www.vogue.com' } }
      ]
    },
    {
      id: 'trigger-top-apt', rect: { x: 410, y: 200, width: 40, height: 64 }, actions: [
        { type: 'showMessage', payload: 'slide-locked-door' },
        { type: 'playMedia', payload: { url: '../assets/sounds/mystery.mp3', type: 'audio' } }
      ]
    },
    {
      id: 'trigger-fruit-shop', rect: { x: 900, y: 200, width: 40, height: 64 }, actions: [
        { type: 'showMessage', payload: 'slide-fruit-shop-door' },
        { type: 'showImage', payload: { url: '../assets/images/interiors/fruit-shop.jpg', alt: 'Inside of the fruit shop' } }
      ]
    },

    // --- CORRECTED TRIGGER ---
    {
      id: 'trigger-brown-building', rect: { x: 1110, y: 200, width: 40, height: 64 },
      actions: [
        { type: 'openExternalLink', payload: { url: 'https://www.google.com/maps' } }
      ]
    },
    {
      id: 'trigger-coffee-shop', rect: { x: 1250, y: 200, width: 40, height: 64 }, actions: [
        { type: 'playMedia', payload: { url: '../assets/sounds/level-up.mp3', type: 'audio' } },
        { type: 'incrementLevel', payload: null },
        { type: 'resetPlayerPosition', payload: null }
      ]
    },

    // Bottom Row Triggers
    {
      id: 'trigger-dark-blue-apt', rect: { x: 224, y: 580, width: 40, height: 64 }, actions: [
        { type: 'showMessage', payload: 'slide-locked-door' },
        { type: 'showImage', payload: { url: '../assets/images/interiors/dark-apt.jpg', alt: 'Inside a dark apartment' } }
      ]
    },
    {
      id: 'trigger-red-brick-apt', rect: { x: 464, y: 580, width: 40, height: 64 }, actions: [
        { type: 'showMessage', payload: 'slide-locked-door' },
        { type: 'showImage', payload: { url: '../assets/images/interiors/red-apt.jpg', alt: 'Inside a red brick apartment' } }
      ]
    },
    {
      id: 'trigger-bottom-shops', rect: { x: 616, y: 580, width: 40, height: 64 }, actions: [
        { type: 'showMessage', payload: 'slide-closed-shop-door' },
        { type: 'playMedia', payload: { url: '../assets/media/ad.mp4', type: 'video' } }
      ]
    },

    // --- CORRECTED TRIGGER ---
    {
      id: 'trigger-garage-apt', rect: { x: 800, y: 580, width: 40, height: 64 },
      actions: [
        { type: 'showMessage', payload: 'slide-garage-opening' }
      ]
    },

    // --- CORRECTED TRIGGER ---
    {
      id: 'trigger-corner-store', rect: { x: 1184, y: 580, width: 40, height: 64 },
      actions: [
        { type: 'showMessage', payload: 'slide-corner-store-door' }
      ]
    },
  ]
};