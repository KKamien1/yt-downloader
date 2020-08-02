import React from 'react';
import usePlayer from '../player/usePlayer';

export default function Videoslist({ videos }) {
  const { playVideo } = usePlayer();

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
