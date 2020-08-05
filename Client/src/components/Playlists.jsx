import React, {useContext} from 'react';
import Videoslist from './Videoslist.jsx';
import {PlayerContext} from '../player/PlayerContext';

const Playlists = () => {
  const [state, dispatch] = useContext(PlayerContext);
  const handleOnClick = (e, name) => {
    e.stopPropagation();
    dispatch({type: 'SET_PLAYLIST', playlist: name});
  }

  const content = state.lists[state.youtuber].playlists.map((list) => {
    const isActive = list.name === state.playlist;
    return (
      <li key={list.name} onClick={(e) => handleOnClick(e, list.name)}>
        {list.name}
        {isActive && <Videoslist videos={list.videos} />}
      </li>
    );
  });

  return <ul>{content}</ul>;
};

export default Playlists;
