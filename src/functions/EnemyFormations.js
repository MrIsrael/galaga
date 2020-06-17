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
    case 13:
        setEnemyFormation1 = [1, ((19 * 10) / 2), 'scarecrow']
        setEnemyFormation2 = [7, 13, 'bane']
        setEnemyFormation3 = []
        setIsolatedNoEnemyPlaces = [20,39,40,58,38,56,57,76,59,60,77,78,74,75,79,80,92,93,94,95]
        break
    case 2:
    case 14:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'scarecrow']
      setEnemyFormation2 = [20, 38, 'bane']
      setEnemyFormation3 = []
      setIsolatedNoEnemyPlaces = [20,58,38,76,59,75,21,37,39,40,56,57]
      break
    case 3:
    case 15:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'scarecrow']
      setEnemyFormation2 = [9, 11, 'theThing']
      setEnemyFormation3 = []
      setIsolatedNoEnemyPlaces = [20,39,40,58,38,56,57,76,59,60,77,78,74,75,94,95]
      break
    case 4:
    case 16:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'scarecrow']
      setEnemyFormation2 = [8, 12, 'terminator']
      setEnemyFormation3 = []
      setIsolatedNoEnemyPlaces = [20,58,38,76,59,75,21,37]
      break
    case 5:
    case 17:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'bane']
      setEnemyFormation2 = [7, 13, 'terminator']
      setEnemyFormation3 = []
      setIsolatedNoEnemyPlaces = [20,58,38,57,76,59,60,77,78,74,95,39,75,79,80,81,91,92,93,94]
      break
    case 6:
    case 18:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'bane']
      setEnemyFormation2 = [4, 8, 'terminator']
      setEnemyFormation3 = [12, 16, 'theThing']
      setIsolatedNoEnemyPlaces = [1,19,10,20,58,38,29,48,67,86,76,59,77,78,75,94,95]
      break
    case 7:
    case 19:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'joker']
      setEnemyFormation2 = [7, 13, 'terminator']
      setEnemyFormation3 = [28, 30, 'theThing']
      setIsolatedNoEnemyPlaces = [20,21,22,23,35,36,37,58,38,61,73,75,59,60,73,74,76]
      break
    case 8:
    case 20:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'joker']
      setEnemyFormation2 = [7, 13, 'terminator']
      setEnemyFormation3 = [46, 50, 'theThing']
      setIsolatedNoEnemyPlaces = [20,38,56,57,76,58,76,21,22,36,37,39,40]
      break
    case 9:
    case 21:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'bane']
      setEnemyFormation2 = [8, 12, 'alienQueen']
      setEnemyFormation3 = [45, 51, 'terminator']
      setIsolatedNoEnemyPlaces = [22,23,24,34,35,36,41,43,53,55,60,61,62,72,73,74]
      break
    case 10:
    case 22:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'joker']
      setEnemyFormation2 = [6, 14, 'alienQueen']
      setEnemyFormation3 = [64, 70, 'theThing']
      setIsolatedNoEnemyPlaces = [41,42,43,44,45,46,47,48,49,50,51,52,53,54,55]
      break
    case 11:
    case 23:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'joker']
      setEnemyFormation2 = [8, 12, 'predator']
      setEnemyFormation3 = [46, 50, 'alienQueen']
      setIsolatedNoEnemyPlaces = [22,23,24,34,36,42,53,55,60,61,62,72,73,74]
      break
    case 12:
    case 24:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'joker']
      setEnemyFormation2 = [1, 19, 'predator']
      setEnemyFormation3 = [39, 57, 'alienQueen']
      setIsolatedNoEnemyPlaces = [2,22,42,24,6,61,80,14,33,52,71,90,53,35,17,73,93]
      break
    default:
      setEnemyFormation1 = [1, ((19 * 10) / 2), 'joker']
      setEnemyFormation2 = [8, 12, 'predator']
      setEnemyFormation3 = [46, 50, 'alienQueen']
      setIsolatedNoEnemyPlaces = [22,23,24,34,36,42,53,55,60,61,62,72,73,74]
      break
  }

  return ([setEnemyFormation1, setEnemyFormation2, setEnemyFormation3, setIsolatedNoEnemyPlaces])
}
