import React, { createContext, useReducer } from 'react'
import GalagaReducer from '../context/GalagaReducer'

// Initial state
const initialState = {
  playerInfo: [],             // playerArray[i] = { id, playerHere (true, false) }
  enemyInfo: [],              // enemyArray[i] = { id, position, type ('joker'..., 'bullet', 'none'), remainingShots, scoreIfDestroyed }
  gameInfo: {                 // Enemy types: scarecrow, bane, joker --- theThing, terminator, alienQueen, predator --- bullet --- explosion, bomb --- none
    buttonText: 'Click here or press Tab to play',
    pausedGame: true,
    levelJustStarted: true,   // Si es true, el nivel recién comienza, o el jugador fue eliminado pero aún no ha agotado todas sus vidas
    initialCountdown: 5,
    timeElapsed: 0,
    pressedKeyCode: 0,
    enemiesKilled: 0,
    enemiesLeft: 0,
    bulletShot: false,
    firedBullets: 0,
   playerWasHit: false,
    bombProbability: 40,      // Valor entre 0 y 50: 0 = bombas siempre; 50 = ninguna bomba
   level: 1,
   speed: 1,                 // este atributo podría omitirse; con 'level' se puede calcular la velocidad
    msInterval: 1000,
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

  function startGame(text) {
    dispatch({
      type: 'START_GAME',
      payload: text
    })
  }

  function pauseGame(text) {
    dispatch({
      type: 'PAUSE_GAME',
      payload: text
    })
  }

  function decreaseCountdown(qty) {
    dispatch({
      type: 'DECREASE_COUNTDOWN',
      payload: state.gameInfo.initialCountdown - qty,
    })
    console.log(state.gameInfo.initialCountdown)
  }

  function turnOnMovement() {
    dispatch({
      type: 'TURN_ON_MOVEMENT',
      payload: false
    })
    console.log('Fight!')
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
        pauseGame('Press Tab or click here to resume')
        break
      case 13:    // Tecla Enter presionada: Pausar / Reanudar el juego
        pausedGame ? startGame('Press Enter or click outside to pause') : pauseGame('Press Enter to resume')
        break
      default: break
    }
    dispatch({
      type: 'SHOW_KEY_CODE',
      payload: event.keyCode
    })
  }

  function movePlayer(newPlayerPos) {
    dispatch({
      type: 'MOVE_PLAYER',
      payload: newPlayerPos
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
          enemyArray[i].remainingShots = 3
          enemyArray[i].scoreIfDestroyed = 300
          break
        case 'joker':
          enemyArray[i].remainingShots = 5
          enemyArray[i].scoreIfDestroyed = 500
          break
        case 'theThing':
          enemyArray[i].remainingShots = 10
          enemyArray[i].scoreIfDestroyed = 5000
          break
        case 'terminator':
          enemyArray[i].remainingShots = 15
          enemyArray[i].scoreIfDestroyed = 7500
          break
        case 'alienQueen':
          enemyArray[i].remainingShots = 5                    // Valor original = 25
          enemyArray[i].scoreIfDestroyed = 12500
          break
        case 'predator':
          enemyArray[i].remainingShots = 35
          enemyArray[i].scoreIfDestroyed = 30000
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
      firedBullets: state.gameInfo.firedBullets,
      bulletShot: false
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
      firedBullets: state.gameInfo.firedBullets,
      bulletShot: false
    })
  }

  function setBullet(enemyArray, newPosForBullet) {
    const wasHit = false
    let enemiesKilled = 0
    let scorePlus = 0
    if (enemyArray[newPosForBullet - 1].type === 'none' || enemyArray[newPosForBullet - 1].type === 'bullet' || enemyArray[newPosForBullet - 1].type === 'explosion') {
      enemyArray[newPosForBullet - 1].type = 'bullet'
      enemyArray[newPosForBullet - 1].remainingShots = 0
      enemyArray[newPosForBullet - 1].scoreIfDestroyed = 0
    } else if (enemyArray[newPosForBullet - 1].type === 'bomb' || enemyArray[newPosForBullet - 1].remainingShots === 1) {
      enemiesKilled++
      scorePlus += enemyArray[newPosForBullet - 1].scoreIfDestroyed
      enemyArray[newPosForBullet - 1].type = 'explosion'
      enemyArray[newPosForBullet - 1].remainingShots = 0
      enemyArray[newPosForBullet - 1].scoreIfDestroyed = 0
    } else if (enemyArray[newPosForBullet - 1].remainingShots > 1) {
      enemyArray[newPosForBullet - 1].remainingShots--
    }
    dispatch({
      type: 'UPDATE_ENEMY_ARRAY',
      payload: enemyArray,
      firedBullets: state.gameInfo.firedBullets,
      bulletShot: true                                 // Sólo en este caso se aumenta la cuenta de balas disparadas a mostrar
    })
    dispatch({
      type: 'UPDATE_SCORE',
      payload: wasHit,
      enemiesDown: state.gameInfo.enemiesKilled + enemiesKilled,
      addToScore: state.gameInfo.score + scorePlus,
      highScore: highScore
    })
  }

  function updateBattleground(enemyArray, addedBullets) {
    dispatch({
      type: 'UPDATE_ENEMY_ARRAY',
      payload: enemyArray,
      firedBullets: state.gameInfo.firedBullets + addedBullets,
      bulletShot: false
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
    setEnemyFormation(enemyArray, 8, 12, 'alienQueen')
    setEnemyFormation(enemyArray, ((enemyGridWidth * 10) / 2) + 1, enemyGridWidth * 10, 'none')
    setIsolatedNoEnemyPlaces(enemyArray, [20,39,40,58,38,56,57,76])
  }

  return (<GlobalContext.Provider value={{
    playerInfo: state.playerInfo,
    enemyInfo: state.enemyInfo,
    gameInfo: state.gameInfo,
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
  }}>
    { children }
  </GlobalContext.Provider>)
}