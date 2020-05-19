import React, { Fragment, useState, useContext, useEffect } from 'react'
import scarecrow from '../assets/images/enemies/enemy1.gif'
import bane from '../assets/images/enemies/enemy2.gif'
import joker from '../assets/images/enemies/enemy3.gif'
import theThing from '../assets/images/enemies/boss1.gif'
import terminator from '../assets/images/enemies/boss2.gif'
import alienQueen from '../assets/images/enemies/boss3.gif'
import predator from '../assets/images/enemies/boss4.gif'
import bullet from '../assets/images/bullet2.gif'
import explosion from '../assets/images/explosion.gif'
import bomb from '../assets/images/bomb1.gif'

import { GlobalContext } from '../context/GalagaState'
import { GridMovement } from '../functions/GridMovement'

const EnemyGrid = () => {
  const { gameInfo, enemyInfo, initializeEnemyFormation, setIntervalsElapsed, updateBattleground, updateScore,
          pauseGame, turnOnMovement, decreaseCountdown } = useContext(GlobalContext)
  const [flag, setFlag] = useState(false)

  // Emular comportamiento de la lifecycle function componentDidMount(), para posicionar formación enemiga inicial
  useEffect(() => {
    initializeEnemyFormation(enemyInfo)
    setInterval(() => {
      setFlag(true)
    }, gameInfo.msInterval)
    // eslint-disable-next-line
  }, [])

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
    updateBattleground( updatedGrid[0], gameInfo.bulletShot ? 1 : 0 )       // (enemyArray, addedBullets)
    updateScore( updatedGrid[1], updatedGrid[2], updatedGrid[3] )           // (wasHit, enemiesKilled, addToScore)
  }

  // Si el jugador es destruido por un alienígena o una bomba:
  if (flag && gameInfo.playerWasHit) {
    setFlag(false)
    pauseGame('Enemy won! Press Enter to continue')
// SEGUIR AQUÍ CON LA LÓGICA DE "CONTINUE" O CAMBIO DE NIVEL, AL PRESIONAR ENTER
// deberían reiniciarse: gameInfo.levelJustStarted = true, gameInfo.initialCountdown = 5, restarse una vida, o mostrar "GAME OVER"
//  playerKilled(false)
  }

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