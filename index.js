const fs = require('fs');
const path = require('path');

const youtubedl = require('youtube-dl');


let name = 'tempName';

// const video = youtubedl('https://www.youtube.com/watch?v=0j7dwG1cXc4', ['--format=18'], {cwd:__dirname} );


// video.on('info', function(info) {
//     name = info._filename;
//     console.log('Download started');
//     console.log(`filename: ${info._filename}`);
//     console.log(`Size: ${info.size}`);
// });


function playlist(url) {
 
    'use strict'
    const video = youtubedl(url)
   
    video.on('error', function error(err) {
      console.log('error 2:', err)
    })
   
    let size = 0
    video.on('info', function(info) {
      size = info.size
      let output = path.join(__dirname + '/', size + '.mp4')
      video.pipe(fs.createWriteStream(output))
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
   
    video.on('next', playlist)
  }

// video.pipe(fs.createWriteStream(name));


playlist('https://www.youtube.com/playlist?list=PLWOdyjG6bHl4UAFH5-HtS9ui1bkE5jMLp');