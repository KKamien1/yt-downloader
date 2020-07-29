import React, {useState, useContext} from 'react';
import Playlists from './Playlists.jsx';
import {AppContext} from '../App';

export default function YoutubersList() {
  const {state, dispatch} = useContext(AppContext);
  const youtubersList = Object.keys(state.lists);

  const handleOnclick = (youtuber) =>
    dispatch({type: 'SET_YOUTUBER', youtuber});

  const content = youtubersList.map((youtuber) => {
    const isActive = youtuber === state.youtuber;
    return (
      <li key={youtuber} onClick={() => handleOnclick(youtuber)}>
        {youtuber}
        {isActive && <Playlists lists={state.lists[youtuber].playlists} />}
      </li>
    );
  });
  return <ul>{content}</ul>;
}
