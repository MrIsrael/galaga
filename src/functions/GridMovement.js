// Reglas de movimiento / creación / eliminación de EXPLOSIONES, ENEMIGOS, BOMBAS y BALAS:
// Primero se limpian las explosiones, luego se mueven los enemigos, luego las bombas, luego las balas
// enemyArray[i] = { id, position, type ('joker'..., 'bullet', 'none'), remainingShots, scoreIfDestroyed }
// Enemy types: scarecrow, bane, joker --- theThing, terminator, alienQueen, predator --- bullet --- explosion, bomb --- none

export const GridMovement = (enemyArray, intervalsElapsed) => {
  const enemyGridWidth = 19
  let wasHit = false
  let enemiesKilled = 0
  let addToScore = 0

  function setEnemy(enemyArray, pos, enemyTypeToInsert, shotsLeft, scoreIfKilled) {
    enemyArray[pos - 1] = {
      id: pos - 1,
      position: pos,
      type: enemyTypeToInsert,
      remainingShots: shotsLeft,
      scoreIfDestroyed: scoreIfKilled
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

  // Si ya había EXPLOSIONES en el tablero, deben volverse espacios vacíos:
  const t4 = enemyArray.filter(alien => alien.type === 'explosion').map(alien => alien.position)    // Array con las explosiones que hay actualmente

  for (let i=0; i < t4.length; i++) {
    setNoEnemy(enemyArray, [t4[i]])
  }

  // Movimiento HORIZONTAL de los enemigos:
  // Evaluar si un ALIENÍGENA se moverá aleatoriamente una casilla a derecha o izquierda, si se va a mover fuera del tablero, 
  // si va a moverse a un espacio vacío, si va a ocupar el lugar de otro alienígena, o si va a chocarse contra una bala o bomba,
  // verificando cuántos impactos le quedan para destruirlo.
  // Movimiento VERTICAL de los enemigos:
  // Evaluar si un ALIENÍGENA, cuando se mueva una casilla hacia abajo, si va a impactar al jugador, 
  // si va a moverse a un espacio vacío, si va a ocupar el lugar de otro alienígena, o si va a chocarse contra una bala o bomba,
  // verificando cuántos impactos le quedan para destruirlo.
  const randomMove = Math.random() >= 0.5 ? 'right' : 'left'
  const t5 = enemyArray.filter(alien => alien.type !== 'none' && alien.type !== 'bullet' &&
                               alien.type !== 'explosion' && alien.type !== 'bomb').map(alien => alien.position)

  if (intervalsElapsed % 3 === 0 && intervalsElapsed % 10 !== 0) { //  -->  Movimiento exclusivamente horizontal aleatorio de enemigos, cada 2 intervalos
    if (randomMove === 'right') {
      for (let i = t5.length - 1; i >= 0 ; i--) {
        if (t5[i] + 1 >= 191) {         //  -->  El alienígena está en la última casilla del tablero, antes de intentar moverse a la derecha;
          continue                      //  -->  en ese caso, NO mover al enemigo
        } else if (enemyArray[t5[i]].type === 'none') {
          setEnemy(enemyArray, t5[i] + 1, enemyArray[t5[i] - 1].type, enemyArray[t5[i] - 1].remainingShots, enemyArray[t5[i] - 1].scoreIfDestroyed)
          setNoEnemy(enemyArray, [t5[i]])
        } else if (enemyArray[t5[i]].type === 'bullet' && enemyArray[t5[i] - 1].remainingShots === 1) {
          enemiesKilled++
          addToScore += enemyArray[t5[i] - 1].scoreIfDestroyed
          setBulletOrExplosion(enemyArray, t5[i] + 1, 'explosion')
          setNoEnemy(enemyArray, [t5[i]])
        } else if (enemyArray[t5[i]].type === 'bomb' && enemyArray[t5[i] - 1].remainingShots === 1) {
          enemiesKilled++
          enemiesKilled++
          addToScore += enemyArray[t5[i]].scoreIfDestroyed + enemyArray[t5[i] - 1].scoreIfDestroyed
          setBulletOrExplosion(enemyArray, t5[i] + 1, 'explosion')
          setNoEnemy(enemyArray, [t5[i]])
        } else if (enemyArray[t5[i]].type === 'bullet' && enemyArray[t5[i] - 1].remainingShots > 1) {
          enemyArray[t5[i] - 1].remainingShots--
          setEnemy(enemyArray, t5[i] + 1, enemyArray[t5[i] - 1].type, enemyArray[t5[i] - 1].remainingShots, enemyArray[t5[i] - 1].scoreIfDestroyed)
          setNoEnemy(enemyArray, [t5[i]])
        } else if (enemyArray[t5[i]].type === 'bomb' && enemyArray[t5[i] - 1].remainingShots > 1) {
          enemiesKilled++
          enemyArray[t5[i] - 1].remainingShots--
          addToScore += enemyArray[t5[i]].scoreIfDestroyed
          setEnemy(enemyArray, t5[i] + 1, enemyArray[t5[i] - 1].type, enemyArray[t5[i] - 1].remainingShots, enemyArray[t5[i] - 1].scoreIfDestroyed)
          setNoEnemy(enemyArray, [t5[i]])
        }
      }
    } else { // randomMove = 'left'
      for (let i=0; i < t5.length; i++) {
        if (t5[i] - 1 === 0) {          //  -->  El alienígena está en la primera casilla del tablero, antes de intentar moverse a la izquierda;
          continue                      //  -->  en ese caso, NO mover al enemigo
        } else if (enemyArray[t5[i] - 2].type === 'none') {
          setEnemy(enemyArray, t5[i] - 1, enemyArray[t5[i] - 1].type, enemyArray[t5[i] - 1].remainingShots, enemyArray[t5[i] - 1].scoreIfDestroyed)
          setNoEnemy(enemyArray, [t5[i]])
        } else if (enemyArray[t5[i] - 2].type === 'bullet' && enemyArray[t5[i] - 1].remainingShots === 1) {
          enemiesKilled++
          addToScore += enemyArray[t5[i] - 1].scoreIfDestroyed
          setBulletOrExplosion(enemyArray, t5[i] - 1, 'explosion')
          setNoEnemy(enemyArray, [t5[i]])
        } else if (enemyArray[t5[i] - 2].type === 'bomb' && enemyArray[t5[i] - 1].remainingShots === 1) {
          enemiesKilled++
          enemiesKilled++
          addToScore += enemyArray[t5[i] - 2].scoreIfDestroyed + enemyArray[t5[i] - 1].scoreIfDestroyed
          setBulletOrExplosion(enemyArray, t5[i] - 1, 'explosion')
          setNoEnemy(enemyArray, [t5[i]])
        } else if (enemyArray[t5[i] - 2].type === 'bullet' && enemyArray[t5[i] - 1].remainingShots > 1) {
          enemyArray[t5[i] - 1].remainingShots--
          setEnemy(enemyArray, t5[i] - 1, enemyArray[t5[i] - 1].type, enemyArray[t5[i] - 1].remainingShots, enemyArray[t5[i] - 1].scoreIfDestroyed)
          setNoEnemy(enemyArray, [t5[i]])
        } else if (enemyArray[t5[i] - 2].type === 'bomb' && enemyArray[t5[i] - 1].remainingShots > 1) {
          enemiesKilled++
          enemyArray[t5[i] - 1].remainingShots--
          addToScore += enemyArray[t5[i] - 2].scoreIfDestroyed
          setEnemy(enemyArray, t5[i] - 1, enemyArray[t5[i] - 1].type, enemyArray[t5[i] - 1].remainingShots, enemyArray[t5[i] - 1].scoreIfDestroyed)
          setNoEnemy(enemyArray, [t5[i]])
        }
      }
    }
  } else if (intervalsElapsed % 10 === 0) { //  -->  Movimiento exclusivamente vertical de enemigos, cada 7 intervalos
    for (let i = t5.length - 1; i >= 0 ; i--) {
      if (t5[i] + 19 >= 191) { 
        wasHit = true                       //  -->  Un enemigo impactó al jugador! Se debe restar una vida!
        console.log('RESTAR UNA VIDA!')
        continue
      } else if (enemyArray[t5[i] - 1 + 19].type === 'none') {
        setEnemy(enemyArray, t5[i] + 19, enemyArray[t5[i] - 1].type, enemyArray[t5[i] - 1].remainingShots, enemyArray[t5[i] - 1].scoreIfDestroyed)
        setNoEnemy(enemyArray, [t5[i]])
      } else if (enemyArray[t5[i] - 1 + 19].type === 'bullet' && enemyArray[t5[i] - 1].remainingShots === 1) {
        enemiesKilled++
        addToScore += enemyArray[t5[i] - 1].scoreIfDestroyed
        setBulletOrExplosion(enemyArray, t5[i] + 19, 'explosion')
        setNoEnemy(enemyArray, [t5[i]])
      } else if (enemyArray[t5[i] - 1 + 19].type === 'bomb' && enemyArray[t5[i] - 1].remainingShots === 1) {
        enemiesKilled++
        enemiesKilled++
        addToScore += enemyArray[t5[i] - 1 + 19].scoreIfDestroyed + enemyArray[t5[i] - 1].scoreIfDestroyed
        setBulletOrExplosion(enemyArray, t5[i] + 19, 'explosion')
        setNoEnemy(enemyArray, [t5[i]])
      } else if (enemyArray[t5[i] - 1 + 19].type === 'bullet' && enemyArray[t5[i] - 1].remainingShots > 1) {
        enemyArray[t5[i] - 1].remainingShots--
        setEnemy(enemyArray, t5[i] + 19, enemyArray[t5[i] - 1].type, enemyArray[t5[i] - 1].remainingShots, enemyArray[t5[i] - 1].scoreIfDestroyed)
        setNoEnemy(enemyArray, [t5[i]])
      } else if (enemyArray[t5[i] - 1 + 19].type === 'bomb' && enemyArray[t5[i] - 1].remainingShots > 1) {
        enemiesKilled++
        enemyArray[t5[i] - 1].remainingShots--
        addToScore += enemyArray[t5[i] - 1 + 19].scoreIfDestroyed
        setEnemy(enemyArray, t5[i] + 19, enemyArray[t5[i] - 1].type, enemyArray[t5[i] - 1].remainingShots, enemyArray[t5[i] - 1].scoreIfDestroyed)
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
    } else if (enemyArray[t3[i] - 1].type === 'bomb' || enemyArray[t3[i] - 1].remainingShots === 1) {
      enemiesKilled++
      addToScore += enemyArray[t3[i] - 1].scoreIfDestroyed
      setBulletOrExplosion(enemyArray, t3[i], 'explosion')
      setNoEnemy(enemyArray, [t2[i]])
    } else if (enemyArray[t3[i] - 1].remainingShots > 1) {
      enemyArray[t3[i] - 1].remainingShots--
      setNoEnemy(enemyArray, [t2[i]])
    }
  }

  return ([enemyArray, wasHit, enemiesKilled, addToScore])
}