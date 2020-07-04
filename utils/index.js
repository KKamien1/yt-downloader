require('dotenv').config();
const fs = require('fs');
const querystring = require('querystring');
const path = require('path');

const {ROOT, INFO} = process.env;

const makeName = (string) => string ? string.replace(/(\s+|\/|\*|\.|\[|\]|:|;|\||\?|,|"|')/g, '-') : '';
const makeDir = name => {if (!fs.existsSync(path.resolve(name))) fs.mkdirSync(path.resolve(name));}



makeDir(ROOT);
makeDir(INFO);


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
    makeFolders
}

