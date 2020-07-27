import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import total from '../../TOTAL.json';

import YoutubersList from './components/YoutubersList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <YoutubersList total={total} />
      </div>
    );
  }
}

export default hot(module)(App);
