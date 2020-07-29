import React, {useContext} from 'react';
import Videoslist from './Videoslist.jsx';
import {AppContext} from '../App';

const Playlists = () => {
  const {state, dispatch} = useContext(AppContext);
  const handleOnClick = (name) =>
    dispatch({type: 'SET_PLAYLIST', playlist: name});

  const content = state.lists[state.youtuber].playlists.map((list) => {
    const isActive = list.name === state.playlist;
    console.log(state.getActivePath());
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
