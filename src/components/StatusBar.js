import React, { Fragment, useContext } from 'react'
import logo from '../assets/images/misc/logo.gif'

import { GlobalContext } from '../context/GalagaState'

// Si aquí se engloba todo el JSX en un tag diferente de <Fragment> (p.ej. <div>), el css grid se daña!
const StatusBar = () => {
  const { gameInfo, playerInfo, startGame, pauseGame, keyCode } = useContext(GlobalContext)

  return (
    <Fragment>
      <div className='status-bar-left'>
        <h4>{gameInfo.isSpanish ? 'Nivel: ' : 'Level: '} {gameInfo.level}</h4>
        <h4>{gameInfo.isSpanish ? 'Conteo de movimientos: ' : 'Elapsed movements: '} {gameInfo.timeElapsed}</h4>
        <h4>{gameInfo.isSpanish ? 'Mayor puntaje: ' : 'High score: '} {gameInfo.highScore}</h4>
        <h4>{gameInfo.isSpanish ? 'Puntaje: ' : 'Score: '} {gameInfo.score}</h4>
        <h4>{gameInfo.isSpanish ? 'Velocidad del juego: ' : 'Game speed: '} {(100 - ((gameInfo.msInterval * 100) / 950)).toFixed(2)} {'%'}</h4>
        {/* <h4>{gameInfo.isSpanish ? 'Tecla presionada: ' : 'Pressed key: '} {gameInfo.pressedKeyCode}</h4> */}
      </div>

      <div className='status-bar-middle'>
        {gameInfo.mainFrameText === '' ? <img src={logo} alt='game-logo' style={logoStyle} />
                                       : <div style={messageStyle}><p style={textStyle}>{gameInfo.mainFrameText}</p></div>}
        <br />
        <input type='text' readOnly size='35' style={buttonStyle} value={gameInfo.buttonText}
              onKeyDown={(event) => keyCode(event, playerInfo, gameInfo.pausedGame)}
              onFocus={() => startGame(gameInfo.isSpanish ? 'Pause con Enter o clic afuera' : 'Press Enter or click outside to pause')}
              onBlur={() => pauseGame((gameInfo.isSpanish ? 'Clic aquí para continuar' : 'Click here to resume'), (gameInfo.isSpanish ? 'EN PAUSA' : 'GAME PAUSED'))}
        />
      </div>

      <div className='status-bar-right'>
        <h4>{gameInfo.isSpanish ? 'Enemigos aniquilados: ' : 'Enemies killed: '} {gameInfo.enemiesKilled}</h4>
        <h4>{gameInfo.isSpanish ? 'Enemigos restantes: ' : 'Enemies left: '} {gameInfo.enemiesLeft}</h4>
        <h4>{gameInfo.isSpanish ? 'Balas disparadas: ' : 'Fired bullets: '} {gameInfo.firedBullets}</h4>
        <h4>{gameInfo.isSpanish ? 'Vidas restantes: ' : 'Lives remaining: '} {gameInfo.lives}</h4>
        <h4>{gameInfo.isSpanish ? 'Probabilidad de bomba: ' : 'Bomb probability: '} {100 - ((gameInfo.bombProbability * 100) / 50)} {'%'}</h4>
        {/* <h4>{gameInfo.isSpanish ? 'Posición del jugador: ' : 'Player cell: '} {playerInfo.findIndex(pos => pos.playerHere) + 1}</h4> */}
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
  backgroundColor: '#686192',
  marginTop: '3px',
  padding: '10px',
}

export default StatusBar
