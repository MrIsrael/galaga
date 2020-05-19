import React, { Fragment, useContext } from 'react'
import logo from '../assets/images/logo.gif'

import { GlobalContext } from '../context/GalagaState'

// Si aquí se engloba todo el JSX en un tag diferente de <Fragment> (p.ej. <div>), el css grid se daña!
const StatusBar = () => {
  const { gameInfo, playerInfo, startGame, pauseGame, keyCode } = useContext(GlobalContext)

  return (
    <Fragment>
      <div className='status-bar-left'>
        <h4>Level: {gameInfo.level}</h4>
        <h4>Elapsed intervals: {gameInfo.timeElapsed}</h4>
        {/* <h4>Speed: x{gameInfo.speed}</h4> */}
        <h4>High score: {gameInfo.highScore}</h4>
        <h4>Score: {gameInfo.score}</h4>
        <h4>Pressed key: {gameInfo.pressedKeyCode}</h4>
      </div>
      <div className='status-bar-middle'>
        {gameInfo.pausedGame && gameInfo.levelJustStarted && gameInfo.initialCountdown === 5
          && <div style={messageStyle}><p style={textStyle}>READY?</p></div>}
        {!gameInfo.pausedGame && gameInfo.levelJustStarted && (gameInfo.initialCountdown === 5 || gameInfo.initialCountdown === 4)
          && <div style={messageStyle}><p style={textStyle}>READY?</p></div>}
        {!gameInfo.pausedGame && gameInfo.levelJustStarted && gameInfo.initialCountdown === 3 && <div style={messageStyle}><p style={textStyle}>3...</p></div>}
        {!gameInfo.pausedGame && gameInfo.levelJustStarted && gameInfo.initialCountdown === 2 && <div style={messageStyle}><p style={textStyle}>2...</p></div>}
        {!gameInfo.pausedGame && gameInfo.levelJustStarted && gameInfo.initialCountdown === 1 && <div style={messageStyle}><p style={textStyle}>1...</p></div>}
        {!gameInfo.pausedGame && gameInfo.levelJustStarted && gameInfo.initialCountdown === 0 && <div style={messageStyle}><p style={textStyle}>FIGHT!</p></div>}
        {!gameInfo.pausedGame && !gameInfo.levelJustStarted && !gameInfo.playerWasHit && <img src={logo} alt='game-logo' style={logoStyle}/>}
        {gameInfo.pausedGame && !gameInfo.levelJustStarted && !gameInfo.playerWasHit && <div style={messageStyle}><p style={textStyle}>GAME PAUSED</p></div>}
        {!gameInfo.levelJustStarted && gameInfo.playerWasHit && <div style={messageStyle}><p style={textStyle}>PLAYER DOWN!</p></div>}
        <br />
        <input type='text' readOnly size='35' value={gameInfo.buttonText} style={buttonStyle} 
              onKeyDown={(event) => keyCode(event, playerInfo, gameInfo.pausedGame)}
              onFocus={() => startGame('Press Enter or click outside to pause')}
              onBlur={() => pauseGame('Press Tab or click here to resume')}
        />
      </div>
      <div className='status-bar-right'>
        <h4>Enemies killed: {gameInfo.enemiesKilled}</h4>
        <h4>Enemies left: {gameInfo.enemiesLeft}</h4>
        <h4>Bullets fired: {gameInfo.firedBullets}</h4>
        <h4>Lives: {gameInfo.lives}</h4>
        <h4>Player cell: {playerInfo.findIndex(pos => pos.playerHere) + 1}</h4>
      </div>
    </Fragment>
  )
}

// Estilos para la imagen del logo del juego
const logoStyle = {
  maxHeight: '102px',
  padding: '0px',
  paddingTop: '15px',         // Modificar esta propiedad si se cambia el número de datos a mostrar en la Status Bar
}

// Estilos para el textfield de sucesos del juego (pausado, cambio de nivel, etc)
const messageStyle = {
  margin: 'auto',
  marginTop: '15px',          // Modificar esta propiedad si se cambia el número de datos a mostrar en la Status Bar
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