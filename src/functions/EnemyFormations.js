// - Si el jugador termina un nivel (elimina a todos los enemigos), debe aparecer un mensaje (en la status bar? 
//   en el centro de la game grid, encima de todo?) que avise del cambio de nivel. Se incrementa también el contador
//   de nivel. Debería haber un puntaje extra por esto.
// - Usar todos los enemigos: dos niveles por enemigo? 
// - El siguiente nivel debe empezar con una formación enemiga diferente, incluyendo uno o varios bosses nuevos.
// - Cada dos o 3 niveles, debe aumentar la velocidad del juego: Los marcianos deben moverse más rápido, vertical
//   y horizontalmente. Se haría esto cambiando el valor en milisegundos del SetInterval(), en EnemyGrid.
//   Tambien la cantidad de bombas, con bombProbability.

// Función que determina las formaciones enemigas iniciales, teniendo en cuenta el nivel actual del juego.
// Se ejecuta apenas se carga el componente EnemyGrid.
// Define también cuánto deben durar los intervalos de tiempo del juego (valor en milisegundos), así como la probabilidad 
// de lanzamiento de bomba por parte de los enemigos (valor entre 0 y 50: 0 = bombas siempre; 50 = ninguna bomba).

// enemyArray[i] = { id, position, type ('joker'..., 'bullet', 'none'), remainingShots, scoreIfDestroyed }
// Enemy types: scarecrow, bane, joker --- theThing, terminator, alienQueen, predator --- bullet --- explosion, bomb --- none
// function setEnemyFormation(enemyArray, initialPos, finalPos, enemyTypeToInsert) {}
// function setIsolatedNoEnemyPlaces(enemyArray, noAlienPosArray) {}

export const EnemyFormations = (currentLevel) => {
  let setEnemyFormation1, setEnemyFormation2, setIsolatedNoEnemyPlaces1, newIntervalDuration, newBombProbability

  switch (currentLevel) {
    case 1:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'scarecrow']
      setEnemyFormation2 = [9, 11, 'theThing']
      setIsolatedNoEnemyPlaces1 = [20,39,40,58,38,56,57,76,59,60,77,78,74,75,94,95]
      newIntervalDuration = 1000
      newBombProbability = 45
      break
    // SEGUIR AQUÍ CON LOS DEMÁS NIVELES
    default: break
  }

  return ([setEnemyFormation1, setEnemyFormation2, setIsolatedNoEnemyPlaces1, newIntervalDuration, newBombProbability])
}
