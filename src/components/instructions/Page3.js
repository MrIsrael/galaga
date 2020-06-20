import React, { Fragment, useContext } from 'react'
import inst_image from '../../assets/images/instructions/inst_page_3.png'

import { GlobalContext } from '../../context/GalagaState'
import { AudioLibrary } from '../../functions/AudioLibrary'

const Page3 = ({ changeScreen }) => {
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
        <h3>{gameInfo.isSpanish ? 'CAMPO DE JUEGO' : 'BATTLEFIELD'}</h3>
        <p>{gameInfo.isSpanish ? 'El campo de batalla consta de 3 zonas: La informativa (arriba), donde se muestra toda la' 
                               : 'There are 3 different zones: Status bar (above), which contains all game info and'}</p>
        <p>{gameInfo.isSpanish ? 'información de la partida; la formación enemiga (en medio) y la de desplazamiento y disparo' 
                               : 'shows keyboard shortcuts; Enemy formation (in the middle), and Player platform (red area below),'}</p>
        <p>{gameInfo.isSpanish ? 'del jugador (abajo, área en rojo).' 
                               : "where player's avatar can move and shoot from."}</p>
        <p>{gameInfo.isSpanish ? 'Para mover el avatar, presione las flechas izquierda y derecha.' 
                               : 'To move avatar, press left or right arrow keys.'}</p>
        <p>{gameInfo.isSpanish ? 'Para disparar, presione la barra espaciadora.' 
                               : 'To shoot a bullet, press space bar.'}</p>
      </div>
      <div><button className='button' onClick={() => moveTo(2)}>{gameInfo.isSpanish ? 'ATRÁS' : 'BACK'}</button></div>
      <div><button className='button' onClick={() => moveTo(0)}>{gameInfo.isSpanish ? 'MENÚ PRINCIPAL' : 'MAIN MENU'}</button></div>
      <div><button className='button' autoFocus onClick={() => moveTo(4)}>{gameInfo.isSpanish ? 'A PÁG 4 (DE 9)' : 'TO PAGE 4 / 9'}</button></div>
    </Fragment>
  )
}

// Estilos para las imágenes de las instrucciones
const instStyle = {
  maxHeight: '300px',
  border: 'dotted 1px white',
}

export default Page3
