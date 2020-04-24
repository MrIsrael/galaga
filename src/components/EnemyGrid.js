import React, { Fragment } from 'react'
import enemy from '../assets/images/enemy.png'

let enemyPos = new Array(19)

for (let i=0; i<19; i++) {
  enemyPos[i] = i + 1
}

const EnemyGrid = () => {
  return (
    <Fragment>
      {enemyPos.map(pos => <div className='enemy' key={pos}>
                              <img src={enemy} alt='space-ship' style={enemyShipStyle} />
                              <br />
                              {pos}
                            </div>
                    )}
    </Fragment>
  )
}

// Estilos para la imagen del enemigo
const enemyShipStyle = {
  // maxHeight: '30px',
  maxWidth: '33px',
  backgroundColor: 'transparent',   // REVISAR CÓMO SE PONE FONDO TRANSPARENTE A UNA IMAGEN PNG...
  paddingTop: '8px',
}

export default EnemyGrid