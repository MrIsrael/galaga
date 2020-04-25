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
        playerInfo: action.payload
      }
    case 'UPDATE_ENEMY_ARRAY':
      return {
        ...state,
        enemyInfo: action.payload,
        enemiesLeft: action.size
      }
    case 'FIRE_BUTTON_PRESSED':
      return {
        ...state,
        firedBullets: action.payload
      }
    case 'MOVE_PLAYER':
      return {
        ...state,
        playerInfo: action.payload
      }
    default:
      return state
  }
}