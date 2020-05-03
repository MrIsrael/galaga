export default (state, action) => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        gameInfo: { ...state.gameInfo, ...{ buttonText: action.payload, pausedGame: false } }
      }
    case 'PAUSE_GAME':
      return {
        ...state,
        gameInfo: { ...state.gameInfo, ...{ buttonText: action.payload, pausedGame: true } }
      }
    case 'SHOW_KEY_CODE':
      return {
        ...state,
        gameInfo: { ...state.gameInfo, ...{ pressedKeyCode: action.payload } }
      }
    case 'INITIALIZE_PLAYER_ARRAY':
      return {
        ...state,
        playerInfo: action.payload
      }
    case 'MOVE_PLAYER':
      return {
        ...state,
        playerInfo: action.payload
      }
    case 'UPDATE_ENEMY_ARRAY':
      return {
        ...state,
        enemyInfo: action.payload,
        gameInfo: { ...state.gameInfo, ...{ enemiesLeft: action.payload.filter(alien => alien.type !== 'none' && alien.type !== 'bullet').length } }  // 87
      }
    case 'FIRE_BUTTON_PRESSED':
      return {
        ...state,
        gameInfo: { ...state.gameInfo, ...{ firedBullets: action.payload } }
      }
    default:
      return state
  }
}