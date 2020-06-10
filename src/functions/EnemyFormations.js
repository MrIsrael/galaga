// Función que determina las formaciones enemigas iniciales, teniendo en cuenta el nivel actual del juego.
// Se ejecuta apenas se carga el componente EnemyGrid.

// - Usar todos los enemigos: dos niveles por enemigo? 
// - El siguiente nivel debe empezar con una formación enemiga diferente, incluyendo uno o varios bosses nuevos.
// enemyArray[i] = { id, position, type ('joker'..., 'bullet', 'none'), remainingShots, scoreIfDestroyed }
// Enemy types: scarecrow, bane, joker --- theThing, terminator, alienQueen, predator --- bullet --- explosion, bomb --- none
// function setEnemyFormation(enemyArray, initialPos, finalPos, enemyTypeToInsert) {}
// function setIsolatedNoEnemyPlaces(enemyArray, noAlienPosArray) {}

export const EnemyFormations = (currentLevel) => {
  let setEnemyFormation1, setEnemyFormation2, setEnemyFormation3, setIsolatedNoEnemyPlaces

  switch (currentLevel) {
    case 1:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'scarecrow']
      setEnemyFormation2 = [9, 11, 'theThing']
      setEnemyFormation3 = []
      setIsolatedNoEnemyPlaces = [20,39,40,58,38,56,57,76,59,60,77,78,74,75,94,95]
      break
    case 2:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'scarecrow']
      setEnemyFormation2 = [8, 12, 'terminator']
      setEnemyFormation3 = []
      setIsolatedNoEnemyPlaces = [20,58,38,76,59,75,21,37]
      break
    case 3:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'bane']
      setEnemyFormation2 = [7, 13, 'terminator']
      setEnemyFormation3 = []
      setIsolatedNoEnemyPlaces = [20,58,38,57,76,59,60,77,78,74,95,39,75,79,80,81,91,92,93,94]
      break
    // scarecrow, bane, joker --- theThing, terminator, alienQueen, predator
    case 4:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'bane']
      setEnemyFormation2 = [4, 8, 'terminator']
      setEnemyFormation3 = [12, 16, 'theThing']
      setIsolatedNoEnemyPlaces = [1,19,10,20,58,38,29,48,67,86,76,59,77,78,75,94,95]
      break
    case 5:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'bane']
      setEnemyFormation2 = [8, 12, 'terminator']
      setEnemyFormation3 = [14, 17, 'theThing']
      setIsolatedNoEnemyPlaces = [20,58,38,56,57,76,59,60,77,78,74,95]
      break
    case 6:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'bane']
      setEnemyFormation2 = [8, 12, 'terminator']
      setEnemyFormation3 = [14, 17, 'theThing']
      setIsolatedNoEnemyPlaces = [20,58,38,56,57,76,59,60,77,78,74,95]
      break
    case 7:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'bane']
      setEnemyFormation2 = [8, 12, 'terminator']
      setEnemyFormation3 = [14, 17, 'theThing']
      setIsolatedNoEnemyPlaces = [20,58,38,56,57,76,59,60,77,78,74,95]
      break
    case 8:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'bane']
      setEnemyFormation2 = [8, 12, 'terminator']
      setEnemyFormation3 = [14, 17, 'theThing']
      setIsolatedNoEnemyPlaces = [20,58,38,56,57,76,59,60,77,78,74,95]
      break
    case 9:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'bane']
      setEnemyFormation2 = [8, 12, 'terminator']
      setEnemyFormation3 = [14, 17, 'theThing']
      setIsolatedNoEnemyPlaces = [20,58,38,56,57,76,59,60,77,78,74,95]
      break
    case 10:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'bane']
      setEnemyFormation2 = [8, 12, 'terminator']
      setEnemyFormation3 = [14, 17, 'theThing']
      setIsolatedNoEnemyPlaces = [20,58,38,56,57,76,59,60,77,78,74,95]
      break
    case 11:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'bane']
      setEnemyFormation2 = [8, 12, 'terminator']
      setEnemyFormation3 = [14, 17, 'theThing']
      setIsolatedNoEnemyPlaces = [20,58,38,56,57,76,59,60,77,78,74,95]
      break
    case 12:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'bane']
      setEnemyFormation2 = [8, 12, 'terminator']
      setEnemyFormation3 = [14, 17, 'theThing']
      setIsolatedNoEnemyPlaces = [20,58,38,56,57,76,59,60,77,78,74,95]
      break
    case 13:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'bane']
      setEnemyFormation2 = [8, 12, 'terminator']
      setEnemyFormation3 = [14, 17, 'theThing']
      setIsolatedNoEnemyPlaces = [20,58,38,56,57,76,59,60,77,78,74,95]
      break
    case 14:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'bane']
      setEnemyFormation2 = [8, 12, 'terminator']
      setEnemyFormation3 = [14, 17, 'theThing']
      setIsolatedNoEnemyPlaces = [20,58,38,56,57,76,59,60,77,78,74,95]
      break
    case 15:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'bane']
      setEnemyFormation2 = [8, 12, 'terminator']
      setEnemyFormation3 = [14, 17, 'theThing']
      setIsolatedNoEnemyPlaces = [20,58,38,56,57,76,59,60,77,78,74,95]
      break
    case 16:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'bane']
      setEnemyFormation2 = [8, 12, 'terminator']
      setEnemyFormation3 = [14, 17, 'theThing']
      setIsolatedNoEnemyPlaces = [20,58,38,56,57,76,59,60,77,78,74,95]
      break
    case 17:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'bane']
      setEnemyFormation2 = [8, 12, 'terminator']
      setEnemyFormation3 = [14, 17, 'theThing']
      setIsolatedNoEnemyPlaces = [20,58,38,56,57,76,59,60,77,78,74,95]
      break
    default: break
  }

  return ([setEnemyFormation1, setEnemyFormation2, setEnemyFormation3, setIsolatedNoEnemyPlaces])
}
