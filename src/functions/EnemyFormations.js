// Función que determina las formaciones enemigas iniciales, teniendo en cuenta el nivel actual del juego.
// Se ejecuta apenas se carga el componente EnemyGrid.

// - Usar todos los enemigos: dos niveles por enemigo? 
// - El siguiente nivel debe empezar con una formación enemiga diferente, incluyendo uno o varios bosses nuevos.
// enemyArray[i] = { id, position, type ('joker'..., 'bullet', 'none'), remainingShots, scoreIfDestroyed }
// Enemy types: scarecrow, bane, joker --- theThing, terminator, alienQueen, predator --- bullet --- explosion, bomb --- none
// function setEnemyFormation(enemyArray, initialPos, finalPos, enemyTypeToInsert) {}
// function setIsolatedNoEnemyPlaces(enemyArray, noAlienPosArray) {}

export const EnemyFormations = (currentLevel) => {
  let setEnemyFormation1, setEnemyFormation2, setIsolatedNoEnemyPlaces

  switch (currentLevel) {
    case 1:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'scarecrow']
      setEnemyFormation2 = [9, 11, 'theThing']
      setIsolatedNoEnemyPlaces = [20,39,40,58,38,56,57,76,59,60,77,78,74,75,94,95]
      break
    case 2:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'bane']
      setEnemyFormation2 = [8, 12, 'terminator']
      setIsolatedNoEnemyPlaces = [20,58,38,56,57,76,59,60,77,78,74,95]
      break
    // SEGUIR AQUÍ CON LOS DEMÁS NIVELES
    default: break
  }

  return ([setEnemyFormation1, setEnemyFormation2, setIsolatedNoEnemyPlaces])
}
