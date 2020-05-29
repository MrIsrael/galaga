// Función que define los valores de level, score, msInterval y bombProbability para el siguiente nivel del juego.
// Se ejecuta al final de cada nivel, cuando enemiesLeft = 0.
// Probabilidad de lanzamiento de bomba enemiga (valor entre 0 y 50: 0 = bombas siempre; 50 = ninguna bomba).

// - Cada dos o 3 niveles, debe aumentar la velocidad del juego: Los marcianos deben moverse más rápido, vertical
//  y horizontalmente. Se haría esto cambiando el valor en milisegundos del SetInterval(), en EnemyGrid.
//  Tambien la cantidad de bombas, con bombProbability.

export const SetDificulty = (currentLevel) => {
  let newIntervalDuration, newBombProbability, addToScore, newLevel
  addToScore = currentLevel * 1000
  newLevel = currentLevel + 1

  switch (newLevel) {
    case 2:
      newIntervalDuration = 450     // valor original: 950
      newBombProbability = 25       // valor original: 43
      break
    // SEGUIR AQUÍ CON LOS DEMÁS NIVELES
    default: break
  }

  return ([newIntervalDuration, newBombProbability, addToScore, newLevel])
}
