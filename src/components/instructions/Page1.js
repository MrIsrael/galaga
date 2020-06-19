import React, { Fragment, useContext } from 'react'
import test from '../../assets/images/misc/success.gif'

import { GlobalContext } from '../../context/GalagaState'
import { AudioLibrary } from '../../functions/AudioLibrary'

const Page1 = ({ changeScreen }) => {
  const { gameInfo } = useContext(GlobalContext)
  let nextScreen = changeScreen

  function moveTo(screenToGo) {
    AudioLibrary('click')
    nextScreen(screenToGo)
  }

  // RESOLUCIÓN MÍNIMA: 1210 x 664 píxeles
  // Sólo se puede jugar en un PC o Mac, con teclado y/o ratón. No es posible controlar el juego desde dispositivos móviles.

  return (
    <Fragment>
      <div><img src={test} alt='inst_page_1' style={instStyle} /></div>
      <div className='language-banner'>
        <h2>{gameInfo.isSpanish ? 'PÁGINA DE INSTRUCCIONES # 1' : 'INSTRUCTIONS PAGE # 1'}</h2>
        <p>{gameInfo.isSpanish ? 'Esta es la primera página de instrucciones. Cambiar la imagen.' 
                               : "This is the first instructions page. Don't forget to change image"}</p>
      </div>
      <div><button className='button' onClick={() => moveTo(0)}>{gameInfo.isSpanish ? 'ATRÁS' : 'BACK'}</button></div>
      <div></div>
      <div><button className='button' onClick={() => moveTo(0)}>{gameInfo.isSpanish ? 'SIGUIENTE' : 'NEXT'}</button></div>
    </Fragment>
  )
}

// Estilos para las imágenes de las instrucciones
const instStyle = {
  maxHeight: '150px',
}

export default Page1
