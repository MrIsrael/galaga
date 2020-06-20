import React, { Fragment, useContext } from 'react'
import inst_image from '../../assets/images/instructions/inst_page_7.png'

import { GlobalContext } from '../../context/GalagaState'
import { AudioLibrary } from '../../functions/AudioLibrary'

const Page7 = ({ changeScreen }) => {
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
        <h3>{gameInfo.isSpanish ? 'INFORMACIÓN DEL JUEGO' : 'STATUS BAR'}</h3>
        <p>{gameInfo.isSpanish ? 'El panel superior muestra toda la información referente al juego: Nivel actual, dificultad elegida,' 
                               : 'Upper zone shows game info in detail: Current level, chosen difficulty, ongoing and high scores,'}</p>
        <p>{gameInfo.isSpanish ? 'puntaje actual y máximo alcanzado, velocidad del juego (respecto al primer nivel), enemigos restantes y' 
                               : 'game speed (compared to first level), killed and remaining enemies count, fired bullets count,'}</p>
        <p>{gameInfo.isSpanish ? 'aniquilados, balas disparadas, vidas restantes y probabilidad de lanzamiento de bombas (respecto al' 
                               : 'lives left and probability of bomb launch (compared to level one).'}</p>
        <p>{gameInfo.isSpanish ? 'primer nivel). Cada cambio de nivel, la velocidad del juego y la probabilidad de lanzamiento de bombas aumentan.'
                               : 'When a new level starts, game speed and bomb launch probability increase.'}</p>
      </div>
      <div><button className='button' onClick={() => moveTo(6)}>{gameInfo.isSpanish ? 'ATRÁS' : 'BACK'}</button></div>
      <div><button className='button' onClick={() => moveTo(0)}>{gameInfo.isSpanish ? 'MENÚ PRINCIPAL' : 'MAIN MENU'}</button></div>
      <div><button className='button' autoFocus onClick={() => moveTo(8)}>{gameInfo.isSpanish ? 'A PÁG 8 (DE 9)' : 'TO PAGE 8 / 9'}</button></div>
    </Fragment>
  )
}

// Estilos para las imágenes de las instrucciones
const instStyle = {
  maxHeight: '200px',
  border: 'dotted 1px white',
}

export default Page7
