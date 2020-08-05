import { useContext } from 'react';
import { PlayerContext } from './PlayerContext';

const usePlayer = () => {
  const [state, dispatch] = useContext(PlayerContext);

  function togglePlay() {
    dispatch({ type: 'TOGGLE_PLAY', isPlaying: state.isPlaying });
  }
  function getVideoUrl ({url}) {
    const { youtuber, playlist} = state;
    const path = `YouTubeOff/${youtuber}/${playlist}/`
      return `${path}/${url}`;
  }

  function setVideo(video) {
    const url = getVideoUrl(video);
    dispatch({ type: 'SET_VIDEO', url});
  }

  function playVideo(video) {
    if (state.video.includes(video.url) ) {
      togglePlay();
    } else {
      setVideo(video);
      //dispatch({ type: 'PLAY', video });
      // const path = `/${state.youtuber}/${state.playlist}`;
      // window.location.pathname = `${path}/${video.video}`;
    }
  }

  return {
    togglePlay,
    playVideo,
  };
};

export default usePlayer;
