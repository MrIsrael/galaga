import React, { Fragment, useContext, useEffect } from 'react'
import soldier from '../assets/images/enemy.png'
import boss from '../assets/images/boss.jpeg'

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
                                {!alien.enemyHere && <div style={emptyAlienStyle}></div>}
                                {alien.enemyHere && alien.type === 'soldier' && <div id={!pausedGame ? 'enemydiv' : 'enemydiv-paused'}>
                                    <img src={soldier} alt='alien-ship' style={alienStyle} /></div>}
                                {alien.enemyHere && alien.type === 'boss' && <div id={!pausedGame ? 'enemydiv' : 'enemydiv-paused'}>
                                    <img src={boss} alt='alien-ship' style={alienStyle} /></div>}
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