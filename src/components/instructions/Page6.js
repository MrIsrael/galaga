import React, { Fragment, useContext } from 'react'
import inst_image from '../../assets/images/instructions/inst_page_6.png'

import { GlobalContext } from '../../context/GalagaState'
import { AudioLibrary } from '../../functions/AudioLibrary'

const Page6 = ({ changeScreen }) => {
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
        <h3>{gameInfo.isSpanish ? 'BOMBAS' : 'BOMBS'}</h3>
        <p>{gameInfo.isSpanish ? 'El jugador puede también ser destruido por las bombas lanzadas aleatoriamente por los enemigos.' 
                               : 'Player can also be destroyed by bombs fired randomly from enemy lines.'}</p>
        <p>{gameInfo.isSpanish ? 'La bomba irá cayendo hacia el jugador, y si lo impacta antes de poder dispararle, lo destruirá.' 
                               : "Bomb will fall towards player's platform, and if hits him before receive a bullet in response, player dies."}</p>
        <p>{gameInfo.isSpanish ? 'Si un enemigo se atraviesa en la trayectoria de caída de una bomba, ambos explotarán.' 
                               : "If an enemy crosses through bomb's trajectory, both explode."}</p>
        <p>{gameInfo.isSpanish ? 'El avatar del jugador puede moverse más rápido que las bombas. Si ve una cayendo, apresúrese a dispararle!' 
                               : "Player's avatar can move faster than bombs. If you see some of these, hurry and shoot them!"}</p>
      </div>
      <div><button className='button' onClick={() => moveTo(5)}>{gameInfo.isSpanish ? 'ATRÁS' : 'BACK'}</button></div>
      <div><button className='button' onClick={() => moveTo(0)}>{gameInfo.isSpanish ? 'MENÚ PRINCIPAL' : 'MAIN MENU'}</button></div>
      <div><button className='button' autoFocus onClick={() => moveTo(7)}>{gameInfo.isSpanish ? 'A PÁG 7 (DE 9)' : 'TO PAGE 7 / 9'}</button></div>
    </Fragment>
  )
}

// Estilos para las imágenes de las instrucciones
const instStyle = {
  maxHeight: '300px',
  border: 'dotted 1px white',
}

export default Page6
