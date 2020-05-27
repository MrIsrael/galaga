import React, { Fragment, useState, useContext, useEffect } from 'react'
import scarecrow from '../assets/images/enemies/enemy1.gif'
import bane from '../assets/images/enemies/enemy2.gif'
import joker from '../assets/images/enemies/enemy3.gif'
import theThing from '../assets/images/enemies/boss1.gif'
import terminator from '../assets/images/enemies/boss2.gif'
import alienQueen from '../assets/images/enemies/boss3.gif'
import predator from '../assets/images/enemies/boss4.gif'
import bullet from '../assets/images/ammo/bullet1.gif'
import explosion from '../assets/images/ammo/explosion.gif'
import bomb from '../assets/images/ammo/bomb1.gif'

import { GlobalContext } from '../context/GalagaState'
import { GridMovement } from '../functions/GridMovement'    // Contiene toda la lógica de movimiento en el tablero enemigo

const EnemyGrid = ({ changeScreen }) => {
  const { gameInfo, enemyInfo, initializeEnemyFormation, setIntervalsElapsed, updateBattleground, updateScore,
          pauseGame, turnOnMovement, decreaseCountdown } = useContext(GlobalContext)
  // Flag que permite movimiento del juego sólo cada vez que transcurra 1 intervalo de tiempo definido por msInterval;
  // de lo contrario, habría un loop infinito de re-renders y React estallaría:
  const [flag, setFlag] = useState(false)
  let nextScreen = changeScreen

  // Emular comportamiento de la lifecycle function componentDidMount(), para posicionar formación enemiga inicial
  useEffect(() => {
    initializeEnemyFormation(enemyInfo)
    setInterval(() => {
      setFlag(true)
    }, gameInfo.msInterval)
    // eslint-disable-next-line
  }, [])

  // Si el jugador es impactado por un alienígena o una bomba, y sólo le quedaba 1 vida: GAME OVER!
  if (flag && gameInfo.lives === 0) {
    setFlag(false)
    pauseGame((gameInfo.isSpanish ? 'Perdiste!' : 'You lose!'), (gameInfo.isSpanish ? 'NAVE DESTRUÍDA!' : 'GAME OVER!'))
    nextScreen(-4)
  }
  
  // Animación temporizada de inicio de nivel o reanudación del juego después de perder una vida:
  if (flag && !gameInfo.pausedGame && gameInfo.levelJustStarted) {
    setFlag(false)
    gameInfo.initialCountdown === 0 ? turnOnMovement() : decreaseCountdown(1)
  }

  // Condición imprescindible para que haya movimiento automático de elementos en el tablero de juego:
  if (flag && !gameInfo.pausedGame && !gameInfo.levelJustStarted && !gameInfo.playerWasHit) {
    setFlag(false)
    setIntervalsElapsed(1)
    const updatedGrid = GridMovement(enemyInfo, gameInfo.timeElapsed, gameInfo.bombProbability)
    updateBattleground(updatedGrid[0])                                                            // (enemyArray)
    updateScore(updatedGrid[1], updatedGrid[2], updatedGrid[3])                                   // (wasHit, enemiesKilled, addToScore)
  }

  // Si el jugador es impactado por un alienígena o una bomba:
  if (flag && gameInfo.playerWasHit && gameInfo.lives > 0) {
    setFlag(false)
    pauseGame((gameInfo.isSpanish ? 'Nave caída! Enter para continuar' : 'Enemy won! Press Enter to continue'), (gameInfo.isSpanish ? 'NAVE IMPACTADA!' : 'PLAYER DOWN!'))
  }

  // Si todos los enemigos son eliminados y hay cambio de nivel:
// if (flag && gameInfo.xxx) {

    // Crear nuevo .js en functions, que maneje las formaciones de enemigos nuevas, con un switch, y generar nuevo nivel con un solo action / reducer
    // usar todos los enemigos: dos niveles por enemigo? 
// }

// Atts gameInfo para cambio de nivel (automáticos): enemiesLeft
// Atts gameInfo para cambio de nivel (modificables): pausedGame, levelJustStarted, playerWasHit, buttonText, mainFrameText, lives, level, speed
// Atts gameInfo para control de cambios y movimiento (modificables): msInterval, bombProbability
// Atts gameInfo para control de cambios y movimiento (automáticos): timeElapsed, initialCountdown
// Atts gameInfo solo para mostrar en StatusBar (automáticos): pressedKeyCode, firedBullets, enemiesKilled, score, highScore, isSpanish, avatar

// - Si el jugador termina un nivel (elimina a todos los enemigos), debe aparecer un mensaje (en la status bar? 
//   en el centro de la game grid, encima de todo?) que avise del cambio de nivel. Se incrementa también el contador
//   de nivel. Debería haber un puntaje extra por esto.
// - El siguiente nivel debe empezar con una formación enemiga diferente, incluyendo uno o varios bosses nuevos.
// - Cada dos o 3 niveles, debe aumentar la velocidad del juego: Los marcianos deben moverse más rápido, vertical
//   y horizontalmente. Se haría esto cambiando el valor en milisegundos del SetInterval(), en EnemyGrid.
//   Tambien la cantidad de bombas, con bombProbability.

  return (
    <Fragment>
      {enemyInfo.map(alien => <div className='enemy' key={alien.id}>
                                {/* alien.id */}
                                {alien.type === 'bullet' && <img src={bullet} alt='bullet' style={alienStyle} />}
                                {alien.type === 'none' && <div style={emptyAlienStyle}>NO ENEMY</div>}
                                {alien.type === 'explosion' && <img src={explosion} alt='explosion' style={alienStyle} />}
                                {alien.type === 'bomb' && <img src={bomb} alt='bomb' style={alienStyle} />}
                                {alien.type === 'scarecrow' && <div id={!gameInfo.pausedGame ? 'enemydiv' : 'enemydiv-paused'}>
                                                                  <img src={scarecrow} alt='alien' style={alienStyle} /></div>}
                                {alien.type === 'bane' && <div id={!gameInfo.pausedGame ? 'enemydiv' : 'enemydiv-paused'}>
                                                                  <img src={bane} alt='alien' style={alienStyle} /></div>}
                                {alien.type === 'joker' && <div id={!gameInfo.pausedGame ? 'enemydiv' : 'enemydiv-paused'}>
                                                                  <img src={joker} alt='alien' style={alienStyle} /></div>}
                                {alien.type === 'theThing' && <div id={!gameInfo.pausedGame ? 'enemydiv' : 'enemydiv-paused'}>
                                                                  <img src={theThing} alt='alien' style={alienStyle} /></div>}
                                {alien.type === 'terminator' && <div id={!gameInfo.pausedGame ? 'enemydiv' : 'enemydiv-paused'}>
                                                                  <img src={terminator} alt='alien' style={alienStyle} /></div>}
                                {alien.type === 'alienQueen' && <div id={!gameInfo.pausedGame ? 'enemydiv' : 'enemydiv-paused'}>
                                                                  <img src={alienQueen} alt='alien' style={alienStyle} /></div>}
                                {alien.type === 'predator' && <div id={!gameInfo.pausedGame ? 'enemydiv' : 'enemydiv-paused'}>
                                                                  <img src={predator} alt='alien' style={alienStyle} /></div>}
                                {alien.position}
                                {/* alien.position */}
                              </div>
                    )}
    </Fragment>
  )
}

// Estilos para la imagen del enemigo
const alienStyle = {
  maxWidth: '33px',
  minHeight: '35px',
  maxHeight: '35px',
  padding: '1px',
}

const emptyAlienStyle = {
  margin: 'auto',
  maxWidth: '33px',
  minHeight: '35px',
  maxHeight: '35px',
  paddingTop: '2px',
  backgroundColor: '#ccc',
}

export default EnemyGrid
