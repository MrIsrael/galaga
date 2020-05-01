import React, { Fragment, useContext, useEffect } from 'react'
import scarecrow from '../assets/images/enemies/enemy1.gif'
// import bane from '../assets/images/enemies/enemy2.gif'
// import joker from '../assets/images/enemies/enemy3.gif'
// import theThing from '../assets/images/enemies/boss1.gif'
// import terminator from '../assets/images/enemies/boss2.gif'
import alienQueen from '../assets/images/enemies/boss3.gif'
// import predator from '../assets/images/enemies/boss4.gif'
import bullet from '../assets/images/bullet1.gif'
// import explosion from '../assets/images/explosion.gif'
// import bomb from '../assets/images/bomb1.gif'
// import bomb from '../assets/images/bomb2.gif'

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
                                {alien.type === 'bullet' && <img src={bullet} alt='bullet' style={alienStyle} />}
                                {alien.type === 'none' && <div style={emptyAlienStyle}></div>}
                                {alien.type === 'scarecrow' && <div id={!pausedGame ? 'enemydiv' : 'enemydiv-paused'}>
                                    <img src={scarecrow} alt='alien' style={alienStyle} /></div>}
                                {alien.type === 'alienQueen' && <div id={!pausedGame ? 'enemydiv' : 'enemydiv-paused'}>
                                    <img src={alienQueen} alt='alien' style={alienStyle} /></div>}
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