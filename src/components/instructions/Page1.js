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

  return (
    <Fragment>
      <div><img src={test} alt='inst_page_1' style={instStyle} /></div>
      <div className='language-banner'>
        <h2>{gameInfo.isSpanish ? 'PÁGINA DE INSTRUCCIONES # 1' : 'INSTRUCTIONS PAGE # 1'}</h2>
        <p>{gameInfo.isSpanish ? 'Esta es la primera página de instrucciones. Cambiar la imagen.' 
                               : "This is the first instructions page. Don't forget to change image"}</p>
      </div>
      <div><button className='button' onClick={() => moveTo(0)}>{gameInfo.isSpanish ? 'Atrás' : 'Back'}</button></div>
      <div></div>
      <div><button className='button' onClick={() => moveTo(0)}>{gameInfo.isSpanish ? 'Siguiente' : 'Next'}</button></div>
    </Fragment>
  )
}

// Estilos para las imágenes de las instrucciones
const instStyle = {
  maxHeight: '150px',
}

export default Page1
