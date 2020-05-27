import React, { createContext, useReducer } from 'react'
import GalagaReducer from '../context/GalagaReducer'

// Initial state
const initialState = {
  playerInfo: [],             // playerArray[i] = { id, playerHere (true, false) }
  enemyInfo: [],              // enemyArray[i] = { id, position, type ('joker'..., 'bullet', 'none'), remainingShots, scoreIfDestroyed }
                              // Enemy types: scarecrow, bane, joker --- theThing, terminator, alienQueen, predator --- bullet --- explosion, bomb --- none
  gameInfo: {
    buttonText: 'Click here to play',
    mainFrameText: '',
    isSpanish: false,
    avatar: 1,
    pausedGame: true,
    levelJustStarted: true,   // Si es true, el nivel recién comienza, o el jugador fue eliminado pero aún no ha agotado todas sus vidas
    initialCountdown: 5,
    timeElapsed: 0,
    pressedKeyCode: 0,
    enemiesKilled: 0,
    enemiesLeft: 0,
    firedBullets: 0,
    playerWasHit: false,
    bombProbability: 10,      // Valor entre 0 y 50: 0 = bombas siempre; 50 = ninguna bomba
    level: 1,
    speed: 1,                 // este atributo podría omitirse; con 'level' se puede calcular la velocidad
    msInterval: 200,
    lives: 5,
    score: 0,
    highScore: 0,
  }
}

