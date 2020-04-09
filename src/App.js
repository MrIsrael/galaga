import React, { Fragment } from 'react';
import StatusBar from './components/StatusBar';
import EnemyGrid from './components/EnemyGrid';
import PlayerPlatform from './components/PlayerPlatform';

import './App.css';

const App = () => {
  return (
    <Fragment>
      <div className='status-bar-container'>
        <StatusBar />
      </div>
      <div className='enemy-grid-container'>
        <EnemyGrid />
        <EnemyGrid />
        <EnemyGrid />
        <EnemyGrid />
        <EnemyGrid />
        <EnemyGrid />
        <EnemyGrid />
        <EnemyGrid />
        <EnemyGrid />
        <EnemyGrid />
        <EnemyGrid />
        <EnemyGrid />
        <EnemyGrid />
        <EnemyGrid />
        <EnemyGrid />
        <EnemyGrid />
        <EnemyGrid />
        <EnemyGrid />
        <EnemyGrid />
        <EnemyGrid />
        <EnemyGrid />
        <EnemyGrid />
      </div>
      <div className='player-platform-container'>
        <PlayerPlatform />
      </div>
    </Fragment>
  );
};

export default App;
