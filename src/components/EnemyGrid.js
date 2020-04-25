import React, { Fragment, useContext, useEffect } from 'react'
import soldier from '../assets/images/enemy.png'
import boss from '../assets/images/boss.jpeg'

import { GlobalContext } from '../context/GalagaState'

const EnemyGrid = () => {
  const { enemyInfo, initializeEnemyFormation } = useContext(GlobalContext)

  // Emular comportamiento de la lifecycle function componentDidMount(), para posicionar formación enemiga inicial
  useEffect(() => {
    initializeEnemyFormation(enemyInfo)
    // eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      {enemyInfo.map(alien => <div className='enemy' key={alien.id}>
                                {!alien.enemyHere && <div style={emptyAlienStyle}></div>}
                                {alien.enemyHere && alien.type === 'soldier' && <img src={soldier} alt='alien-ship' style={alienStyle} />}
                                {alien.enemyHere && alien.type === 'boss' && <img src={boss} alt='alien-ship' style={alienStyle} />}
                                {alien.position}
                              </div>
                    )}
    </Fragment>
  )
}

// Estilos para la imagen del enemigo
const alienStyle = {
  maxWidth: '33px',
  minHeight: '35px',
  paddingTop: '2px',
}

const emptyAlienStyle = {
  maxWidth: '33px',
  minHeight: '35px',
  paddingTop: '2px',
  backgroundColor: '#ccc',
}

export default EnemyGrid