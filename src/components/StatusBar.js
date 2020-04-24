import React, { Fragment, useContext } from 'react'
import logo from '../assets/images/logo.png'

import { GlobalContext } from '../context/GalagaState'

// Si aquí se engloba todo el JSX en un tag diferente de <Fragment> (p.ej. <div>), el css grid se daña!
const StatusBar = () => {
  const { playerPos, killed, resumeButtonText, pressedKeyCode, startGame, pauseGame, keyCode } = useContext(GlobalContext)

  return (
    <Fragment>
      <div className='status-bar-left'>
        <h3>Level: 0</h3>
        <h3>Speed: x1</h3>
      </div>
      <div className='status-bar-middle'>
        <img src={logo} alt='game-logo' style={logoStyle}/>
        <br />
        <input type='text' readOnly size='23' value={resumeButtonText} style={buttonStyle} 
              onKeyDown={(event) => keyCode(event, killed, playerPos)}
              onFocus={() => startGame()}
              onBlur={() => pauseGame()}
        />
      </div>
      <div className='status-bar-right'>
        <h3>Enemies killed: {killed}</h3>
        <h3>Lives: {pressedKeyCode}</h3>
      </div>
    </Fragment>
  )
}

// Estilos para la imagen del logo del juego
const logoStyle = {
  maxHeight: '80px',
  backgroundColor: 'transparent',   // REVISAR CÓMO SE PONE FONDO TRANSPARENTE A UNA IMAGEN PNG...
  padding: '0px',
}

// Estilos para el textfield de incio / pausa del juego
const buttonStyle = {
  fontSize: '12px',
  textAlign: 'center',
  color: 'white',
  backgroundColor: 'purple',
}

export default StatusBar
