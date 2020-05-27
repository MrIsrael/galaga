import React, { Fragment, useContext } from 'react'
import logo from '../assets/images/logo.gif'

import { GlobalContext } from '../context/GalagaState'

const WelcomeScreen = ({ changeScreen }) => {
  const { gameInfo } = useContext(GlobalContext)
  let nextScreen = changeScreen
 
  return (
    <Fragment>
      <div className='welcome-screen-banner'>
        <img src={logo} alt='game-logo' style={logoStyle} />
        <h1>{gameInfo.isSpanish ? 'BIENVENIDO A GALAGA!' : 'WELCOME TO GALAGA!'}</h1>
        <button className='button' onClick={() => nextScreen(-1)}>{gameInfo.isSpanish ? 'COMENZAR JUEGO' : 'START GAME'}</button>
      </div>
      <div><button className='button' onClick={() => nextScreen(1)}>{gameInfo.isSpanish ? 'INSTRUCCIONES DEL JUEGO' : 'GAME INSTRUCTIONS'}</button></div>
      <div><button className='button' autoFocus onClick={() => nextScreen(-2)}>{gameInfo.isSpanish ? 'SELECCIONAR IDIOMA' : 'SELECT LANGUAGE'}</button></div>
      <div><button className='button' onClick={() => nextScreen(-3)}>{gameInfo.isSpanish ? 'SELECCIONE SU AVATAR' : 'SELECT YOUR AVATAR'}</button></div>
    </Fragment>
  )
}

// Estilos para la imagen del logo del juego
const logoStyle = {
  maxHeight: '150px',
}

export default WelcomeScreen
