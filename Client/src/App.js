import React from 'react';
import { hot } from 'react-hot-loader';

import { PlayerProvider } from './player/PlayerContext';

import YoutubersList from './components/YoutubersList.jsx';
import VideoPlayer from './components/VideoPlayer.jsx';

function App() {
  return (
    <PlayerProvider>
      <YoutubersList />
      <VideoPlayer />
    </PlayerProvider>
  );
}

export default hot(module)(App);
