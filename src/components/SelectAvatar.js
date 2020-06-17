import React, { Fragment, useContext } from 'react'
import spaceShip from '../assets/images/avatars/spaceShip.gif'
import falcon from '../assets/images/avatars/millenium-falcon.gif'
import ufo from '../assets/images/avatars/ufo.gif'

import { GlobalContext } from '../context/GalagaState'
import { AudioLibrary } from '../functions/AudioLibrary'

const SelectAvatar = ({ changeScreen }) => {
  const { gameInfo, chooseAvatar } = useContext(GlobalContext)
  let nextScreen = changeScreen
 
  function avatarSelection(avatar) {
    chooseAvatar(avatar)
    AudioLibrary('click')
    nextScreen(0)
  }

  return (
    <Fragment>
      <div><img src={spaceShip} alt='spaceship' style={avatarStyle} /></div>
      <div><img src={falcon} alt='falcon' style={avatarStyle} /></div>
      <div><img src={ufo} alt='ufo' style={avatarStyle} /></div>
      <div><button className='button' autoFocus onClick={() => avatarSelection(1)}>{gameInfo.isSpanish ? 'Nave Galaga Retro' : 'Retro Spaceship'}</button></div>
      <div><button className='button' onClick={() => avatarSelection(2)}>Millenium Falcon / {gameInfo.isSpanish ? 'Guerra de las Galaxias' : 'Star Wars'}</button></div>
      <div><button className='button' onClick={() => avatarSelection(3)}>{gameInfo.isSpanish ? 'OVNI' : 'UFO'}</button></div>
    </Fragment>
  )
}

// Estilos para las imágenes de los avatares
const avatarStyle = {
  maxHeight: '150px',
}

export default SelectAvatar
