import React, { Fragment, useContext } from 'react'
import skull from '../assets/images/avatars/skull.gif'

import { GlobalContext } from '../context/GalagaState'

const GameOver = ({ changeScreen }) => {
  const { gameInfo, resetState } = useContext(GlobalContext)
  let nextScreen = changeScreen

  function oneMoreTime(screen) {
    resetState(gameInfo.isSpanish ? 'Clic aquí para jugar' : 'Click here to play')
    nextScreen(screen)
  }

  return (
    <Fragment>
      <div><img src={skull} alt='death' style={koStyle} /></div>
      <div className='language-banner'>
        <h1 style={textStyle}>{gameInfo.isSpanish ? 'FIN DEL JUEGO!' : 'GAME OVER!'}</h1>
        <h3 style={textStyle}>{gameInfo.isSpanish ? 'Estadísticas del jugador:' : 'Game statistics:'}</h3>
        <p>{gameInfo.isSpanish ? 'Puntaje máximo: ' : 'High score: '} {gameInfo.highScore}</p>
        <p>{gameInfo.isSpanish ? 'Máximo nivel alcanzado: ' : 'Level reached: '} {gameInfo.level}</p>
        <p>{gameInfo.isSpanish ? 'Enemigos aniquilados: ' : 'Enemies killed: '} {gameInfo.enemiesKilled}</p>
        <p>{gameInfo.isSpanish ? 'Balas disparadas: ' : 'Fired bullets: '} {gameInfo.firedBullets}</p>
      </div>
      <div><button className='button' onClick={() => oneMoreTime(0)}>{gameInfo.isSpanish ? 'VOLVER AL MENÚ PRINCIPAL' : 'BACK TO MAIN MENU'}</button></div>
      <div></div>
      <div><button className='button' autoFocus onClick={() => oneMoreTime(-1)}>{gameInfo.isSpanish ? 'REINICIAR JUEGO' : 'RESTART GAME'}</button></div>
    </Fragment>
  )
}

// Estilos para la imagen de game over
const koStyle = {
  maxHeight: '250px',
  marginTop: '20px',
}

const textStyle = {
  marginBottom: '50px',
}

export default GameOver
