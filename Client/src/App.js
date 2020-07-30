import React from 'react';
import {hot} from 'react-hot-loader';

import {PlayerProvider} from './player/PlayerContext';

import YoutubersList from './components/YoutubersList.jsx';

function App() {
  return (
    <PlayerProvider>
      <div>
        <YoutubersList />
      </div>
    </PlayerProvider>
  );
}

export default hot(module)(App);
