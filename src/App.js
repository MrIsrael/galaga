import React, { useState } from 'react'
import StatusBar from './components/StatusBar'
import EnemyGrid from './components/EnemyGrid'
import PlayerPlatform from './components/PlayerPlatform'
import WelcomeScreen from './components/WelcomeScreen'
import SelectLanguage from './components/SelectLanguage'
import SelectAvatar from './components/SelectAvatar'
import SelectDifficulty from './components/SelectDifficulty'
import ToggleSounds from './components/ToggleSounds'
import AboutAndCredits from './components/AboutAndCredits'
import NextLevel from './components/NextLevel'
import GameOver from './components/GameOver'
import Page1 from './components/instructions/Page1'

import { GlobalProvider } from './context/GalagaState'

import './App.css'

const App = () => {
  const [flag, setFlag] = useState(0)
  // flag = -8  --> About / credits
  // flag = -7  --> Turn on / off sounds
  // flag = -6  --> Select difficulty
  // flag = -5  --> Game over
  // flag = -4  --> Next level
  // flag = -3  --> Select avatar
  // flag = -2  --> Select language
  // flag = -1  --> Enemy grid
  // flag = 0   --> Welcome screen
  // flag = 1   --> Instructions page 1...

  const changeScreen = (val) => { setFlag(val) }

  return (
    <GlobalProvider>
      {console.log('FLAG DE APP SCREEN ACTIVO: ' + flag)}
      <div className={flag !== -1 ? 'hidden' : 'status-bar-container'}>
        {flag === -1 ? <StatusBar /> : <i></i>}
      </div>
      <div className={flag !== -1 ? 'welcome-screen-container' : 'enemy-grid-container'}>
        {flag === -8 && <AboutAndCredits changeScreen = {changeScreen} />}
        {flag === -7 && <ToggleSounds changeScreen = {changeScreen} />}
        {flag === -6 && <SelectDifficulty changeScreen = {changeScreen} />}
        {flag === -5 && <GameOver changeScreen = {changeScreen} />}
        {flag === -4 && <NextLevel changeScreen = {changeScreen} />}
        {flag === -3 && <SelectAvatar changeScreen = {changeScreen} />}
        {flag === -2 && <SelectLanguage changeScreen = {changeScreen} />}
        {flag === -1 && <EnemyGrid changeScreen = {changeScreen} />}
        {flag === 0 && <WelcomeScreen changeScreen = {changeScreen} />}
        {flag === 1 && <Page1 changeScreen = {changeScreen} />}
        {/* PONER AQUÍ LAS SIGUIENTES PAGINAS DE INSTRUCCIONES */}
      </div>
      <div className={flag !== -1 ? 'hidden' : 'player-platform-container'}>
        <PlayerPlatform />
      </div>
    </GlobalProvider>
  )
}

export default App
