import React, { useState } from 'react'
import StatusBar from './components/StatusBar'
import EnemyGrid from './components/EnemyGrid'
import PlayerPlatform from './components/PlayerPlatform'
import WelcomeScreen from './components/WelcomeScreen'
import SelectLanguage from './components/SelectLanguage'
import SelectAvatar from './components/SelectAvatar'
import GameOver from './components/GameOver'
import Page1 from './components/instructions/Page1'

import { GlobalProvider } from './context/GalagaState'

import './App.css'

const App = () => {
  const [flag, setFlag] = useState(0)
  // flag = -4  --> Game over
  // flag = -3  --> Select avatar
  // flag = -2  --> Select language
  // flag = -1  --> Enemy grid
  // flag = 0   --> Welcome screen
  // flag = 1   --> Instructions page 1
  // flag = 2   --> Instructions page 2
  // flag = 3   --> Instructions page 3

  const changeScreen = (val) => { setFlag(val) }

  return (
    <GlobalProvider>
      <h2>Valor flag de App screen: {flag}</h2>
      <div className={flag !== -1 ? 'hidden' : 'status-bar-container'}>
        <StatusBar />
      </div>
      <div className={flag !== -1 ? 'welcome-screen-container' : 'enemy-grid-container'}>
        {flag === -4 && <GameOver changeScreen = {changeScreen} />}
        {flag === -3 && <SelectAvatar changeScreen = {changeScreen} />}
        {flag === -2 && <SelectLanguage changeScreen = {changeScreen} />}
        {flag === -1 && <EnemyGrid changeScreen = {changeScreen} />}
        {flag === 0 && <WelcomeScreen changeScreen = {changeScreen} />}
        {flag === 1 && <Page1 changeScreen = {changeScreen} />}
      </div>
      <div className={flag !== -1 ? 'hidden' : 'player-platform-container'}>
        <PlayerPlatform />
      </div>
    </GlobalProvider>
  )
}

export default App
