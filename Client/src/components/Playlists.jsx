import React, {useContext} from 'react';
import Videoslist from './Videoslist.jsx';
import {PlayerContext} from '../player/PlayerContext';

const Playlists = () => {
  const [state, dispatch] = useContext(PlayerContext);
  const handleOnClick = (name) =>
    dispatch({type: 'SET_PLAYLIST', playlist: name});

  const content = state.lists[state.youtuber].playlists.map((list) => {
    const isActive = list.name === state.playlist;
    return (
      <li key={list.name} onClick={() => handleOnClick(list.name)}>
        {list.name}
        {isActive && <Videoslist videos={list.videos} />}
      </li>
    );
  });

  return <ul>{content}</ul>;
};

export default Playlists;
