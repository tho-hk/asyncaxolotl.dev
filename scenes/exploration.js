/**
 * Collision zones rebuilt against the real map image (map1.png, 1280x640).
 * Scenery = solid obstacles measured from the map; triggers sit on the
 * sidewalk in front of each door so the player can actually reach them.
 */
export const explorationScene = {
  name: 'Town Exploration',
  backgroundImage: '../assets/images/map1.png',
  worldSize: { width: 1280, height: 640 },
  startPosition: { x: 0, y: 256 },
  scenery: [
    { id: 'bldg-corner-white', style: { left: '128px', top: '0px', width: '34px', height: '34px' } },
    { id: 'bldg-shops-left', style: { left: '160px', top: '0px', width: '288px', height: '224px' } },
    { id: 'bldg-fruit-top', style: { left: '762px', top: '64px', width: '106px', height: '160px' } },
    { id: 'bldg-brown', style: { left: '864px', top: '32px', width: '192px', height: '200px' } },
    { id: 'bldg-shops-right', style: { left: '1056px', top: '32px', width: '192px', height: '192px' } },
    { id: 'bldg-white-blue', style: { left: '160px', top: '418px', width: '96px', height: '158px' } },
    { id: 'bldg-red-brick', style: { left: '256px', top: '384px', width: '256px', height: '192px' } },
    { id: 'bldg-white-shops', style: { left: '512px', top: '390px', width: '256px', height: '186px' } },
    { id: 'bldg-garage', style: { left: '768px', top: '390px', width: '352px', height: '186px' } },
    { id: 'bldg-corner-store', style: { left: '1120px', top: '448px', width: '160px', height: '128px' } },
    { id: 'park-tree', style: { left: '482px', top: '2px', width: '30px', height: '44px' } },
    { id: 'park-bush-1', style: { left: '490px', top: '98px', width: '14px', height: '16px' } },
    { id: 'park-bush-2', style: { left: '490px', top: '162px', width: '14px', height: '16px' } },
    { id: 'park-bench-1', style: { left: '522px', top: '37px', width: '44px', height: '17px' } },
    { id: 'park-bench-2', style: { left: '522px', top: '101px', width: '44px', height: '17px' } },
    { id: 'park-bench-3', style: { left: '522px', top: '165px', width: '44px', height: '17px' } },
    { id: 'park-sign', style: { left: '614px', top: '10px', width: '24px', height: '52px' } },
    { id: 'tree-1', style: { left: '226px', top: '224px', width: '30px', height: '54px' } },
    { id: 'tree-2', style: { left: '450px', top: '224px', width: '30px', height: '54px' } },
    { id: 'tree-3', style: { left: '898px', top: '224px', width: '30px', height: '54px' } },
    { id: 'tree-4', style: { left: '1058px', top: '224px', width: '30px', height: '54px' } },
    { id: 'hydrant-1', style: { left: '330px', top: '262px', width: '13px', height: '22px' } },
    { id: 'hydrant-2', style: { left: '970px', top: '262px', width: '13px', height: '22px' } },
    { id: 'lamp-1', style: { left: '621px', top: '206px', width: '10px', height: '52px' } },
    { id: 'lamp-2', style: { left: '749px', top: '206px', width: '10px', height: '52px' } },
    { id: 'sandwich-board-1', style: { left: '1252px', top: '200px', width: '18px', height: '26px' } },
    { id: 'traffic-light-1', style: { left: '138px', top: '244px', width: '12px', height: '46px' } },
    { id: 'tree-5', style: { left: '226px', top: '576px', width: '30px', height: '54px' } },
    { id: 'tree-6', style: { left: '450px', top: '576px', width: '30px', height: '54px' } },
    { id: 'tree-7', style: { left: '898px', top: '576px', width: '30px', height: '54px' } },
    { id: 'tree-8', style: { left: '1058px', top: '576px', width: '30px', height: '54px' } },
    { id: 'hydrant-3', style: { left: '330px', top: '614px', width: '13px', height: '22px' } },
    { id: 'hydrant-4', style: { left: '970px', top: '614px', width: '13px', height: '22px' } },
    { id: 'lamp-3', style: { left: '523px', top: '560px', width: '10px', height: '62px' } },
    { id: 'lamp-4', style: { left: '1131px', top: '560px', width: '10px', height: '62px' } },
    { id: 'sandwich-board-2', style: { left: '740px', top: '576px', width: '22px', height: '34px' } },
    { id: 'traffic-light-2', style: { left: '138px', top: '596px', width: '12px', height: '44px' } },
  ],

  triggers: [
    {
      id: 'trigger-boutique', rect: { x: 225, y: 200, width: 72, height: 56 }, actions: [
        { type: 'showMessage', payload: 'slide-boutique-door' },
        { type: 'openExternalLink', payload: { url: 'https://www.vogue.com' } }
      ]
    },
    {
      id: 'trigger-top-apt', rect: { x: 378, y: 200, width: 48, height: 56 }, actions: [
        { type: 'showMessage', payload: 'slide-locked-door' },
        { type: 'playMedia', payload: { url: '../assets/sounds/mystery.mp3', type: 'audio' } }
      ]
    },
    {
      id: 'trigger-fruit-shop', rect: { x: 773, y: 200, width: 48, height: 56 }, actions: [
        { type: 'showMessage', payload: 'slide-fruit-shop-door' },
        { type: 'showImage', payload: { url: '../assets/images/interiors/fruit-shop.jpg', alt: 'Inside of the fruit shop' } }
      ]
    },
    {
      id: 'trigger-brown-building', rect: { x: 984, y: 208, width: 48, height: 56 }, actions: [
        { type: 'openExternalLink', payload: { url: 'https://www.google.com/maps' } }
      ]
    },
    {
      id: 'trigger-coffee-shop', rect: { x: 1213, y: 200, width: 48, height: 56 }, actions: [
        { type: 'playMedia', payload: { url: '../assets/sounds/level-up.mp3', type: 'audio' } },
        { type: 'incrementLevel', payload: null },
        { type: 'resetPlayerPosition', payload: null }
      ]
    },
    {
      id: 'trigger-dark-blue-apt', rect: { x: 184, y: 552, width: 48, height: 56 }, actions: [
        { type: 'showMessage', payload: 'slide-locked-door' },
        { type: 'showImage', payload: { url: '../assets/images/interiors/dark-apt.jpg', alt: 'Inside a dark apartment' } }
      ]
    },
    {
      id: 'trigger-red-brick-apt', rect: { x: 400, y: 552, width: 48, height: 56 }, actions: [
        { type: 'showMessage', payload: 'slide-locked-door' },
        { type: 'showImage', payload: { url: '../assets/images/interiors/red-apt.jpg', alt: 'Inside a red brick apartment' } }
      ]
    },
    {
      id: 'trigger-bottom-shops', rect: { x: 562, y: 552, width: 48, height: 56 }, actions: [
        { type: 'showMessage', payload: 'slide-closed-shop-door' },
        { type: 'playMedia', payload: { url: '../assets/media/ad.mp4', type: 'video' } }
      ]
    },
    {
      id: 'trigger-garage-apt', rect: { x: 1024, y: 552, width: 72, height: 56 }, actions: [
        { type: 'showMessage', payload: 'slide-garage-opening' }
      ]
    },
    {
      id: 'trigger-corner-store', rect: { x: 1225, y: 552, width: 48, height: 56 }, actions: [
        { type: 'showMessage', payload: 'slide-corner-store-door' }
      ]
    },
  ]
};
