require('dotenv').config();
const fs = require('fs');
const querystring = require('querystring');
const path = require('path');

const {ROOT, INFO} = process.env;

const makeName = (string) => string ? string.replace(/(\s+|\/|\*|\.|\[|\]|:|;|\||\?|,|"|')/g, '-') : '';
const makeDir = name => {if (!fs.existsSync(path.resolve(name))) fs.mkdirSync(path.resolve(name));}



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
    const subdirs = rootDir.map(youtuber => {
        const playlists = fs.readdirSync(`${ROOT}/${youtuber}`);
        const videos = playlists.map(playlist => {
          const videosInPlaylist = fs.readdirSync(`${ROOT}/${youtuber}/${playlist}`);
          console.log(playlist);
          return {
            name: playlist,
            videos: videosInPlaylist
          }
        });
        return {
          youtuber,
          playlists: videos
        }
    })
    fs.writeFileSync('TOTAL.js', `export default ${JSON.stringify(subdirs)}`);
    fs.writeFileSync('TOTAL__.json', JSON.stringify(subdirs));
}



function getFromInfo(info) {
    const {uploader, playlist_uploader, playlist_uploader_id, size, playlist, fulltitle}  = info;
    const author = uploader || playlist_uploader || playlist_uploader_id
    const [youtuber, folder, filename ] = [author, playlist, fulltitle].map(s => makeName(s));  
    const output = path.resolve(ROOT, youtuber);

    return {
        filename,
        output,
        folder,
        youtuber, 
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





module.exports = {
    isPlaylist,
    isVideo,
    getFromInfo,
    makeFolders,
    getCurrentState
}

