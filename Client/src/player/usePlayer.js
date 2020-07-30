import {useContext} from 'react';
import {PlayerContext} from './PlayerContext';

const usePlayer = () => {
  const [state, dispatch] = useContext(PlayerContext);

  function togglePlay() {
    dispatch({type: 'TOGGLE_PLAY', isPlaying: state.isPlaying});
  }

  function playVideo(video) {
    if (video === state.video) {
      togglePlay();
    } else {
      dispatch({type: 'PLAY', video});
      const path = `/${state.youtuber}/${state.playlist}`;
      window.location.pathname = `${path}/${video.video}`;
    }
  }

  return {
    togglePlay,
    playVideo,
  };
};

export default usePlayer;
