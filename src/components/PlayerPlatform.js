import React, { Fragment, useContext, useEffect } from 'react'
import ship from '../assets/images/spaceShip.png'

import { GlobalContext } from '../context/GalagaState'

const PlayerPlatform = () => {
  const { playerPos, initializePlayerPos } = useContext(GlobalContext)

  // Emular comportamiento de la lifecycle function componentDidMount(), para posicionar nave del jugador
  useEffect(() => {
    initializePlayerPos(playerPos)
    // eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      {playerPos.map(pos => <div className='player' key={Math.floor(Math.random() * 100000000 )}>
                              {pos === 1 ? <img src={ship} alt='space-ship' style={spaceShipStyle} /> : <i></i>}
                              <br />
                              {pos}
                            </div>
                    )}
    </Fragment>
  )
}

// Estilos para la imagen de la nave del jugador
const spaceShipStyle = {
  // maxHeight: '30px',
  maxWidth: '33px',
  height: '30px',
  backgroundColor: 'transparent',   // REVISAR CÓMO SE PONE FONDO TRANSPARENTE A UNA IMAGEN PNG...
  paddingTop: '8px',
}

export default PlayerPlatform