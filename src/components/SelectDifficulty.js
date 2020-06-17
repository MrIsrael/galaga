import React, { Fragment, useContext } from 'react'
import baby from '../assets/images/difficulties/baby.gif'
import stormtrooper from '../assets/images/difficulties/stormtrooper.gif'
import berserk from '../assets/images/difficulties/berserk.gif'

import { GlobalContext } from '../context/GalagaState'
import { AudioLibrary } from '../functions/AudioLibrary'

const SelectDifficulty = ({ changeScreen }) => {
  const { gameInfo, chooseDifficulty } = useContext(GlobalContext)
  let nextScreen = changeScreen
 
  function diffSelection(diff) {
    chooseDifficulty(diff)
    AudioLibrary('click')
    nextScreen(0)
  }

  return (
    <Fragment>
      <div><img src={baby} alt='baby' style={diffStyle} /></div>
      <div><img src={stormtrooper} alt='stormtrooper' style={diffStyle} /></div>
      <div><img src={berserk} alt='berserk' style={diffStyle} /></div>
      <div><button className='button' onClick={() => diffSelection('rookie')}>{gameInfo.isSpanish ? 'No me hagas daño!' : 'Don´t hurt me, please!'}</button></div>
      <div><button className='button' autoFocus onClick={() => diffSelection('trooper')}>{gameInfo.isSpanish ? 'Tomémoslo con calma...' : 'Take it easy...'}</button></div>
      <div><button className='button' onClick={() => diffSelection('berserker')}>{gameInfo.isSpanish ? 'MUERTE INMINENTE!' : 'IMMINENT DEATH!'}</button></div>
    </Fragment>
  )
}

// Estilos para las imágenes de los avatares
const diffStyle = {
  maxHeight: '150px',
}

export default SelectDifficulty
