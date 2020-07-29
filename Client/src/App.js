import React, {Component, useReducer} from 'react';
import {hot} from 'react-hot-loader';
import total from '../../TOTAL.json';

import YoutubersList from './components/YoutubersList.jsx';

const init = {
  lists: total,
  youtuber: null,
  playlist: null,
  active: null,
  path: [],
  video: '',
  getActivePath: () => `/${init.youtuber}/${init.playlist}/${init.video}`,
};
export const AppContext = React.createContext(null);

const stateReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVE':
      return {...state, active: action.nowactive};
      break;
    case 'SET_PATH':
      return {...state, path: [action.path, ...state.path]};
      break;
    case 'SET_PLAYLIST':
      return {...state, playlist: action.playlist};
      break;
    case 'SET_YOUTUBER':
      return {...state, youtuber: action.youtuber};
      break;
    default:
      return state;
      break;
  }
};

function App() {
  const [state, dispatch] = useReducer(stateReducer, init);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      <div>
        <YoutubersList />
      </div>
    </AppContext.Provider>
  );
}

export default hot(module)(App);
