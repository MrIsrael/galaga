import React, { Fragment, useContext } from 'react'
import linkedin from '../assets/images/brands/linkedin.svg'
import github from '../assets/images/brands/github.svg'
import gmail from '../assets/images/brands/gmail.svg'
import gmaps from '../assets/images/brands/gmaps.svg'
import js from '../assets/images/brands/javascript.svg'
import react from '../assets/images/brands/react.svg'
import css from '../assets/images/brands/css-3.svg'

import { GlobalContext } from '../context/GalagaState'
import { AudioLibrary } from '../functions/AudioLibrary'

const AboutAndCredits = ({ changeScreen }) => {
  const { gameInfo } = useContext(GlobalContext)
  let nextScreen = changeScreen

  function moveTo(screenToGo) {
    AudioLibrary('click')
    nextScreen(screenToGo)
  }

  return (
    <Fragment>
      <div><button className='button' autoFocus onClick={() => moveTo(0)}>{gameInfo.isSpanish ? 'VOLVER' : 'RETURN'}</button></div>
      <div className='welcome-screen-banner'>
        <h1>GALAGA</h1>
        <p style={{marginBottom: '45px'}}>{gameInfo.isSpanish ? 'versión 1.0' : 'version 1.0'}</p>

        <p>{gameInfo.isSpanish ? 'Diseño conceptual y programación:' : 'Concept, design and programming:'}</p>
        <h3 style={{marginBottom: '45px'}}>Israel Uribe Salazar</h3>

        <div className='about-container'>
          <div><img src={linkedin} alt='linkedin' width='100' height='43' /></div>
          <div><a href='https://www.linkedin.com/in/israeluribesalazar/' target='_blank' rel='noopener noreferrer'>
               <button className='button'>{gameInfo.isSpanish ? 'Ir a mi perfil en LinkedIn' : 'Check my LinkedIn profile'}</button></a>
          </div>
          
          <div><img src={github} alt='github' width='100' height='43' /></div>
          <div><a href='https://github.com/MrIsrael/galaga' target='_blank' rel='noopener noreferrer'>
               <button className='button'>{gameInfo.isSpanish ? 'Ver código fuente en GitHub' : 'Source code on GitHub'}</button></a>
          </div>

          <div><img src={gmail} alt='gmail' width='100' height='43' /></div>
          <div><a href='mailto:israeluribe@gmail.com?subject=Contact%20from%20Galaga%20app' target='_blank' rel='noopener noreferrer'>
               <button className='button'>{gameInfo.isSpanish ? 'Contacto vía email' : 'Contact me by email'}</button></a>
          </div>

          <div><img src={gmaps} alt='gmaps' width='100' height='43' /></div>
          <div><a href='https://bit.ly/30BLEwT' target='_blank' rel='noopener noreferrer'>
               <button className='button'>{gameInfo.isSpanish ? 'Mi ubicación' : 'My location'}</button></a>
          </div>
        </div>

        <p>{gameInfo.isSpanish ? 'App creada usando:' : 'App built with:'}</p>

        <div className='about-container'>
          <div><img src={js} alt='js' width='100' height='43' /></div>
          <div style={{paddingTop: '20px'}}>JavaScript (ES6)</div>
          
          <div><img src={react} alt='react' width='100' height='43' /></div>
          <div style={{paddingTop: '20px'}}>React Hooks + Context</div>

          <div><img src={css} alt='css' width='100' height='43' /></div>
          <div style={{paddingTop: '20px'}}>CSS grid & animations</div>
        </div>

        <p style={{marginTop: '45px'}}>{gameInfo.isSpanish ? 'Asesoría artística y edición de imágenes:' : 'Artistic consulting and image editing:'}</p>
        <h3 style={{marginBottom: '45px'}}>Carmen Lucía Alvarez Palma</h3>

        <p>Testers:</p>
        <h3>Mauricio Serna Castaño</h3>
        <h3>Martina Serna Hoyos</h3>
        <h3>Simón Serna Hoyos</h3>
      </div>
    </Fragment>
  )
}

export default AboutAndCredits
