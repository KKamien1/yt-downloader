import React from 'react'

const Playlists = ({ lists }) => {

    console.log("Lists==>", typeof lists)

    const content = lists.map(list => {
        return (<li key={list.name}>{list.name}</li>)
    })

    return (
        <ul>
            {content}
        </ul>
    );
}

export default Playlists; 