const { getSongs } = require("./get-songs");
const { getVideoUrls } = require("./get-urls");
const { addSongs } = require("./add-songs-playlist");

async function run() {
  // await getSongs();
  // await getVideoUrls();
  await addSongs();
}

module.exports = run;
