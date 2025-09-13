export const secretBaseScene = {
  name: 'Secret Command Center',
  worldSize: { width: 1024, height: 768 },
  backgroundImage: 'assets/images/secret_base_map.png',
  // MODIFIED: Player starts on the far left
  startPosition: { x: 60, y: 384 },
  scenery: [
    // NEW: Added two scenery objects to act as obstacles
    {
      id: 'computer-terminal',
      style: { width: '96px', height: '96px', left: '464px', top: '0px', backgroundPosition: '-320px -448px' }
    },
    {
      id: 'cryo-pod',
      style: { width: '64px', height: '96px', left: '800px', top: '672px', backgroundPosition: '-384px -544px' }
    }
  ],
  triggers: [
    {
      id: 'server-info-trigger',
      rect: { x: 450, y: 90, width: 120, height: 50 },
      action: { type: 'showMessage', payload: 'server-info-panel' }
    },
    // MODIFIED: Trigger to return to Scene 1 is now at the top-left
    {
      id: 'exit-secret-base-trigger',
      rect: { x: 0, y: 0, width: 200, height: 100 },
      action: { type: 'loadScene', payload: 'Exploration' }
    }
  ]
};