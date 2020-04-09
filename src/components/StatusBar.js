import React, { Fragment } from 'react';

const StatusBar = () => {
  return (
    <Fragment>
      <div className='status-bar-left'>
        <h3>Level: 0</h3>
        <h3>Speed: x1</h3>
      </div>
      <div className='status-bar-middle'>
        <h1><em>GALAGA!</em></h1>
      </div>
      <div className='status-bar-right'>
        <h3>Enemies killed: 0</h3>
        <h3>Lives: 5</h3>
      </div>
    </Fragment>
  );
};

export default StatusBar;
