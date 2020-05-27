import React, { Fragment, useContext } from 'react'
import beso from '../../assets/kiss.jpg'

import { GlobalContext } from '../../context/GalagaState'

const Page1 = ({ changeScreen }) => {
  const { gameInfo } = useContext(GlobalContext)
  let nextScreen = changeScreen

  return (
    <Fragment>
      <div><img src={beso} alt='beso' style={instStyle} /></div>
      <div className='language-banner'>
        <h2>{gameInfo.isSpanish ? 'MÍREME A ESTA MAMASOTA!' : 'LOOK AT THIS GORGEOUS LADY!'}</h2>
        <p>{gameInfo.isSpanish ? 'Eso si es mucha cosita tan rica... todo eso es pa mi?' 
                               : 'You are so hot, mama... I cant contain myself if keep staring at you!'}</p>
      </div>
      <div><button className='button' onClick={() => nextScreen(0)}>{gameInfo.isSpanish ? 'Atrás' : 'Back'}</button></div>
      <div></div>
      <div><button className='button' onClick={() => nextScreen(2)}>{gameInfo.isSpanish ? 'Siguiente' : 'Next'}</button></div>
    </Fragment>
  )
}

// Estilos para las imágenes de las instrucciones
const instStyle = {
  maxHeight: '150px',
}

export default Page1
