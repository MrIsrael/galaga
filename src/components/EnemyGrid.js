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
  const { gameInfo, enemyInfo, initializeEnemyFormation, setIntervalsElapsed, updateBattleground, updateScore } = useContext(GlobalContext)
  const [flag, setFlag] = useState(false)

  // Emular comportamiento de la lifecycle function componentDidMount(), para posicionar formación enemiga inicial
  useEffect(() => {
    initializeEnemyFormation(enemyInfo)
    if (gameInfo.enemyGridAction) {
      let intervals = gameInfo.timeElapsed
      setInterval(() => {
        intervals++
        setIntervalsElapsed(intervals)
        setFlag(true)
      }, gameInfo.msInterval)
    }
    // eslint-disable-next-line
  }, [])

  if (flag && !gameInfo.pausedGame) {     // Condición imprescindible para que haya movimiento automático de elementos en el tablero de juego
    setFlag(false)

    switch (gameInfo.level) {
      case 1:
        const updatedGrid = GridMovement(enemyInfo, gameInfo.timeElapsed)
        updateBattleground( updatedGrid[0], gameInfo.bulletShot ? 1 : 0 )       // (enemyArray, addedBullets)
        updateScore( updatedGrid[1], updatedGrid[2], updatedGrid[3] )           // (wasHit, enemiesKilled, addToScore)
        break
      default: break
    }
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
  padding: '1px',
}

const emptyAlienStyle = {
  margin: 'auto',
  maxWidth: '33px',
  minHeight: '35px',
  paddingTop: '2px',
  backgroundColor: '#ccc',
}

export default EnemyGrid