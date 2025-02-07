import React, { Fragment, useContext } from 'react'
import logo from '../assets/images/misc/logo.png'

import { GlobalContext } from '../context/GalagaState'
import { AudioLibrary } from '../functions/AudioLibrary'

const WelcomeScreen = ({ changeScreen }) => {
  const { gameInfo } = useContext(GlobalContext)
  let nextScreen = changeScreen

  function moveTo(screenToGo) {
    AudioLibrary('click')
    nextScreen(screenToGo)
  }

  return (
    <Fragment>
      <div className='welcome-screen-banner'>
        <img src={logo} alt='game-logo' style={logoStyle} />
        <h1 className='game-name-style' style={{marginBottom: '60px'}}>{gameInfo.isSpanish ? 'BIENVENIDO A GALAGA!' : 'WELCOME TO GALAGA!'}</h1>
        <button className='button' autoFocus onClick={() => nextScreen(-1)}>{gameInfo.isSpanish ? 'COMENZAR JUEGO' : 'START GAME'}</button>
      </div>
      <div><button className='button' onClick={() => moveTo(1)}>{gameInfo.isSpanish ? 'INSTRUCCIONES DEL JUEGO' : 'GAME INSTRUCTIONS'}</button></div>
      <div><button className='button' onClick={() => moveTo(-2)}>{gameInfo.isSpanish ? 'SELECCIONAR IDIOMA' : 'SELECT LANGUAGE'}</button></div>
      <div><button className='button' onClick={() => moveTo(-3)}>{gameInfo.isSpanish ? 'SELECCIONE SU AVATAR' : 'SELECT YOUR AVATAR'}</button></div>
      <div><button className='button' onClick={() => moveTo(-6)}>{gameInfo.isSpanish ? 'DEFINIR DIFICULTAD' : 'SELECT DIFFICULTY'}</button></div>
      <div><button className='button' onClick={() => moveTo(-7)}>{gameInfo.isSpanish ? 'ENCENDER / APAGAR AUDIO' : 'AUDIO ON / OFF'}</button></div>
      <div><button className='button' onClick={() => moveTo(-8)}>{gameInfo.isSpanish ? 'ACERCA DE / CRÉDITOS' : 'ABOUT / CREDITS'}</button></div>
      <p className='welcome-screen-banner' style={{marginTop: '25px'}}>{gameInfo.isSpanish ? 'Sujeto a los términos de licencia MIT. ' : 'Subject to MIT license. '}© Israel Uribe 2020. </p>
    </Fragment>
  )
}

// Estilos para la imagen del logo del juego
const logoStyle = {
  maxHeight: '150px',
  marginBottom: '15px',
}

export default WelcomeScreen
