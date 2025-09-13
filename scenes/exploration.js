export const explorationScene = {
  name: 'Outer Woods',
  worldSize: { width: 1200, height: 800 },
  backgroundImage: 'assets/images/map1_background.png',
  startPosition: { x: 50, y: 730 },
  scenery: [
    { id: 'tree', style: { width: '96px', height: '128px', left: '150px', top: '550px', backgroundPosition: '0 0' } },
    { id: 'tent', style: { width: '96px', height: '64px', left: '900px', top: '600px', backgroundPosition: '-448px -576px' } }
  ],
  triggers: [
    // This trigger shows a message panel
    { 
      id: 'mission-briefing-trigger', 
      rect: { x: 1020, y: 80, width: 100, height: 100 }, 
      action: { type: 'showMessage', payload: 'slide-content' } 
    },
    // NEW: This trigger loads another scene
    {
      id: 'enter-secret-base-trigger',
      rect: { x: 1150, y: 300, width: 50, height: 200 },
      action: { type: 'loadScene', payload: 'SecretBase' }
    }
  ]
};