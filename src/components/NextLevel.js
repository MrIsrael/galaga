import React, { Fragment, useContext, useEffect } from 'react'
import success from '../assets/images/misc/success.gif'

import { GlobalContext } from '../context/GalagaState'
import { AudioLibrary } from '../functions/AudioLibrary'
import { SetDifficulty } from '../functions/SetDifficulty'    // Define los valores de level, score, msInterval y bombProbability para el siguiente nivel del juego

const NextLevel = ({ changeScreen }) => {
  const { gameInfo, resetState, nextLevel, pauseGame } = useContext(GlobalContext)
  let nextScreen = changeScreen

  useEffect(() => {
    if (gameInfo.soundsOn) { AudioLibrary('next_level') }
    // eslint-disable-next-line
  }, [])

  function backToMainMenu(screen) {
    AudioLibrary('click')
    if (gameInfo.soundsOn) { 
      AudioLibrary('any_music_off') 
      AudioLibrary('jazz_on') 
    }
    resetState((gameInfo.isSpanish ? 'Cargando...' : 'Loading...'), (gameInfo.isSpanish ? 'LISTO?' : 'READY?'))
    nextScreen(screen)
  }

  function goToNextLevel(screen) {
    AudioLibrary('click')
    const nextLvlSettings = SetDifficulty(gameInfo.level, gameInfo.difficulty)
    // Resetear atributos de gameInfo: msInterval (más corto), bombProbability (más alta), score (adición), level (+1), levelJustStarted = true, initialCountdown = 5
    nextLevel(nextLvlSettings[0], nextLvlSettings[1], nextLvlSettings[2], nextLvlSettings[3], true, 5)
    pauseGame((gameInfo.isSpanish ? 'Cargando...' : 'Loading...'), (gameInfo.isSpanish ? 'LISTO?' : 'READY?'))
    nextScreen(screen)
  }

  return (
    <Fragment>
      <div><img src={success} alt='death' style={nlvlStyle} /></div>
      <div className='language-banner'>
        <h1 className='game-name-style' style={textStyle}>{gameInfo.isSpanish ? 'NIVEL COMPLETADO!' : 'LEVEL COMPLETED!'}</h1>
        <h3 style={textStyle}>{gameInfo.isSpanish ? 'Todos los aliens fueron destruidos...' : 'All enemies wiped out...'}</h3>
        <h3 style={textStyle}>{gameInfo.isSpanish ? 'Bien hecho!' : 'Well done!'}</h3>
        <p>{gameInfo.isSpanish ? 'Siguiente nivel: ' : 'Next level: '} {gameInfo.level + 1}</p>
      </div>
      <div><button className='button' onClick={() => backToMainMenu(0)}>{gameInfo.isSpanish ? 'SALIR DEL JUEGO / IR AL MENÚ PRINCIPAL' : 'END GAME / EXIT TO MAIN MENU'}</button></div>
      <div></div>
      <div><button className='button' autoFocus onClick={() => goToNextLevel(-1)}>{gameInfo.isSpanish ? 'CONTINUAR AL SIGUIENTE NIVEL' : 'CONTINUE TO NEXT LEVEL'}</button></div>
    </Fragment>
  )
}

// Estilos para la imagen de next level
const nlvlStyle = {
  maxHeight: '250px',
}

const textStyle = {
  marginBottom: '50px',
}

export default NextLevel
