const querystring = require('querystring');
const path = require('path');

const ROOT = process.cwd();

let sample1 = 'https://www.youtube.com/playlist?list=PL2sVlus9pnljgevBoDHcthkvFUqk9SaN-';
let sample2 = 'https://www.youtube.com/playlist?list=PL2sVlus9pnljgevBoDHcthkvFUqk9SaN-';
let sample = 'https://www.youtube.com/playlist?list=';

function isPlaylist(url) {
    return Boolean(querystring.parse(url, '?').list);
}
function isVideo(url) {
    return Boolean(querystring.parse(url, '?').v);
}

function getFromInfo(info) {
    const {playlist_uploader_id, playlist_uploader, size, playlist, fulltitle}  = info;
    const [youtuber, folder, title ] = [playlist_uploader_id, playlist, fulltitle].map(s => makeName(s));  
    const output = path.resolve(ROOT, youtuber);

    return {
        filename: `${title}.mp4`,
        output,
        title,
        folder,
        youtuber
    }
}


const makeName = (string) => string ? string.replace(/[\s, //]/g, '-') : '';



module.exports = {
    isPlaylist,
    isVideo,
    getFromInfo
}

