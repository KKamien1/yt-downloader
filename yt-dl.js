const youtubedl = require('youtube-dl');
const http = require('http')
const fs = require('fs');
const repl = require('repl');

const { ROOT, INFO, THUMBS } = process.env;

const {
    getFromInfo,
    makeRootFolders,
    downloadFile,
    isPlaylist,
    isVideo
} = require('./utils');



function playList(url) {
    'use strict';
    const video = youtubedl(url);

    video.on('error', function error(err) {
        console.log('error 2:', err);
    });

    let size = 0;
    video.on('info', function (info) {
        const { youtuber, output, folder, filename, thumbnail } = getFromInfo(info); //?
        console.log(`

      -----------------------
      youtuber: ${youtuber}
      title: ${info.title}
      output: ${output}
      filename: ${filename}
      thumbail: ${thumbnail}

      -----------------------
      
      `);

        const [rootDir, infoDir, thumbsDir] = makeRootFolders(
            [ROOT, INFO, THUMBS],
            youtuber,
            folder
        );
        fs.writeFileSync(`${infoDir}/${filename}.json`, JSON.stringify(info));

        downloadFile(thumbnail, `${thumbsDir}/${filename}.webp`);

        video.pipe(fs.createWriteStream(`${rootDir}/${filename}.mp4`));
    });

    let pos = 0;
    video.on('data', function data(chunk) {
        pos += chunk.length;
        // `size` should not be 0 here.
        if (size) {
            let percent = ((pos / size) * 100).toFixed(2);
            process.stdout.cursorTo(0);
            process.stdout.clearLine(1);
            process.stdout.write(percent + '%');
        }
    });

    video.on('next', playList);
}




function playVideo(url) {
    let filename;
    const video = youtubedl(
        url,
        // Optional arguments passed to youtube-dl.
        ['--format=18'],
        // Additional options can be given for calling `child_process.execFile()`.
        { cwd: __dirname }
    );

    // Will be called when the download starts.
    video.on('info', function (info) {
        console.log('Download started');
        console.log(info);
        //fs.writeFileSync('./info.json')
        console.log('filename: ' + info._filename);
        console.log('size: ' + info.size);
        filename = getFromInfo(info).filename;

        console.log('=======>', filename);
        //?
        video.pipe(fs.createWriteStream(filename));
    });
}

function askUser() {
    const rl = repl.start({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question('Enter a youtube url: ', (url) => {
        if (isPlaylist(url)) playList(url);
        if (isVideo(url)) playVideo(url);
        rl.close();
    });
}

module.exports = { playVideo, playList, askUser };