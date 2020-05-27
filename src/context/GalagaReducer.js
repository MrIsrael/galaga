export default (state, action) => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
      gameInfo: { ...state.gameInfo, ...{ buttonText: action.payload, mainFrameText: action.mainFrameText, pausedGame: false } }
      }
    case 'CHANGE_LANGUAGE':
      return {
        ...state,
        gameInfo: { ...state.gameInfo, ...{ isSpanish: action.payload } }
      }
    case 'CHOOSE_AVATAR':
      return {
        ...state,
        gameInfo: { ...state.gameInfo, ...{ avatar: action.payload } }
      }
    case 'PAUSE_GAME':
      return {
        ...state,
        gameInfo: { ...state.gameInfo, ...{ buttonText: action.payload, mainFrameText: action.mainFrameText, pausedGame: true } }
      }
    case 'FORCE_MAIN_FRAME_TEXT':
      return {
        ...state,
        gameInfo: { ...state.gameInfo, ...{ mainFrameText: action.mainFrameText } }
      }
    case 'DECREASE_COUNTDOWN':
      return {
        ...state,
        gameInfo: { ...state.gameInfo, ...{ initialCountdown: action.payload } }
      }
    case 'TURN_ON_MOVEMENT':
      return {
        ...state,
        gameInfo: { ...state.gameInfo, ...{ levelJustStarted: action.payload } }
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
        gameInfo: { ...state.gameInfo, ...{ enemiesLeft: action.payload.filter(alien => alien.type !== 'none' && 
                                                                                        alien.type !== 'bullet' &&
                                                                                        alien.type !== 'explosion').length,     // valor inicial = 79
                                            firedBullets: action.firedBullets }
                  }
      }
    case 'UPDATE_SCORE':
      return {
        ...state,
        gameInfo: { ...state.gameInfo, ...{ playerWasHit: action.payload, enemiesKilled: action.enemiesDown, 
                                            score: action.addToScore, highScore: action.highScore } 
                  }
      }
    case 'CONTINUE_CURRENT_LEVEL':
      return {
        ...state,
        gameInfo: { ...state.gameInfo, ...{ levelJustStarted: action.restartLevel, playerWasHit: action.wasHit, initialCountdown: action.countdown,
                                            score: action.score, lives: action.quitOneLife }
                  }
      }
    case 'RESET_STATE':                   // Retorno al estado inicial, excepto por el idioma y avatar seleccionados inicialmente
      return {
        ...state,
        gameInfo: { ...state.gameInfo, ...{ buttonText: action.payload, mainFrameText: '', pausedGame: true, levelJustStarted: true, 
                                            initialCountdown: 5, timeElapsed: 0, pressedKeyCode: 0, enemiesKilled: 0, enemiesLeft: 0,
                                            firedBullets: 0, playerWasHit: false, bombProbability: 45, level: 1, speed: 1, msInterval: 1000, 
                                            lives: 5, score: 0, highScore: 0 }
                  }
      }
    default:
      return state
  }
}
