import React, { Fragment, useContext } from 'react'
import spanish from '../assets/images/flags/spain.jpg'
import english from '../assets/images/flags/UK.png'

import { GlobalContext } from '../context/GalagaState'

const SelectLanguage = ({ changeScreen }) => {
  const { toggleLanguage, pauseGame } = useContext(GlobalContext)
  let nextScreen = changeScreen
 
  function changeLang(lang) {
    toggleLanguage(lang === 'ES' ? true : false)
    pauseGame((lang === 'ES' ? 'Clic aquí para jugar' : 'Click here to play'), (lang === 'ES' ? 'LISTO?' : 'READY?'))
    nextScreen(0)
  }

  return (
    <Fragment>
      <div><img src={spanish} alt='spain' style={flagStyle} /></div>
      <div className='language-banner'>
        <button className='button' style={btnStyle} autoFocus onClick={() => changeLang('ES')}>ESPAÑOL</button>
      </div>
      <div><img src={english} alt='uk' style={flagStyle} /></div>
      <div className='language-banner'>
        <button className='button' style={btnStyle} onClick={() => changeLang('EN')}>ENGLISH</button>
      </div>
    </Fragment>
  )
}

// Estilos para la imágenes de los idiomas
const flagStyle = {
  maxHeight: '150px',
}

const btnStyle = {
  marginTop: '55px',
}

export default SelectLanguage
