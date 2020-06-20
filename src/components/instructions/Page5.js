import React, { Fragment, useContext } from 'react'
import inst_image from '../../assets/images/instructions/inst_page_5.png'

import { GlobalContext } from '../../context/GalagaState'
import { AudioLibrary } from '../../functions/AudioLibrary'

const Page5 = ({ changeScreen }) => {
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
        <h3>{gameInfo.isSpanish ? 'DINÁMICA DE JUEGO' : 'GAME DYNAMICS'}</h3>
        <p>{gameInfo.isSpanish ? 'El objetivo del juego es eliminar a todos los enemigos, pasar al siguiente nivel (la dificultad' 
                               : 'Game objective is to destroy all enemies, continue to next level (harder than last one),'}</p>
        <p>{gameInfo.isSpanish ? 'va aumentando cada cambio de nivel) hasta que el jugador pierda todas sus vidas.' 
                               : 'until player lose all his lives and match ends.'}</p>
        <p>{gameInfo.isSpanish ? 'Cada vez que un enemigo sea destruido, explotará. Algunos deben ser impactados más veces antes de poder destruirlos.' 
                               : 'When an enemy is destroyed, it explodes. Some kinds of enemies require more hits before being destroyed.'}</p>
        <p>{gameInfo.isSpanish ? 'A medida que transcurre la partida, los enemigos se van moviendo vertical y horizontalmente, más rápido' 
                               : 'As game goes on, enemies move over horizontal and vertical axis, faster each level,'}</p>
        <p>{gameInfo.isSpanish ? 'cada cambio de nivel, para esquivar las balas disparadas en su contra por el jugador.' 
                               : 'trying to avoid bullets shot against them.'}</p>
        <p>{gameInfo.isSpanish ? 'Si un enemigo logra avanzar verticalmente hasta la plataforma del jugador, lo destruye y hace que pierda una vida.' 
                               : "If an enemy reaches player's platform, destroys his avatar, and one life is lost."}</p>
      </div>
      <div><button className='button' onClick={() => moveTo(4)}>{gameInfo.isSpanish ? 'ATRÁS' : 'BACK'}</button></div>
      <div><button className='button' onClick={() => moveTo(0)}>{gameInfo.isSpanish ? 'MENÚ PRINCIPAL' : 'MAIN MENU'}</button></div>
      <div><button className='button' autoFocus onClick={() => moveTo(6)}>{gameInfo.isSpanish ? 'A PÁG 6 (DE 9)' : 'TO PAGE 6 / 9'}</button></div>
    </Fragment>
  )
}

// Estilos para las imágenes de las instrucciones
const instStyle = {
  maxHeight: '350px',
  border: 'dotted 1px white',
}

export default Page5