// Create Context
export const GlobalContext = createContext(initialState)

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GalagaReducer, initialState)
  const enemyGridWidth = 19
  let highScore = state.gameInfo.score > state.gameInfo.highScore ? state.gameInfo.score : state.gameInfo.highScore

  // Actions
  function setIntervalsElapsed(qty) {
    dispatch({
      type: 'INCREMENT_TIME_ELAPSED',
      payload: state.gameInfo.timeElapsed + qty
    })
  }

  function toggleLanguage(lang) {
    dispatch({
      type: 'CHANGE_LANGUAGE',
      payload: lang
    })
  }

  function chooseAvatar(avatar) {
    dispatch({
      type: 'CHOOSE_AVATAR',
      payload: avatar
    })
  }

  function startGame(text) {
    dispatch({
      type: 'START_GAME',
      payload: text,
      mainFrameText: ''
    })
  }

  function pauseGame(text, text2) {
    dispatch({
      type: 'PAUSE_GAME',
      payload: text,
      mainFrameText: text2
    })
  }

  function decreaseCountdown(qty) {
    state.gameInfo.initialCountdown === 1 ? forceMainFrameText(state.gameInfo.isSpanish ? 'A LUCHAR!' : 'FIGHT!') 
                                          : forceMainFrameText((state.gameInfo.initialCountdown - 1).toString() + '...')
    dispatch({
      type: 'DECREASE_COUNTDOWN',
      payload: state.gameInfo.initialCountdown - qty,
    })
  }

  function turnOnMovement() {
    forceMainFrameText('')
    dispatch({
      type: 'TURN_ON_MOVEMENT',
      payload: false
    })
  }

  function forceMainFrameText(text) {
    dispatch({
      type: 'FORCE_MAIN_FRAME_TEXT',
      mainFrameText: text
    })
  }

  // Códigos de teclas: Barra espaciadora: 32, Flecha izquierda: 37, Flecha derecha: 39, ESC: 27, Enter: 13, Tab: 9
  function keyCode(event, playerArray, pausedGame) {
    switch (event.keyCode) {
      case 32:    // Disparar cañón
        if(!pausedGame && !state.gameInfo.levelJustStarted && !state.gameInfo.playerWasHit){
          setBullet(state.enemyInfo, playerArray.findIndex(pos => pos.playerHere) + 171 + 1)
        }
        break
      case 37:    // Mover jugador a la izquierda
        if(!pausedGame && !state.gameInfo.levelJustStarted && !state.gameInfo.playerWasHit){
          const dummy1 = playerArray.findIndex(pos => pos.playerHere)
          if (dummy1 !== 0) {
            playerArray[dummy1].playerHere = false
            playerArray[dummy1 - 1].playerHere = true
            movePlayer(playerArray)
          }
        }
        break
      case 39:    // Mover jugador a la derecha
        if(!pausedGame && !state.gameInfo.levelJustStarted && !state.gameInfo.playerWasHit){
          const dummy2 = playerArray.findIndex(pos => pos.playerHere)
          if (dummy2 !== (enemyGridWidth - 1)) {
            playerArray[dummy2].playerHere = false
            playerArray[dummy2 + 1].playerHere = true
            movePlayer(playerArray)
          }
        }
        break
      case 9:     // Tecla Tab presionada: Pausar / Reanudar el juego
        pauseGame((state.gameInfo.isSpanish ? 'Clic aquí para continuar' : 'Click here to resume'), (state.gameInfo.isSpanish ? 'EN PAUSA' : 'GAME PAUSED'))
        break
      case 13:    // Tecla Enter presionada: Pausar / Reanudar el juego
        if (pausedGame && !state.gameInfo.playerWasHit) { 
          startGame(state.gameInfo.isSpanish ? 'Pause con Enter o clic afuera' : 'Press Enter or click outside to pause') 
        }
        if (!pausedGame && !state.gameInfo.playerWasHit) { 
          pauseGame((state.gameInfo.isSpanish ? 'Presione Enter para continuar' : 'Press Enter to resume'), (state.gameInfo.isSpanish ? 'EN PAUSA' : 'GAME PAUSED')) 
        }
        if (pausedGame && state.gameInfo.playerWasHit) {
          // Borrar las balas, explosiones y bombas que hayan, dejar solo enemigos, antes de continuar el nivel actual al presionar Enter:
          setIsolatedNoEnemyPlaces(state.enemyInfo, state.enemyInfo.filter(alien => alien.type === 'bullet').map(bullet => bullet.position))
          setIsolatedNoEnemyPlaces(state.enemyInfo, state.enemyInfo.filter(alien => alien.type === 'bomb').map(bomb => bomb.position))
          setIsolatedNoEnemyPlaces(state.enemyInfo, state.enemyInfo.filter(alien => alien.type === 'explosion').map(explosion => explosion.position))
          // Resetear atributos de gameInfo: levelJustStarted = true, playerWasHit = false, initialCountdown = 5, score = 0, lives--
          continueCurrentLevel(true, false, 5, 0, -1)
          startGame(state.gameInfo.isSpanish ? 'Pause con Enter o clic afuera' : 'Press Enter or click outside to pause')
          forceMainFrameText(state.gameInfo.isSpanish ? 'LISTO?' : 'READY?')
        }
        break
      default: break
    }
    dispatch({
      type: 'SHOW_KEY_CODE',
      payload: event.keyCode
    })
  }

  function continueCurrentLevel(levelJustStarted, playerWasHit, initialCountdown, score, lives) {
    dispatch({
      type: 'CONTINUE_CURRENT_LEVEL',
      restartLevel: levelJustStarted,
      wasHit: playerWasHit,
      countdown: initialCountdown,
      score: score,
      quitOneLife: state.gameInfo.lives + lives
    })
  }

  function movePlayer(newPlayerPos) {
    dispatch({
      type: 'MOVE_PLAYER',
      payload: newPlayerPos
    })
  }

  function resetState(text) {
    dispatch({
      type: 'RESET_STATE',
      payload: text
    })
  }

  // playerArray[i] = { id, playerHere (true, false) }
  function initializePlayerPos(playerArray) {
    for (let i=0; i < enemyGridWidth; i++) {
      i === ((enemyGridWidth - 1) / 2) ? playerArray[i] = { id: i, playerHere: true } 
                                       : playerArray[i] = { id: i, playerHere: false }
    }
    movePlayer(playerArray)
  }
  
  function setEnemyFormation(enemyArray, initialPos, finalPos, enemyTypeToInsert) {
    for (let i = initialPos - 1; i < finalPos; i++) {
      enemyArray[i] = {
        id: i,
        position: i+1,
        type: enemyTypeToInsert,
      }
      switch (enemyTypeToInsert) {     
        case 'scarecrow':
          enemyArray[i].remainingShots = 1
          enemyArray[i].scoreIfDestroyed = 100
          break
        case 'bane':
          enemyArray[i].remainingShots = 2
          enemyArray[i].scoreIfDestroyed = 200
          break
        case 'joker':
          enemyArray[i].remainingShots = 3
          enemyArray[i].scoreIfDestroyed = 300
          break
        case 'theThing':
          enemyArray[i].remainingShots = 5
          enemyArray[i].scoreIfDestroyed = 1500
          break
        case 'terminator':
          enemyArray[i].remainingShots = 8
          enemyArray[i].scoreIfDestroyed = 3000
          break
        case 'alienQueen':
          enemyArray[i].remainingShots = 10
          enemyArray[i].scoreIfDestroyed = 5500
          break
        case 'predator':
          enemyArray[i].remainingShots = 15
          enemyArray[i].scoreIfDestroyed = 13000
          break
        case 'bomb':
          enemyArray[i].remainingShots = 1
          enemyArray[i].scoreIfDestroyed = 250
          break
        case 'none':
        case 'bullet':
        case 'explosion':
          enemyArray[i].remainingShots = 0
          enemyArray[i].scoreIfDestroyed = 0
          break
        default: break
      }
    }
    dispatch({
      type: 'UPDATE_ENEMY_ARRAY',
      payload: enemyArray,
      firedBullets: state.gameInfo.firedBullets
    })
  }

  function setIsolatedNoEnemyPlaces(enemyArray, noAlienPosArray) {
    for (let i=0; i < enemyGridWidth * 10; i++) {
      if (noAlienPosArray.some(pos => pos === enemyArray[i].position)) { 
        enemyArray[i].type = 'none'
        enemyArray[i].remainingShots = 0
        enemyArray[i].scoreIfDestroyed = 0
      }
    }
    dispatch({
      type: 'UPDATE_ENEMY_ARRAY',
      payload: enemyArray,
      firedBullets: state.gameInfo.firedBullets
    })
  }

  function setBullet(enemyArray, newPosForBullet) {
    if (enemyArray[newPosForBullet - 1].type !== 'bullet' && enemyArray[newPosForBullet - 1].type !== 'explosion') {
      const wasHit = false
      let enemiesKilled = 0
      let scorePlus = 0
      let addedBullets = 0
      if (enemyArray[newPosForBullet - 1].type === 'none') {
        addedBullets++
        enemyArray[newPosForBullet - 1].type = 'bullet'
        enemyArray[newPosForBullet - 1].remainingShots = 0
        enemyArray[newPosForBullet - 1].scoreIfDestroyed = 0
      } else if (enemyArray[newPosForBullet - 1].type === 'bomb' || enemyArray[newPosForBullet - 1].remainingShots === 1) {
        enemiesKilled++
        addedBullets++
        scorePlus += enemyArray[newPosForBullet - 1].scoreIfDestroyed
        enemyArray[newPosForBullet - 1].type = 'explosion'
        enemyArray[newPosForBullet - 1].remainingShots = 0
        enemyArray[newPosForBullet - 1].scoreIfDestroyed = 0
      } else if (enemyArray[newPosForBullet - 1].remainingShots > 1) {
        addedBullets++
        enemyArray[newPosForBullet - 1].remainingShots--
      }
      dispatch({
        type: 'UPDATE_ENEMY_ARRAY',
        payload: enemyArray,
        firedBullets: state.gameInfo.firedBullets + addedBullets
      })
      dispatch({
        type: 'UPDATE_SCORE',
        payload: wasHit,
        enemiesDown: state.gameInfo.enemiesKilled + enemiesKilled,
        addToScore: state.gameInfo.score + scorePlus,
        highScore: highScore
      })
    }
  }

  function updateBattleground(enemyArray) {
    dispatch({
      type: 'UPDATE_ENEMY_ARRAY',
      payload: enemyArray,
      firedBullets: state.gameInfo.firedBullets
    })
  }

  function updateScore(wasHit, enemiesKilled, addToScore) {
    dispatch({
      type: 'UPDATE_SCORE',
      payload: wasHit,
      enemiesDown: state.gameInfo.enemiesKilled + enemiesKilled,
      addToScore: state.gameInfo.score + addToScore,
      highScore: highScore
    })
  }

  // enemyArray[i] = { id, position, type ('joker'..., 'bullet', 'none'), remainingShots, scoreIfDestroyed }
  // Enemy types: scarecrow, bane, joker --- theThing, terminator, alienQueen, predator --- bullet --- explosion, bomb --- none
  function initializeEnemyFormation(enemyArray) {
    setEnemyFormation(enemyArray, 1, ((enemyGridWidth * 10) / 2), 'scarecrow')
    setEnemyFormation(enemyArray, 9, 11, 'theThing')
    setEnemyFormation(enemyArray, ((enemyGridWidth * 10) / 2) + 1, enemyGridWidth * 10, 'none')
    setIsolatedNoEnemyPlaces(enemyArray, [20,39,40,58,38,56,57,76,59,60,77,78,74,75,94,95])
  }

  return (<GlobalContext.Provider value={{
    playerInfo: state.playerInfo,
    enemyInfo: state.enemyInfo,
    gameInfo: state.gameInfo,
    toggleLanguage,
    chooseAvatar,
    startGame,
    pauseGame,
    turnOnMovement,
    decreaseCountdown,
    setIntervalsElapsed,
    keyCode,
    initializePlayerPos,
    initializeEnemyFormation,
    updateBattleground,
    updateScore,
    resetState,
  }}>
    { children }
  </GlobalContext.Provider>)
}
