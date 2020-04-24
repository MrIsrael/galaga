export default (state, action) => {
  switch (action.type) {
    case 'START_GAME':
      return {
         ...state,
        resumeButtonText: action.payload
      }
    case 'PAUSE_GAME':
      return {
        ...state,
        resumeButtonText: action.payload
      }
    case 'SHOW_KEY_CODE':
      return {
        ...state,
        pressedKeyCode: action.payload
      }
    case 'INITIALIZE_PLAYER_ARRAY':
      return {
        ...state,
        playerPos: action.payload
      }
    case 'FIRE_BUTTON_PRESSED':
      return {
        ...state,
        killed: action.payload
      }
    case 'MOVE_PLAYER':
      return {
        ...state,
        playerPos: action.payload
      }
    default:
      return state
  }
}