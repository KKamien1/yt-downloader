require('dotenv').config();
const {

  getCurrentState,
  attachVideoDetails,

} = require('./utils');

const { askUser } = require('./yt-dl.js')

let url = process.argv[2];
const { ROOT, INFO, THUMBS } = process.env;

let STATE;

new Promise((resolve, reject) => {
  resolve(getCurrentState(ROOT));
})
  .then((total) => {
    return attachVideoDetails(total, ['title', 'id', 'thumbnail']);
  })
  .then((newtotal) => { })
  .catch((err) => console.log(err));


if (!url) askUser();

// clearunPlay(url);









