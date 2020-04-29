import React, { Fragment, useContext, useEffect } from 'react'
import soldier from '../assets/images/enemy1.gif'
import boss from '../assets/images/boss2.gif'
import bullet from '../assets/images/bullet1.gif'
import explosion from '../assets/images/explosion.gif'

import { GlobalContext } from '../context/GalagaState'

const EnemyGrid = () => {
  const { pausedGame, enemyInfo, initializeEnemyFormation } = useContext(GlobalContext)

  // Emular comportamiento de la lifecycle function componentDidMount(), para posicionar formación enemiga inicial
  useEffect(() => {
    initializeEnemyFormation(enemyInfo)
    // eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      {enemyInfo.map(alien => <div className='enemy' key={alien.id}>
                                {!alien.enemyHere && alien.type === 'bullet' && <img src={bullet} alt='alien-ship' style={alienStyle} />}
                                {!alien.enemyHere && alien.type === '' && <div style={emptyAlienStyle}></div>}
                                {alien.enemyHere && alien.type === 'soldier' && <div id={!pausedGame ? 'enemydiv' : 'enemydiv-paused'}>
                                    <img src={soldier} alt='alien-ship' style={alienStyle} /></div>}
                                {alien.enemyHere && alien.type === 'boss' && <div id={!pausedGame ? 'enemydiv' : 'enemydiv-paused'}>
                                    <img src={boss} alt='alien-boss' style={alienStyle} /></div>}
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