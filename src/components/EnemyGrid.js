import React, { Fragment, useState, useContext, useEffect } from 'react'
import scarecrow from '../assets/images/enemies/enemy1.gif'
import bane from '../assets/images/enemies/enemy3.gif'
import joker from '../assets/images/enemies/enemy2.gif'
import theThing from '../assets/images/enemies/boss1.gif'
import terminator from '../assets/images/enemies/boss2.gif'
import alienQueen from '../assets/images/enemies/boss3.gif'
import predator from '../assets/images/enemies/boss4.gif'
import bullet from '../assets/images/ammo/bullet.png'
import explosion from '../assets/images/ammo/explosion.gif'
import bomb from '../assets/images/ammo/bomb.gif'

import { GlobalContext } from '../context/GalagaState'
import { GridMovement } from '../functions/GridMovement'            // Contiene toda la lógica de movimiento en el tablero enemigo, cálculo de puntaje, vidas restantes, etc
import { EnemyFormations } from '../functions/EnemyFormations'      // Determina las formaciones enemigas iniciales y demás configuraciones de cada nivel, cuando éste comience
import { AudioLibrary } from '../functions/AudioLibrary'

const EnemyGrid = ({ changeScreen }) => {
  const { gameInfo, enemyInfo, playerInfo, initializeEnemyFormation, initializePlayerPos, setIntervalsElapsed, 
          updateBattleground, updateScore, pauseGame, turnOnMovement, decreaseCountdown } = useContext(GlobalContext)
  // Flag que permite movimiento del juego sólo cada vez que transcurra 1 intervalo de tiempo definido por msInterval;
  // de lo contrario, habría un loop infinito de re-renders y React estallaría!
  const [flag, setFlag] = useState(false)
  const [lock, setLock] = useState(false)
  const [goOut, setGoOut] = useState(false)
  const [playerDown, setPlayerDown] = useState(false)
  let nextScreen = changeScreen
  
  // Emular comportamiento de la lifecycle function componentDidMount(), para disparar generador ininterrumpido de intervalos de tiempo,
  // apenas cargue el componente --> Ejecución constante
  useEffect(() => {
    if (gameInfo.soundsOn) { 
      AudioLibrary('any_music_off')
      AudioLibrary('battleground')
    }
    let timer = setInterval(() => { setFlag(true) }, gameInfo.msInterval)
    return () => {                                                            // Cleanup function para el hook useEffect. Emula el comportamiento
      clearInterval(timer)                                                    // de componentWillUnmount(), para detener correctamente el timer.
      if (gameInfo.soundsOn) { AudioLibrary('any_music_off') }
    }
    // eslint-disable-next-line
  }, [])                                                                      // La función cleanup funciona solamente si el 2o parámetro de useEffect es '[]' (vacío)

  // Si el jugador es impactado por un alienígena o una bomba, y sólo le quedaba 1 vida: GAME OVER! --> Última ejecución, 1 sola vez
  if (!goOut && !gameInfo.pausedGame && gameInfo.lives === 0) {
    setFlag(false)
    setGoOut(true)
    nextScreen(-5)
  }

  // Posicionamiento de formación enemiga inicial y niveles subsiguientes: --> Primera ejecución, 1 sola vez, apenas cargue el componente
  // levelConfig = [setEnemyFormation1, setEnemyFormation2, setIsolatedNoEnemyPlaces1]
  if (!lock && gameInfo.pausedGame && gameInfo.levelJustStarted && gameInfo.initialCountdown === 5) {
    setFlag(false)
    setLock(true)
    const levelConfig = EnemyFormations(gameInfo.level)
    initializeEnemyFormation(enemyInfo, levelConfig[0], levelConfig[1], levelConfig[2], levelConfig[3])
    initializePlayerPos(playerInfo)
    console.log('msInterval = ' + gameInfo.msInterval)
    console.log('bombProbability = ' + gameInfo.bombProbability)
  }
  
  // Animación temporizada de inicio de nivel o reanudación del juego después de perder una vida: --> Segunda ejecución, 5 veces
  if (flag && !gameInfo.pausedGame && gameInfo.levelJustStarted) {
    setFlag(false)
    setPlayerDown(false)
    gameInfo.initialCountdown === 0 ? turnOnMovement() : decreaseCountdown(1)
  }

  // Condición imprescindible para que haya movimiento automático de elementos en el tablero de juego: --> Ejecución constante
  if (flag && !gameInfo.pausedGame && !gameInfo.levelJustStarted && !gameInfo.playerWasHit) {
    setFlag(false)
    setIntervalsElapsed(1)
    const updatedGrid = GridMovement(enemyInfo, gameInfo.timeElapsed, gameInfo.bombProbability, gameInfo.soundsOn)
    updateBattleground(updatedGrid[0])                                                            // (enemyArray)
    updateScore(updatedGrid[1], updatedGrid[2], updatedGrid[3])                                   // (wasHit, enemiesKilled, addToScore)
    // console.log('timeElapsed = ' + gameInfo.timeElapsed)
  }

  // Si el jugador es impactado por un alienígena o una bomba: --> Ejecución eventual
  if (flag && !playerDown && gameInfo.playerWasHit && gameInfo.lives > 0) {
    setFlag(false)
    setPlayerDown(true)
    gameInfo.lives === 1 ? pauseGame((gameInfo.isSpanish ? 'Perdiste! Enter para continuar' : 'You lose! Press Enter to continue'), 
                                     (gameInfo.isSpanish ? 'NAVE DESTRUÍDA!' : 'GAME OVER!'))
                         : pauseGame((gameInfo.isSpanish ? 'Nave caída! Enter para continuar' : 'Enemy won! Press Enter to continue'), 
                                     (gameInfo.isSpanish ? 'NAVE IMPACTADA!' : 'PLAYER DOWN!'))
    if (gameInfo.soundsOn) { AudioLibrary('any_sound_off') }
    if (gameInfo.soundsOn) { AudioLibrary('player_explosion') }
    if (gameInfo.soundsOn) { AudioLibrary('pauseMusic') }
  }

  // Si todos los enemigos son eliminados y hay cambio de nivel: --> Ejecución eventual
  if (flag && !gameInfo.levelJustStarted && gameInfo.enemiesLeft === 0) {
    setFlag(false)
    setLock(false)
    nextScreen(-4)
  }

  return (
    <Fragment>
      {enemyInfo.map(alien => <div className='enemy' key={alien.id}>
                                {/* alien.id */}
                                {alien.type === 'bullet' && <img src={bullet} alt='bullet' style={alienStyle} />}
                                {alien.type === 'none' && <div style={alienStyle}></div>}
                                {/* alien.type === 'none' && <div style={emptyAlienStyle}>NO ENEMY</div> */}
                                {alien.type === 'explosion' && <img src={explosion} alt='explosion' style={alienStyle} />}
                                {alien.type === 'bomb' && <img src={bomb} alt='bomb' style={alienStyle} />}
                                {alien.type === 'scarecrow' && <div id={!gameInfo.pausedGame ? 'enemydiv' : 'enemydiv-paused'}>
                                                                  <img src={scarecrow} alt='alien' style={alienStyle} /></div>}
                                {alien.type === 'bane' && <div id={!gameInfo.pausedGame ? 'enemydiv' : 'enemydiv-paused'}>
                                                                  <img src={bane} alt='alien' style={alienStyle} /></div>}
                                {alien.type === 'joker' && <div id={!gameInfo.pausedGame ? 'enemydiv' : 'enemydiv-paused'}>
                                                                  <img src={joker} alt='alien' style={alienStyle} /></div>}
                                {alien.type === 'theThing' && <div id={!gameInfo.pausedGame ? 'enemydiv' : 'enemydiv-paused'}>
                                                                  <img src={theThing} alt='alien' style={alienStyle} /></div>}
                                {alien.type === 'terminator' && <div id={!gameInfo.pausedGame ? 'enemydiv' : 'enemydiv-paused'}>
                                                                  <img src={terminator} alt='alien' style={alienStyle} /></div>}
                                {alien.type === 'alienQueen' && <div id={!gameInfo.pausedGame ? 'enemydiv' : 'enemydiv-paused'}>
                                                                  <img src={alienQueen} alt='alien' style={alienStyle} /></div>}
                                {alien.type === 'predator' && <div id={!gameInfo.pausedGame ? 'enemydiv' : 'enemydiv-paused'}>
                                                                  <img src={predator} alt='alien' style={alienStyle} /></div>}
                                {/* alien.position */}
                              </div>
                    )}
    </Fragment>
  )
}

// Estilos para la imagen del enemigo
const alienStyle = {
  maxWidth: '33px',
  minHeight: '35px',
  maxHeight: '35px',
  // padding: '1px',
}

/* const emptyAlienStyle = {
  margin: 'auto',
  maxWidth: '33px',
  minHeight: '35px',
  maxHeight: '35px',
  paddingTop: '2px',
  backgroundColor: '#ccc',
} */

export default EnemyGrid
