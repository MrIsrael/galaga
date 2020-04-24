import React from 'react'
import StatusBar from './components/StatusBar'
import EnemyGrid from './components/EnemyGrid'
import PlayerPlatform from './components/PlayerPlatform'

import { GlobalProvider } from "./context/GalagaState"

import './App.css'

const App = () => {
  return (
    <GlobalProvider>
      <div className='status-bar-container'>
        <StatusBar />
      </div>
      <div className='enemy-grid-container'>
        <EnemyGrid />
        <EnemyGrid />
      </div>
      <div className='player-platform-container'>
        <PlayerPlatform />
      </div>
    </GlobalProvider>
  )
}

export default App
