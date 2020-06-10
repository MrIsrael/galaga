// Función que define los valores de level, score, msInterval y bombProbability para el siguiente nivel del juego.
// Se ejecuta al final de cada nivel, cuando enemiesLeft = 0.
// Probabilidad de lanzamiento de bomba enemiga (valor entre 0 y 50: 0 = bombas siempre; 50 = ninguna bomba).

// - Cada dos o 3 niveles, debe aumentar la velocidad del juego: Los marcianos deben moverse más rápido, vertical
//  y horizontalmente. Se haría esto cambiando el valor en milisegundos del SetInterval(), en EnemyGrid.
//  Tambien la cantidad de bombas, con bombProbability.

// Selector de dificultad (rookie, trooper, berserker)

export const SetDifficulty = (currentLevel, difficultyLevel) => {
  let newIntervalDuration, newBombProbability, addToScore, newLevel, initialMsInterval = 950, initialBombProbability = 48
  addToScore = currentLevel * 1000
  newLevel = currentLevel + 1

  switch (difficultyLevel) {
    case 'rookie':
      newIntervalDuration = initialMsInterval - (currentLevel * 30)
      newBombProbability = initialBombProbability - (currentLevel * 1)
      break
    case 'trooper':
      newIntervalDuration = initialMsInterval - (currentLevel * 65)
      newBombProbability = initialBombProbability - (currentLevel * 3)
      break
    case 'berserker':
      newIntervalDuration = initialMsInterval - (currentLevel * 100)
      newBombProbability = initialBombProbability - (currentLevel * 5)
      break
    default: break
  }

  return ([newIntervalDuration, newBombProbability, addToScore, newLevel])
}
