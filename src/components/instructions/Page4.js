import React, { Fragment, useContext } from 'react'
import inst_image from '../../assets/images/instructions/inst_page_4.png'

import { GlobalContext } from '../../context/GalagaState'
import { AudioLibrary } from '../../functions/AudioLibrary'

const Page4 = ({ changeScreen }) => {
  const { gameInfo } = useContext(GlobalContext)
  let nextScreen = changeScreen

  function moveTo(screenToGo) {
    AudioLibrary('click')
    nextScreen(screenToGo)
  }

  return (
    <Fragment>
      <div className='welcome-screen-banner'>
        <div><img src={inst_image} alt='inst_image' style={instStyle} /></div>
        <h3>{gameInfo.isSpanish ? 'MENSAJES AL USUARIO DURANTE LA PARTIDA' : 'IN-GAME MESSAGES TO USER'}</h3>
        <p>{gameInfo.isSpanish ? 'El cuadro informativo superior indica el estado del juego: Si está o no en pausa,' 
                               : 'On status bar, upper info area shows current state of the game: If it is (or not) paused,'}</p>
        <p>{gameInfo.isSpanish ? 'si el jugador fue impactado y perdió una vida, entre otros. El cuadro inferior indica' 
                               : 'if player was hit and lost one life, etc. Lower info area indicates if game is loading,'}</p>
        <p>{gameInfo.isSpanish ? 'qué teclas se deben presionar (o dónde dar un clic) para pausar / continuar el juego.' 
                               : 'or which keys must be pressed (even where to click) to pause / continue.'}</p>
        <p>{gameInfo.isSpanish ? 'Cuando el cuadro inferior requiera su atención, parpadeará.' 
                               : 'When lower area would require your attention, it will blink.'}</p>
      </div>
      <div><button className='button' onClick={() => moveTo(3)}>{gameInfo.isSpanish ? 'ATRÁS' : 'BACK'}</button></div>
      <div><button className='button' onClick={() => moveTo(0)}>{gameInfo.isSpanish ? 'MENÚ PRINCIPAL' : 'MAIN MENU'}</button></div>
      <div><button className='button' autoFocus onClick={() => moveTo(5)}>{gameInfo.isSpanish ? 'A PÁG 5 (DE 9)' : 'TO PAGE 5 / 9'}</button></div>
    </Fragment>
  )
}

// Estilos para las imágenes de las instrucciones
const instStyle = {
  maxHeight: '225px',
  border: 'dotted 1px white',
}

export default Page4
