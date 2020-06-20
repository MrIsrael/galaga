import React, { Fragment, useContext } from 'react'
import inst_image from '../../assets/images/instructions/inst_page_8.png'

import { GlobalContext } from '../../context/GalagaState'
import { AudioLibrary } from '../../functions/AudioLibrary'

const Page8 = ({ changeScreen }) => {
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
        <h3>{gameInfo.isSpanish ? 'SIGUIENTE NIVEL' : 'NEXT LEVEL'}</h3>
        <p>{gameInfo.isSpanish ? 'Al terminar un nivel, Se muestra una pantalla de pausa antes de continuar.' 
                               : 'When player destroys all enemies, level finishes and an intermediate screen is shown.'}</p>
        <p>{gameInfo.isSpanish ? 'El botón activo por defecto redirige al siguiente nivel. También es posible regresar al menú principal.' 
                               : 'Pressing default active button makes next level to start. There is also the option to return to main menu.'}</p>
        <p>{gameInfo.isSpanish ? 'No hay límite de niveles; se seguirán generando nuevos niveles, cada uno más dificil que el anterior,' 
                               : 'There is no level limit; new levels will be generated, each one harder than prior one,'}</p>
        <p>{gameInfo.isSpanish ? 'hasta que el jugador pierda todas sus vidas.'
                               : 'until player loses all his lives.'}</p>
      </div>
      <div><button className='button' onClick={() => moveTo(7)}>{gameInfo.isSpanish ? 'ATRÁS' : 'BACK'}</button></div>
      <div><button className='button' onClick={() => moveTo(0)}>{gameInfo.isSpanish ? 'MENÚ PRINCIPAL' : 'MAIN MENU'}</button></div>
      <div><button className='button' autoFocus onClick={() => moveTo(9)}>{gameInfo.isSpanish ? 'A PÁG 9 (DE 9)' : 'TO PAGE 9 / 9'}</button></div>
    </Fragment>
  )
}

// Estilos para las imágenes de las instrucciones
const instStyle = {
  maxHeight: '250px',
  border: 'dotted 1px white',
}

export default Page8
