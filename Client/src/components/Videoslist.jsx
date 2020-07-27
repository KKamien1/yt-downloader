import React from 'react';

export default function Videoslist({videos}) {
  const content = videos.map((video) => {
    return (
      <div key={video.id}>
        <a href={`video/${video.video}`}>{video.title}</a>
      </div>
    );
  });

  return <div>{content}</div>;
}
