import React, { Fragment, useContext } from 'react'
import sound_on from '../assets/images/sound/sound_on.png'
import sound_off from '../assets/images/sound/sound_off.png'

import { GlobalContext } from '../context/GalagaState'
import { AudioLibrary } from '../functions/AudioLibrary'

const ToggleSounds = ({ changeScreen }) => {
  const { gameInfo, toggleSoundOnOff } = useContext(GlobalContext)
  let nextScreen = changeScreen

  function enableAudio(soundEnabled) {
    toggleSoundOnOff(soundEnabled)
    if (soundEnabled && !gameInfo.soundsOn) { AudioLibrary('jazz_on') }
    if (!soundEnabled && gameInfo.soundsOn) { AudioLibrary('jazz_off') }
    AudioLibrary('click')
    nextScreen(0)
  }

  return (
    <Fragment>
      <div><img src={sound_on} alt='sound_on' style={audioStyle} /></div>
      <div className='language-banner'>
        <button className='button' style={btnStyle} autoFocus onClick={() => enableAudio(true)}>
            {gameInfo.isSpanish ? 'HABILITAR MÚSICA' : 'ENABLE MUSIC'}</button>
      </div>
      <div><img src={sound_off} alt='sound_off' style={audioStyle} /></div>
      <div className='language-banner'>
        <button className='button' style={btnStyle} onClick={() => enableAudio(false)}>
            {gameInfo.isSpanish ? 'MÚSICA SILENCIADA' : 'MUTE MUSIC'}</button>
      </div>
    </Fragment>
  )
}

// Estilos para la imágenes de encender / apagar audio
const audioStyle = {
  maxHeight: '150px',
}

const btnStyle = {
  marginTop: '55px',
}

export default ToggleSounds
