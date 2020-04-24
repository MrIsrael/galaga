import React, { createContext, useReducer } from 'react'
import GalagaReducer from '../context/GalagaReducer'

// Initial state
const initialState = {
  playerPos: [],
  killed: 0,
  resumeButtonText: 'Click here to play',
  pressedKeyCode: 0,
}

// Create Context
export const GlobalContext = createContext(initialState)

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GalagaReducer, initialState);

  // Actions
  function startGame() {
    dispatch({
      type: 'START_GAME',
      payload: 'Click anywhere to pause',
    })
  }

  function pauseGame() {
    dispatch({
      type: 'PAUSE_GAME',
      payload: 'Click here to resume',
    })
  }

  // Códigos de teclas: Barra espaciadora: 32, Flecha izquierda: 37, Flecha derecha: 39
  function keyCode(event, killed, playerPos) {
    switch (event.keyCode) {
      case 32:
        fire(killed + 1)
        break
      case 37:
        let dummy1 = playerPos
        const dummy2 = dummy1.findIndex((value) => value === 1)
        if (dummy2 !== 0) {
          dummy1[dummy2] = 0
          dummy1[dummy2 - 1] = 1
          movePlayer(dummy1)
        }
        break
      case 39:
        let dummy3 = playerPos
        const dummy4 = dummy3.findIndex((value) => value === 1)
        if (dummy4 !== 18) {
          dummy3[dummy4] = 0
          dummy3[dummy4 + 1] = 1
          movePlayer(dummy3)
        }
        break
      default: break
    }
    dispatch({
      type: 'SHOW_KEY_CODE',
      payload: event.keyCode,
    })
  }

  function fire(newKilledCount) {
    dispatch({
      type: 'FIRE_BUTTON_PRESSED',
      payload: newKilledCount,
    })
  }

  function movePlayer(newPlayerPos) {
//    console.log(newPlayerPos)
    dispatch({
      type: 'MOVE_PLAYER',
      payload: newPlayerPos,
    })
  }

  function initializePlayerPos(playerArray) {
    for (let i=0; i<19; i++) {
      i === 9 ? playerArray[i] = 1 : playerArray[i] = 0
    }
    dispatch({
      type: 'INITIALIZE_PLAYER_ARRAY',
      payload: playerArray,
    })
  }

  return (<GlobalContext.Provider value={{
    playerPos: state.playerPos,
    killed: state.killed,
    resumeButtonText: state.resumeButtonText,
    pressedKeyCode: state.pressedKeyCode,
    startGame,
    pauseGame,
    keyCode,
    initializePlayerPos,
    fire,
    movePlayer,
  }}>
    { children }
  </GlobalContext.Provider>)
}