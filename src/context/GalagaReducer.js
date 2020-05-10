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
    case 'INCREMENT_TIME_ELAPSED':
      return {
        ...state,
        gameInfo: { ...state.gameInfo, ...{ timeElapsed: action.payload } }
      }
    case 'SHOW_KEY_CODE':
      return {
        ...state,
        gameInfo: { ...state.gameInfo, ...{ pressedKeyCode: action.payload } }
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
        gameInfo: { ...state.gameInfo, 
                    ...{ enemiesLeft: action.payload.filter(alien => alien.type !== 'none' && alien.type !== 'bullet' &&
                                                                     alien.type !== 'explosion' && alien.type !== 'bomb').length,   // valor inicial = 87
                         firedBullets: action.firedBullets,
                         bulletShot: action.bulletShot
                       } 
                  }
      }
    default:
      return state
  }
}