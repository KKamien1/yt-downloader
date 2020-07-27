import React, {useState} from 'react';
import Playlists from './Playlists.jsx';

export default function YoutubersList({total}) {
  const [active, setActive] = useState(null);
  const youtubersList = Object.keys(total);

  const handleOnclick = (youtuber) => setActive(youtuber);

  const content = youtubersList.map((youtuber) => {
    const isActive = youtuber === active;
    return (
      <li key={youtuber} onClick={() => handleOnclick(youtuber)}>
        {youtuber}
        {isActive && <Playlists lists={total[youtuber].playlists} />}
      </li>
    );
  });
  return <ul>{content}</ul>;
}
