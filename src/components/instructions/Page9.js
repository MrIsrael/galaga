import React, { Fragment, useContext } from 'react'
import inst_image from '../../assets/images/instructions/inst_page_9.png'

import { GlobalContext } from '../../context/GalagaState'
import { AudioLibrary } from '../../functions/AudioLibrary'

const Page9 = ({ changeScreen }) => {
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
        <h3>{gameInfo.isSpanish ? 'FIN DEL JUEGO' : 'GAME OVER'}</h3>
        <p>{gameInfo.isSpanish ? 'El juego termina cuando el jugador pierde todas sus vidas.' 
                               : 'Game ends when player loses all his lives.'}</p>
        <p>{gameInfo.isSpanish ? 'Se mostrará una pantalla de resumen de la patida, con las estadísticas más relevantes.' 
                               : 'If it happens, a recopilatory screen will be shown, indicating most relevant match statistics.'}</p>
        <p>{gameInfo.isSpanish ? 'Desde allí, es posible reiniciar el juego (conservando los ajustes iniciales) o volver al menu principal.' 
                               : "From that point, it's possible to restart game (reloading initial settings) or exit to main menu."}</p>
      </div>
      <div><button className='button' onClick={() => moveTo(8)}>{gameInfo.isSpanish ? 'ATRÁS' : 'BACK'}</button></div>
      <div><button className='button' autoFocus onClick={() => moveTo(0)}>{gameInfo.isSpanish ? 'MENÚ PRINCIPAL' : 'MAIN MENU'}</button></div>
      <div></div>
    </Fragment>
  )
}

// Estilos para las imágenes de las instrucciones
const instStyle = {
  maxHeight: '250px',
  border: 'dotted 1px white',
}

export default Page9
