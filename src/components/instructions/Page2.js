import React, { Fragment, useContext } from 'react'
import inst_image from '../../assets/images/instructions/inst_page_2.png'

import { GlobalContext } from '../../context/GalagaState'
import { AudioLibrary } from '../../functions/AudioLibrary'

const Page2 = ({ changeScreen }) => {
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
        <h3>{gameInfo.isSpanish ? 'PÁGINA "ACERCA DE"' : '"ABOUT" PAGE'}</h3>
        <p>{gameInfo.isSpanish ? 'Aquí encontrará información sobre las tecnologías utilizadas en el desarrollo de' 
                               : "Here you'll find info about languages and technologies used during development,"}</p>
        <p>{gameInfo.isSpanish ? 'esta aplicación, así como del equipo que la hizo posible.' 
                               : 'and meet the team that brought this game to life.'}</p>
        <p>{gameInfo.isSpanish ? 'Los botones le darán acceso a mayor información sobre quién desarrolló este juego.' 
                               : 'Buttons will give you further info about the developer whom designed and programmed this app.'}</p>
        <p>{gameInfo.isSpanish ? 'Incluso puede acceder al repositorio en GitHub, darle un vistazo al código y descargarlo!' 
                               : 'You can even go to GitHub repository, check and download the code!'}</p>
      </div>
      <div><button className='button' onClick={() => moveTo(1)}>{gameInfo.isSpanish ? 'ATRÁS' : 'BACK'}</button></div>
      <div><button className='button' onClick={() => moveTo(0)}>{gameInfo.isSpanish ? 'MENÚ PRINCIPAL' : 'MAIN MENU'}</button></div>
      <div><button className='button' autoFocus onClick={() => moveTo(3)}>{gameInfo.isSpanish ? 'A PÁG 3 (DE 9)' : 'TO PAGE 3 / 9'}</button></div>
    </Fragment>
  )
}

// Estilos para las imágenes de las instrucciones
const instStyle = {
  maxHeight: '300px',
  border: 'dotted 1px white',
}

export default Page2
