import React, { Fragment, useContext } from 'react'
import logo from '../assets/images/logo.gif'

import { GlobalContext } from '../context/GalagaState'

// Si aquí se engloba todo el JSX en un tag diferente de <Fragment> (p.ej. <div>), el css grid se daña!
const StatusBar = () => {
  const { pausedGame, playerInfo, killed, resumeButtonText, pressedKeyCode, startGame, pauseGame, keyCode,
          enemiesLeft, firedBullets, level, speed, lives } = useContext(GlobalContext)

  return (
    <Fragment>
      <div className='status-bar-left'>
        <h4>Level: {level}</h4>
        <h4>Speed: x{speed}</h4>
        <h4>Player cell: {playerInfo.findIndex(pos => pos.playerHere) + 1}</h4>
        <h4>Pressed key: {pressedKeyCode}</h4>
      </div>
      <div className='status-bar-middle'>
        {pausedGame && <div style={messageStyle}><p style={textStyle}>GAME PAUSED</p></div>}
        {!pausedGame && <img src={logo} alt='game-logo' style={logoStyle}/>}
        <br />
        <input type='text' readOnly size='35' value={resumeButtonText} style={buttonStyle} 
              onKeyDown={(event) => keyCode(event, firedBullets, playerInfo, pausedGame)}
              onFocus={() => startGame('Press Enter or click outside to pause')}
              onBlur={() => pauseGame('Press Tab or click here to resume')}
        />
      </div>
      <div className='status-bar-right'>
        <h4>Enemies killed: {killed}</h4>
        <h4>Enemies left: {enemiesLeft}</h4>
        <h4>Bullets fired: {firedBullets}</h4>
        <h4>Lives: {lives}</h4>
      </div>
    </Fragment>
  )
}

// Estilos para la imagen del logo del juego
const logoStyle = {
  maxHeight: '100px',
  backgroundColor: 'transparent',   // REVISAR CÓMO SE PONE FONDO TRANSPARENTE A UNA IMAGEN PNG...
  padding: '0px',
}

// Estilos para el textfield de sucesos del juego (pausado, cambio de nivel, etc)
const messageStyle = {
  margin: 'auto',
  height: '75px',
  border: '3px dotted',
  maxWidth: '170px',
  padding: '5px',
}

const textStyle = {
  paddingTop: '10px',
}

// Estilos para el textfield ("botón") de inicio / pausa del juego
const buttonStyle = {
  fontSize: '12px',
  textAlign: 'center',
  color: 'white',
  backgroundColor: 'purple',
  marginTop: '3px',
  padding: '10px',
}

export default StatusBar
