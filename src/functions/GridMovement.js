// Reglas de movimiento / creación / eliminación de EXPLOSIONES, ENEMIGOS, BOMBAS y BALAS:
// Primero se limpian las explosiones, luego se mueven los enemigos, luego las bombas, luego las balas
// enemyArray[i] = { id, position, type ('joker'..., 'bullet', 'none'), remainingShots, scoreIfDestroyed }
// Enemy types: scarecrow, bane, joker --- theThing, terminator, alienQueen, predator --- bullet --- explosion, bomb --- none

export const GridMovement = (enemyArray, secondsElapsed) => {
  const enemyGridWidth = 19

  function setEnemy(enemyArray, pos, enemyTypeToInsert) {
    enemyArray[pos - 1] = {
      id: pos - 1,
      position: pos,
      type: enemyTypeToInsert,
    }
    switch (enemyTypeToInsert) {     
      case 'scarecrow':
        enemyArray[pos - 1].remainingShots = 1
        enemyArray[pos - 1].scoreIfDestroyed = 100
        break
      case 'bane':
        enemyArray[pos - 1].remainingShots = 3
        enemyArray[pos - 1].scoreIfDestroyed = 300
        break
      case 'joker':
        enemyArray[pos - 1].remainingShots = 5
        enemyArray[pos - 1].scoreIfDestroyed = 500
        break
      case 'theThing':
        enemyArray[pos - 1].remainingShots = 10
        enemyArray[pos - 1].scoreIfDestroyed = 5000
        break
      case 'terminator':
        enemyArray[pos - 1].remainingShots = 15
        enemyArray[pos - 1].scoreIfDestroyed = 7500
        break
      case 'alienQueen':
        enemyArray[pos - 1].remainingShots = 5                    // Valor original = 25
        enemyArray[pos - 1].scoreIfDestroyed = 12500
        break
      case 'predator':
        enemyArray[pos - 1].remainingShots = 35
        enemyArray[pos - 1].scoreIfDestroyed = 30000
        break
      default: break
    }
  }

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

  // Si ya había explosiones en el tablero, deben volverse espacios vacíos
  const t4 = enemyArray.filter(alien => alien.type === 'explosion').map(alien => alien.position)   // Array con las explosiones que hay actualmente

  for (let i=0; i < t4.length; i++) {
    setNoEnemy(enemyArray, [t4[i]])
  }

  // Movimiento horizontal de los enemigos:
  // Evaluar si un ALIENÍGENA se moverá aleatoriamente una casilla a derecha o izquierda, si se va a mover fuera del tablero, 
  // si va a moverse a un espacio vacío, si va a ocupar el lugar de otro alienígena, o si va a chocarse contra una bala o bomba,
  // verificando cuántos impactos le quedan para destruirlo:
  const randomMove = Math.random() >= 0.5 ? 'right' : 'left'
  const t5 = enemyArray.filter(alien => alien.type !== 'none' && alien.type !== 'bullet' &&
                               alien.type !== 'explosion' && alien.type !== 'bomb').map(alien => alien.position)
  
  if (randomMove === 'right') {
    for (let i = t5.length - 1; i >= 0 ; i--) {
      if (t5[i] + 1 >= 191) { 
        setEnemy(enemyArray, 1, enemyArray[t5[i] - 1].type)
        setNoEnemy(enemyArray, [t5[i]])
      } else if (enemyArray[t5[i]].type === 'none') {
        setEnemy(enemyArray, t5[i] + 1, enemyArray[t5[i] - 1].type)
        setNoEnemy(enemyArray, [t5[i]])
      } else if ((enemyArray[t5[i]].type === 'bullet' || enemyArray[t5[i]].type === 'bomb') && enemyArray[t5[i] - 1].remainingShots === 1) {
        setBulletOrExplosion(enemyArray, t5[i] + 1, 'explosion')
        setNoEnemy(enemyArray, [t5[i]])
      } else if ((enemyArray[t5[i]].type === 'bullet' || enemyArray[t5[i]].type === 'bomb') && enemyArray[t5[i] - 1].remainingShots > 1) {
        enemyArray[t5[i] - 1].remainingShots--
        setEnemy(enemyArray, t5[i] + 1, enemyArray[t5[i] - 1].type)
        setNoEnemy(enemyArray, [t5[i]])
      }
    }
  } else { // randomMove = 'left'
    for (let i=0; i < t5.length; i++) {
      if (t5[i] - 1 === 0) { 
        // setEnemy(enemyArray, 133, enemyArray[t5[i] - 1].type)
        // setNoEnemy(enemyArray, [t5[i]])
        continue
      } else if (enemyArray[t5[i] - 2].type === 'none') {
        setEnemy(enemyArray, t5[i] - 1, enemyArray[t5[i] - 1].type)
        setNoEnemy(enemyArray, [t5[i]])
      } else if ((enemyArray[t5[i] - 2].type === 'bullet' || enemyArray[t5[i] - 2].type === 'bomb') && enemyArray[t5[i] - 1].remainingShots === 1) {
        setBulletOrExplosion(enemyArray, t5[i] - 1, 'explosion')
        setNoEnemy(enemyArray, [t5[i]])
      } else if ((enemyArray[t5[i] - 2].type === 'bullet' || enemyArray[t5[i] - 2].type === 'bomb') && enemyArray[t5[i] - 1].remainingShots > 1) {
        enemyArray[t5[i] - 1].remainingShots--
        setEnemy(enemyArray, t5[i] - 1, enemyArray[t5[i] - 1].type)
        setNoEnemy(enemyArray, [t5[i]])
      }
    }
  }

  // Evaluar si la BALA se va a mover fuera del tablero, si va a moverse a un espacio vacío,
  // o si va a impactar una bomba o un enemigo, verificando cuántos impactos le quedan para destruirlo:
  const t1 = enemyArray.filter(alien => alien.type === 'bullet')      // Array con las balas que hay actualmente
  const t2 = t1.map(alien => alien.position)                          // Array con las posiciones de balas que hay actualmente
  const t3 = t2.map(pos => pos - 19)                                  // Array con las posiciones donde las balas que hay actualmente, se moverán a continuación

  for (let i=0; i < t3.length; i++) {
    if (t3[i] <= 0) {
      setNoEnemy(enemyArray, [t2[i]])
    } else if (enemyArray[t3[i] - 1].type === 'none') {
      setBulletOrExplosion(enemyArray, t3[i], 'bullet')
      setNoEnemy(enemyArray, [t2[i]])
    } else if (enemyArray[t3[i] - 1].type !== 'bomb' || enemyArray[t3[i] - 1].remainingShots === 1) {
      setBulletOrExplosion(enemyArray, t3[i], 'explosion')
      setNoEnemy(enemyArray, [t2[i]])
    } else if (enemyArray[t3[i] - 1].remainingShots > 1) {
      enemyArray[t3[i] - 1].remainingShots--
      setNoEnemy(enemyArray, [t2[i]])
    }
  }

  return (enemyArray)
}