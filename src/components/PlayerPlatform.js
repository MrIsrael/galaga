import React, { Fragment, useContext, useEffect } from 'react'
import spaceShip from '../assets/images/avatars/spaceShip.gif'
import falcon from '../assets/images/avatars/millenium-falcon.gif'
import ufo from '../assets/images/avatars/ufo.gif'
import skull from '../assets/images/avatars/skull.gif'

import { GlobalContext } from '../context/GalagaState'

const PlayerPlatform = () => {
  const { playerInfo, gameInfo, initializePlayerPos } = useContext(GlobalContext)

  // Emular comportamiento de la lifecycle function componentDidMount(), para posicionar nave del jugador
  useEffect(() => {
    initializePlayerPos(playerInfo)
    // eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      {playerInfo.map(pos => <div className='player' key={pos.id}>
                              {pos.playerHere && !gameInfo.playerWasHit && gameInfo.avatar === 1 ? <img src={spaceShip} alt='spaceship' style={spaceShipStyle} /> : <i></i>}
                              {pos.playerHere && !gameInfo.playerWasHit && gameInfo.avatar === 2 ? <img src={falcon} alt='falcon' style={spaceShipStyle} /> : <i></i>}
                              {pos.playerHere && !gameInfo.playerWasHit && gameInfo.avatar === 3 ? <img src={ufo} alt='ufo' style={spaceShipStyle} /> : <i></i>}
                              {pos.playerHere && gameInfo.playerWasHit ? <img src={skull} alt='space-ship-down' style={spaceShipStyle} /> : <i></i>}
                             </div>
                     )}
    </Fragment>
  )
}

// Estilos para la imagen de la nave del jugador
const spaceShipStyle = {
  maxWidth: '33px',
  height: '35px',
  padding: '0px',
}

export default PlayerPlatform
