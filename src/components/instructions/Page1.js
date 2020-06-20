import React, { Fragment, useContext } from 'react'
import inst_image from '../../assets/images/instructions/inst_page_1.png'

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
      <div className='welcome-screen-banner'>
        <div><img src={inst_image} alt='inst_image' style={instStyle} /></div>
        <h3>{gameInfo.isSpanish ? 'MENÚ PRINCIPAL' : 'MAIN MENU'}</h3>
        <p>{gameInfo.isSpanish ? 'Puede configurar los parámetros del juego a su gusto: Elija el idioma a mostrar,' 
                               : 'You can configure game settings as you want: Select the language to display,'}</p>
        <p>{gameInfo.isSpanish ? 'su avatar durante el juego, qué dificultad prefiere y si desea activar música y efectos.' 
                               : 'your player avatar, desired difficulty and enable / mute music and audio effects.'}</p>
        <p>{gameInfo.isSpanish ? 'En "Acerca de" encontrará información sobre el desarrollo y los creadores del juego.' 
                               : 'Check the About page to know more about game development and creators.'}</p>
        <p>{gameInfo.isSpanish ? 'Cuando esté listo, de click en "Comenzar juego".' 
                               : 'Click "Start game" when ready.'}</p>
        <br />
        <p>{gameInfo.isSpanish ? 'NOTA: Para una experiencia adecuada, NO se debe ejecutar esta aplicación en un smartphone' 
                               : 'NOTE: For an optimal experience, DO NOT use this app on a smartphone or tablet.'}</p>
        <p>{gameInfo.isSpanish ? 'o tableta. La resolución MÍNIMA de la pantalla debe ser de 1210 x 664 píxeles.' 
                               : 'MINIMAL screen resolution should be 1210 x 664 pixels.'}</p>
      </div>
      <div><button className='button' onClick={() => moveTo(0)}>{gameInfo.isSpanish ? 'ATRÁS' : 'BACK'}</button></div>
      <div><button className='button' onClick={() => moveTo(0)}>{gameInfo.isSpanish ? 'MENÚ PRINCIPAL' : 'MAIN MENU'}</button></div>
      <div><button className='button' autoFocus onClick={() => moveTo(2)}>{gameInfo.isSpanish ? 'A PÁG 2 (DE 9)' : 'TO PAGE 2 / 9'}</button></div>
    </Fragment>
  )
}

// Estilos para las imágenes de las instrucciones
const instStyle = {
  maxHeight: '200px',
  border: 'dotted 1px white',
}

export default Page1
