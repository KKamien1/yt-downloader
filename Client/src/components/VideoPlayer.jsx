import React, { useContext, useRef, useEffect, forwardRef } from 'react';
import usePlayer from '../player/usePlayer';
import { PlayerContext } from '../player/PlayerContext';

const VideoPlayer = (props) => {
    const [state, dispatch] = useContext(PlayerContext);
    const videoRef = useRef(null);
    useEffect( () => {
        dispatch({type: 'SET_VIDEO_REF', videoRef});
    },[] )   
    
    return (
        <div>
            {state.video && 
                <video ref={videoRef} autoPlay={state.isPlaying} controls src={state.video}></video>
            }
        </div>
    )
}

export default VideoPlayer;