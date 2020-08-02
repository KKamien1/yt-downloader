require('dotenv').config();
const fs = require('fs');
const querystring = require('querystring');
const path = require('path');
const https = require('https');



const { ROOT, INFO, THUMBS } = process.env;

const makeName = (string) =>
  string ? string.replace(/(\s+|\/|\*|\.|\[|\]|#|:|;|\||\?|,|"|')/g, '-') : '';
const makeDir = (name) => {
  if (!fs.existsSync(path.resolve(name))) fs.mkdirSync(path.resolve(name));
};
const jsonInfoUrl = (youtuber, playlistName, video) =>
  `./${INFO}/${youtuber}/${playlistName}/${video.replace('.mp4', '')}.json`;

makeDir(ROOT);
makeDir(INFO);

function isPlaylist(url) {
  return Boolean(querystring.parse(url, '?').list);
}
function isVideo(url) {
  return Boolean(querystring.parse(url, '?').v);
}

function getCurrentState(ROOT) {
  const rootDir = fs.readdirSync(ROOT);
  const state = rootDir.reduce((all, youtuber) => {
    const playlists = fs.readdirSync(`${ROOT}/${youtuber}`);
    const videos = playlists.map((playlist) => {
      const videosInPlaylist = fs.readdirSync(
        `${ROOT}/${youtuber}/${playlist}`
      );
      return {
        name: playlist,
        videos: videosInPlaylist,
      };
    });
    all[youtuber] = { playlists: videos };
    return all;
  }, {});
  fs.writeFileSync('TOTAL.json', JSON.stringify(state));

  return state;
}

function getFromInfo(info) {
  const {
    uploader,
    playlist_uploader,
    playlist_uploader_id,
    size,
    thumbnail,
    playlist,
    fulltitle,
  } = info;
  const author = uploader || playlist_uploader || playlist_uploader_id;
  const [youtuber, folder, filename] = [author, playlist, fulltitle].map((s) =>
    makeName(s)
  );
  const output = path.resolve(ROOT, youtuber);

  return {
    filename,
    output,
    folder,
    youtuber,
    uploader,
    thumbnail,
    ROOT,
  };
}

function makeFolders(...folders) {
  let dir = path.resolve();
  while (folders.length) {
    dir = `${dir}/${folders.shift()}`;
    makeDir(dir);
  }
}

function makeRootFolders(rootFolders, ...subfolders) {
  return rootFolders.map((root) => {
    makeFolders(root, ...subfolders);
    let dir = [...subfolders].join('/');
    return `./${root}/${dir}`;
  });
}

function getInfo(json, keys) {
  let data = JSON.parse(fs.readFileSync(json));
  return keys.reduce((details, key) => {
    details[key] = data[key];
    return details;
  }, {});
}

function attachVideoDetails(state, keys) {
  for (const youtuber in state) {
    state[youtuber].playlists.forEach((playlist) => {
      playlist.videos = playlist.videos.map((video) => {
        const json = jsonInfoUrl(youtuber, playlist.name, video);
        const details = getInfo(json, keys);
        return {
          video,
          ...details,
        };
      });
    });
  }

  fs.writeFileSync('TOTAL.json', JSON.stringify(state));
  return state;
}

function downloadFile(url, dest, cb) {
  const file = fs.createWriteStream(dest);
  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close(cb);
    });
  });
}



module.exports = {
  attachVideoDetails,
  getFromInfo,
  getCurrentState,
  getInfo,
  isPlaylist,
  isVideo,
  makeFolders,
  makeRootFolders,
  downloadFile,
};
