require('dotenv').config();
const fs = require('fs');
const repl = require('repl');
const youtubedl = require('youtube-dl');
const { isPlaylist, isVideo, getFromInfo, makeFolders, getCurrentState, attachVideoDetails } = require('./utils')

let url = process.argv[2];
const { ROOT, INFO } = process.env;


let total = getCurrentState(ROOT);

console.log(total);

attachVideoDetails(total, ['uploader', 'title']);

if (!url) {
  const rl = repl.start({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter a youtube url: ', (url) => {
    runPlay(url);
    rl.close();
  });
}

// clearunPlay(url);

function runPlay(url) {
  if (isPlaylist(url)) {
    playList(url);

  } else if (isVideo(url)) {
    playVideo(url);
  }
}



function playList(url) {

  'use strict'
  const video = youtubedl(url)

  video.on('error', function error(err) {
    console.log('error 2:', err)
  })

  let size = 0
  video.on('info', function (info) {
    const { youtuber, output, folder, filename } = getFromInfo(info) //?
    console.log(`

      -----------------------
      youtuber: ${youtuber}
      title: ${info.title}
      output: ${output}
      filename: ${filename}
      -----------------------
      
      `
    );

    makeFolders(INFO, youtuber, folder);

    fs.writeFileSync(`./${INFO}/${youtuber}/${folder}/${filename}.json`, JSON.stringify(info));

    makeFolders(ROOT, youtuber, folder);
    // if (!fs.existsSync(output)) fs.mkdirSync(output);
    // if (!fs.existsSync(`${output}/${folder}`)) fs.mkdirSync(`${output}/${folder}`);

    video.pipe(fs.createWriteStream(`${output}/${folder}/${filename}.mp4`));


  })

  let pos = 0
  video.on('data', function data(chunk) {
    pos += chunk.length
    // `size` should not be 0 here.
    if (size) {
      let percent = (pos / size * 100).toFixed(2)
      process.stdout.cursorTo(0)
      process.stdout.clearLine(1)
      process.stdout.write(percent + '%')
    }
  })

  video.on('next', playList);
}

function playVideo(url) {
  let filename;
  const video = youtubedl(url,
    // Optional arguments passed to youtube-dl.
    ['--format=18'],
    // Additional options can be given for calling `child_process.execFile()`.
    { cwd: __dirname })


  // Will be called when the download starts.
  video.on('info', function (info) {
    console.log('Download started')
    console.log(info)
    //fs.writeFileSync('./info.json')
    console.log('filename: ' + info._filename)
    console.log('size: ' + info.size)
    filename = getFromInfo(info).filename;

    console.log('=======>', filename)
    //? 
    video.pipe(fs.createWriteStream(filename))
  })

}

