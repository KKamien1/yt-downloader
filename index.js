require('dotenv').config();
const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('updateState', (state) => {
  console.log('State updated', Object.keys(state));
})
const {

  getCurrentState,
  attachVideoDetails,

} = require('./utils');

const { askUser } = require('./yt-dl.js');


let url = process.argv[2];
const { ROOT, INFO, THUMBS } = process.env;

let STATE;

new Promise((resolve, reject) => {
  resolve(getCurrentState(ROOT));
})
  .then((total) => {
    return attachVideoDetails(total, ['title', 'id', 'thumbnail']);
  })
  .then((newtotal) => {
    emitter.emit('updateState', newtotal)
  })
  .catch((err) => console.log(err));


// if (!url) askUser();

// clearunPlay(url);









