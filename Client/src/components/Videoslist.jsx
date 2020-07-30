import React, {useContext} from 'react';
import {PlayerContext} from '../player/PlayerContext';
import usePlayer from '../player/usePlayer';

export default function Videoslist({videos}) {
  const {playVideo} = usePlayer();
  //const [state, dispatch] = useContext(PlayerContext);
  // const {youtuber, playlist} = state;

  // const handleClick = (video) => playVideo(video);

  const content = videos.map((video) => {
    return (
      <div key={video.id}>
        <button type='button' onClick={() => playVideo(video)}>
          {video.title}
        </button>
      </div>
    );
  });

  return <div>{content}</div>;
}
