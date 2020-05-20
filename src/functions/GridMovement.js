// Reglas de movimiento / aparición / eliminación de EXPLOSIONES, ENEMIGOS, BOMBAS y BALAS:
// Primero se limpian las explosiones, luego se mueven los enemigos, luego las bombas, luego las balas
// enemyArray[i] = { id, position, type ('joker'..., 'bullet', 'none'), remainingShots, scoreIfDestroyed }
// Enemy types: scarecrow, bane, joker --- theThing, terminator, alienQueen, predator --- bullet --- explosion, bomb --- none

export const GridMovement = (enemyArray, intervalsElapsed, bombProbability) => {
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
  const t4 = enemyArray.filter(alien => alien.type === 'explosion').map(explosion => explosion.position)    // Array con las explosiones que hay actualmente

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

  if (intervalsElapsed % 3 === 0 && intervalsElapsed % 20 !== 0) { //  -->  Movimiento exclusivamente horizontal aleatorio de enemigos, cada 3 intervalos
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
  } else if (intervalsElapsed % 20 === 0) { //  -->  Movimiento exclusivamente vertical de enemigos, cada 20 intervalos
    for (let i = t5.length - 1; i >= 0 ; i--) {
      if (t5[i] + 19 >= 191) { 
        wasHit = true                       //  -->  Un enemigo impactó al jugador! Se debe restar una vida!
        console.log('RESTAR UNA VIDA!')
        setNoEnemy(enemyArray, [t5[i]])
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

  // Evaluar si la BOMBA, al moverse una casilla hacia abajo, va a impactar al jugador, o va a moverse a un espacio vacío,
  // o va a chocarse contra una bala, o si va a impactar a un enemigo, verificando cuántos impactos le quedan para destruirlo.
  // Solo deberían poder disparar bombas aquellos enemigos que no tuvieran otros enemigos debajo; además, podría disparar una 
  // bomba cualquier enemigo que cumpla la condición anterior, aleatoriamente.

  // Mover las BOMBAS que ya haya en el tablero, una casilla hacia abajo por cada intervalo, verificando contra qué se chocarán.
  const t9 = enemyArray.filter(alien => alien.type === 'bomb').map(bomb => bomb.position)    // Array con las bombas que hay actualmente

  for (let i = t9.length - 1; i >= 0 ; i--) {
    if (t9[i] + 19 >= 191) { 
      wasHit = true                       //  -->  Una bomba impactó al jugador! Se debe restar una vida!
      console.log('RESTAR UNA VIDA!')
      setNoEnemy(enemyArray, [t9[i]])
      continue
    } else if (enemyArray[t9[i] - 1 + 19].type === 'none') {
      setEnemy(enemyArray, t9[i] + 19, enemyArray[t9[i] - 1].type, enemyArray[t9[i] - 1].remainingShots, enemyArray[t9[i] - 1].scoreIfDestroyed)
      setNoEnemy(enemyArray, [t9[i]])
    } else if (enemyArray[t9[i] - 1 + 19].type === 'bullet') {
      enemiesKilled++
      addToScore += enemyArray[t9[i] - 1].scoreIfDestroyed
      setBulletOrExplosion(enemyArray, t9[i] + 19, 'explosion')
      setNoEnemy(enemyArray, [t9[i]])
    } else if (enemyArray[t9[i] - 1 + 19].type === 'bomb' || enemyArray[t9[i] - 1 + 19].remainingShots === 1) {
      enemiesKilled++
      enemiesKilled++
      addToScore += enemyArray[t9[i] - 1 + 19].scoreIfDestroyed + enemyArray[t9[i] - 1].scoreIfDestroyed
      setBulletOrExplosion(enemyArray, t9[i] + 19, 'explosion')
      setNoEnemy(enemyArray, [t9[i]])
    } else if (enemyArray[t9[i] - 1 + 19].remainingShots > 1) {
      enemyArray[t9[i] - 1 + 19].remainingShots--
      setNoEnemy(enemyArray, [t9[i]])
    }
  }
  
  // Crear un arreglo (t7[]) con aquellos enemigos que no tengan otros enemigos debajo, y que estén al menos dos filas por encima 
  // del jugador, y puedan, por consiguiente, disparar una bomba:
  const t10 = enemyArray.filter(alien => alien.type !== 'none' && alien.type !== 'bullet' &&
                                alien.type !== 'explosion' && alien.type !== 'bomb').map(alien => alien.position)

  let t6 = [], t7 = []
  for (let i = t10.length - 1; i >= 0 ; i--) {
    if (t10[i] < 153) {
      for (let x = t10[i] + 19; x < 191 ; x += 19) { t6.unshift(t10.some(pos => pos === x)) }
      if (t6.some(any => any === true) === false) { t7.unshift(t10[i]) }
      t6 = []
    }
  }

  // DISPARO ALEATORIO DE UNA BOMBA --> Puede que haya o no un disparo, y si lo hay, quien dispare puede ser cualquiera de los enemigos que indique t7[]:
  const t8 = Math.floor(Math.random() * t7.length)
  if ((Math.random() * 50) > bombProbability) { 
    setEnemy(enemyArray, t7[t8] + 19, 'bomb', 1, 250)
  }

  // Evaluar si la BALA se va a mover fuera del tablero, si va a moverse a un espacio vacío,
  // o si va a impactar una bomba o un enemigo, verificando cuántos impactos le quedan para destruirlo:
  const t1 = enemyArray.filter(alien => alien.type === 'bullet')      // Array con las balas que hay actualmente
  const t2 = t1.map(bullet => bullet.position)                        // Array con las posiciones de balas que hay actualmente
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

  // console.log(enemyArray.filter(alien => alien.type !== 'none' && alien.type !== 'bullet' && alien.type !== 'explosion').map(alien => alien.position))

  return ([enemyArray, wasHit, enemiesKilled, addToScore])
}