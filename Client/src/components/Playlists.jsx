import React, {useState} from 'react';
import Videoslist from './Videoslist.jsx';

const Playlists = ({lists}) => {
  const [activeList, setactiveList] = useState(null);
  const handleOnClick = (name) => setactiveList(name);

  const content = lists.map((list) => {
    const isActive = list.name === activeList;
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
