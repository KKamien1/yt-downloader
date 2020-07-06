require('dotenv').config();
const fs = require('fs');
const querystring = require('querystring');
const path = require('path');

const { ROOT, INFO } = process.env;

const makeName = (string) => string ? string.replace(/(\s+|\/|\*|\.|\[|\]|:|;|\||\?|,|"|')/g, '-') : '';
const makeDir = name => { if (!fs.existsSync(path.resolve(name))) fs.mkdirSync(path.resolve(name)); }



makeDir(ROOT);
makeDir(INFO);


function isPlaylist(url) {
    return Boolean(querystring.parse(url, '?').list);
}
function isVideo(url) {
    return Boolean(querystring.parse(url, '?').v);
}

function getCurrentState(ROOT) {
    const rootDir = fs.readdirSync(ROOT)
    const state = rootDir.reduce((all, youtuber) => {
        const playlists = fs.readdirSync(`${ROOT}/${youtuber}`);
        const videos = playlists.map(playlist => {
            const videosInPlaylist = fs.readdirSync(`${ROOT}/${youtuber}/${playlist}`);
            return {
                name: playlist,
                videos: videosInPlaylist
            }
        });
        all[youtuber] = { playlists: videos }
        return all;
    }, {});
    fs.writeFileSync('TOTAL.json', JSON.stringify(state));
    return state;

}



function getFromInfo(info) {
    const { uploader, playlist_uploader, playlist_uploader_id, size, playlist, fulltitle } = info;
    const author = uploader || playlist_uploader || playlist_uploader_id
    const [youtuber, folder, filename] = [author, playlist, fulltitle].map(s => makeName(s));
    const output = path.resolve(ROOT, youtuber);

    return {
        filename,
        output,
        folder,
        youtuber,
        uploader,
        ROOT
    }
}

function makeFolders(...folders) {
    console.log(folders);
    let dir = path.resolve();
    while (folders.length) {
        dir = `${dir}/${folders.shift()}`
        makeDir(dir)
    }
}


function getInfo(json, keys) {
    let data = JSON.parse(fs.readFileSync(json));
    return keys.reduce((details, key) => {
        details[key] = data[key]
        return details;
    }, {})

}

function attachVideoDetails(total, keys) {
    console.log(total);
    const newTotal = Object.keys(total).map(youtuber => total[youtuber].playlists.map(playlist => playlist.videos.map(video => {
        let filename = video.replace('.mp4', '');
        let json = `./Info/${youtuber}/${playlist.name}/${filename}.json`;
        let details = getInfo(json, keys);
        console.log(details);
        return {
            video,
            ...details
        }
    })));

    fs.writeFileSync('TOTAL.json', JSON.stringify(newTotal));


}


module.exports = {
    attachVideoDetails,
    getFromInfo,
    getCurrentState,
    getInfo,
    isPlaylist,
    isVideo,
    makeFolders,
}

