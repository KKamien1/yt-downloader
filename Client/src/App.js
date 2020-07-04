import React, {Component} from "react";
import { hot } from "react-hot-loader";
import total from '../../TOTAL'


class App extends Component {

    
    render() { 
        const youtubers = total.map(item => item.youtuber);
        const playlists = total.map(item => item.videos.reduce((all,list) => {
            console.log(list);    
            return all + list.playlist
        }), '')
        return ( 
            <div>
                {youtubers}
                {playlists}
            </div>
         );
    }
}
 
export default hot(module)(App);