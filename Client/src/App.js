import React, { Component } from "react";
import { hot } from "react-hot-loader";
import total from '../../TOTAL.json'
import Playlists from './components/Playlists.jsx'


class App extends Component {


    render() {
        const youtubers = Object.keys(total);
        const content = youtubers.map(youtuber => {
            return (<li key={youtuber}>{youtuber}
                <Playlists lists={total[youtuber].playlists} />
            </li>);
        })

        return (
            <div>
                <ul>{content}</ul>
            </div>
        );
    }
}

export default hot(module)(App);