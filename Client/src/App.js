import React, { Component } from "react";
import { hot } from "react-hot-loader";
import total from '../../TOTAL'
import Playlists from './components/Playlists.jsx'


class App extends Component {


    render() {
        const youtubers = total.map(item => item.youtuber);
        const playlists = total.map(item => item.playlists.reduce((all, list) => {
            //console.log(list);
            return all + list.name
        }), '');

        const content = total.map(set => {
            return (<li key={set.youtuber}>{set.youtuber}

                <Playlists lists={set.playlists} />

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