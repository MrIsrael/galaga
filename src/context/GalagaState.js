import React, { createContext, useReducer } from 'react'
import GalagaReducer from '../context/GalagaReducer'

// Initial state
const initialState = {
pausedGame: true,
playerInfo: [],                           // playerArray[i] = { id, playerHere (true, false) }
enemyInfo: [],                            // enemyArray[i] = { id, enemyHere, position, type ('soldier', 'boss'...), remainingShots }
resumeButtonText: 'Click here or press Tab to play',
pressedKeyCode: 0,
  killed: 0,
enemiesLeft: 190,
firedBullets: 0,
  level: 1,
  speed: 1,
  lives: 5,
}

// Create Context
export const GlobalContext = createContext(initialState)

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GalagaReducer, initialState);

  // Actions
  function startGame(text) {
    dispatch({
      type: 'START_GAME',
      payload: text,
    })
  }

  function pauseGame(text) {
    dispatch({
      type: 'PAUSE_GAME',
      payload: text,
    })
  }

  // Códigos de teclas: Barra espaciadora: 32, Flecha izquierda: 37, Flecha derecha: 39, ESC: 27, Enter: 13, Tab: 9
  function keyCode(event, firedBullets, playerArray, pausedGame) {
    switch (event.keyCode) {
      case 32:    // Disparar cañón
        if(!pausedGame){
          fire(firedBullets + 1)
        }
        break
      case 37:    // Mover jugador a la izquierda
        if(!pausedGame){
          const dummy1 = playerArray.findIndex(pos => pos.playerHere)
          if (dummy1 !== 0) {
            playerArray[dummy1].playerHere = false
            playerArray[dummy1 - 1].playerHere = true
            movePlayer(playerArray)
          }
        }
        break
      case 39:    // Mover jugador a la derecha
        if(!pausedGame){
          const dummy2 = playerArray.findIndex(pos => pos.playerHere)
          if (dummy2 !== 18) {
            playerArray[dummy2].playerHere = false
            playerArray[dummy2 + 1].playerHere = true
            movePlayer(playerArray)
          }
        }
        break
      case 9:     // Tecla Tab presionada: Pausar el juego
        pauseGame('Press Tab or click here to resume')
        break
      case 13:    // Tecla Enter presionada: Pausar / Reanudar el juego
        pausedGame ? startGame('Press Enter or click outside to pause') : pauseGame('Press Enter to resume')
        break
      default: break
    }
    dispatch({
      type: 'SHOW_KEY_CODE',
      payload: event.keyCode,
    })
  }

  function fire(newFiredBulletsCount) {
    dispatch({
      type: 'FIRE_BUTTON_PRESSED',
      payload: newFiredBulletsCount,
    })
  }

  function movePlayer(newPlayerPos) {
    dispatch({
      type: 'MOVE_PLAYER',
      payload: newPlayerPos,
    })
  }

  function initializePlayerPos(playerArray) {
    for (let i=0; i<19; i++) {
      i === 9 ? playerArray[i] = { id: i, playerHere: true } 
              : playerArray[i] = { id: i, playerHere: false }
    }
    dispatch({
      type: 'INITIALIZE_PLAYER_ARRAY',
      payload: playerArray,
    })
  }

  function initializeEnemyFormation(enemyArray) {
    for (let i=0; i < state.enemiesLeft; i++) {
      enemyArray[i] = {
        id: i,
        enemyHere: i < (state.enemiesLeft / 2) ? true : false,
        position: i+1,
        type: i < (state.enemiesLeft / 2) ? 'soldier' : '',
        remainingShots: i < (state.enemiesLeft / 2) ? 1 : 0,
      }
    }
    updateEnemyFormation(enemyArray, [20,39,40,58,38,56,57,76])
    dispatch({
      type: 'UPDATE_ENEMY_ARRAY',
      payload: enemyArray,
      size: enemyArray.filter(alien => alien.enemyHere).length,
    })
  }

  function updateEnemyFormation(enemyArray, noAlienPosArray) {
    for (let i=0; i<190; i++) {
      if (noAlienPosArray.some(pos => pos === enemyArray[i].position)) { 
        enemyArray[i].enemyHere = false
        enemyArray[i].type = ''
        enemyArray[i].remainingShots = 0
      }
    }
    dispatch({
      type: 'UPDATE_ENEMY_ARRAY',
      payload: enemyArray,
      size: enemyArray.filter(alien => alien.enemyHere).length,
    })
  }

  return (<GlobalContext.Provider value={{
    pausedGame: state.pausedGame,
    playerInfo: state.playerInfo,
    enemyInfo: state.enemyInfo,
    killed: state.killed,
    resumeButtonText: state.resumeButtonText,
    pressedKeyCode: state.pressedKeyCode,
    enemiesLeft: state.enemiesLeft,
    firedBullets: state.firedBullets,
    level: state.level,
    speed: state.speed,
    lives: state.lives,
    startGame,
    pauseGame,
    keyCode,
    initializePlayerPos,
    initializeEnemyFormation,
    updateEnemyFormation,
    fire,
    movePlayer,
  }}>
    { children }
  </GlobalContext.Provider>)
}