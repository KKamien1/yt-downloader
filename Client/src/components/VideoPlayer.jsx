import React, { useContext } from 'react';
import usePlayer from '../player/usePlayer';
import { PlayerContext } from '../player/PlayerContext';

const VideoPlayer = (props) => {
    const [state, dispatch] = useContext(PlayerContext);
    const { playVideo } = usePlayer();

    const url = ({ youtuber, playlist, video: { video: url } }) => `YouTubeOff/${youtuber}/${playlist}/${url}`

    return (

        <video width="500" height="600" controls src={url(state)}>
            {/* <source ></source> */}
        </video>
    )
}

export default VideoPlayer;