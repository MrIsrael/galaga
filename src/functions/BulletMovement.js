// Reglas de movimiento de una BALA:

export const BulletMovement = (enemyArray) => {
  const enemyGridWidth = 19

  function setNoEnemy(enemyArray, noAlienPosArray) {
    for (let i=0; i < enemyGridWidth * 10; i++) {
      if (noAlienPosArray.some(pos => pos === enemyArray[i].position)) { 
        enemyArray[i].type = 'none'
        enemyArray[i].remainingShots = 0
        enemyArray[i].scoreIfDestroyed = 0
      }
    }
  }

  function setBulletOrExplosion(enemyArray, position, item) {
    enemyArray[position - 1].type = item
    enemyArray[position - 1].remainingShots = 0
    enemyArray[position - 1].scoreIfDestroyed = 0
  }

  const t1 = enemyArray.filter(alien => alien.type === 'bullet')      // Array con las balas que hay actualmente
  // console.log(t1)
  const t2 = t1.map(alien => alien.position)                          // Array con las posiciones de balas que hay actualmente
  // console.log(t2)
  const t3 = t2.map(pos => pos - 19)                                  // Array con las posiciones donde las balas que hay actualmente, se moverán a continuación
  // console.log(t3)

  // Evaluar si la BALA se va a mover fuera del tablero, si va a moverse a un espacio vacío o donde hay una explosión,
  // o si va a impactar una bomba o un enemigo, verificando cuántos impactos le quedan para destruirlo:
  for (let i=0; i < t3.length; i++) {
    if (t3[i] <= 0) {
      setNoEnemy(enemyArray, [t2[i]])
      // continue
    } else if (enemyArray[t3[i] - 1].type === 'none' || enemyArray[t3[i] - 1].type === 'explosion') {
      setBulletOrExplosion(enemyArray, t3[i], 'bullet')
      setNoEnemy(enemyArray, [t2[i]])
    } else if (enemyArray[t3[i] - 1].type !== 'explosion' && enemyArray[t3[i] - 1].remainingShots > 1) {
      enemyArray[t3[i] - 1].remainingShots--
      setNoEnemy(enemyArray, [t2[i]])
    } else if (enemyArray[t3[i] - 1].type !== 'explosion' && enemyArray[t3[i] - 1].remainingShots === 1) {
      setBulletOrExplosion(enemyArray, t3[i], 'explosion')
      setNoEnemy(enemyArray, [t2[i]])
    }
  }

  return (enemyArray)
}

// enemyArray[i] = { id, position, type ('joker'..., 'bullet', 'none'), remainingShots, scoreIfDestroyed }
// Enemy types: scarecrow, bane, joker --- theThing, terminator, alienQueen, predator --- bullet --- explosion, bomb --- none