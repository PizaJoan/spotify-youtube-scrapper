const puppeteer = require("puppeteer");
const fs = require("fs");

const trackListSelector = 'div[data-testid="playlist-tracklist"]';

async function getSongs() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto("spotify-list");

  await page.waitForSelector(trackListSelector);
  await page.focus(trackListSelector);
  await page.keyboard.down("PageDown");

  const songsNum = await page.$eval(trackListSelector, (elem) =>
    Number(elem.ariaRowCount),
  );

  const step = 16;
  const start = 2;
  const result = [];

  for (let i = start; i <= songsNum; i++) {
    const song = await page.$eval(
      `${trackListSelector} div[aria-rowindex="${i}"]`,
      (el) =>
        el.querySelector('div[aria-colindex="2"] > div a div').textContent,
    );
    const artist = await page.$eval(
      `${trackListSelector} div[aria-rowindex="${i}"]`,
      (el) =>
        el.querySelector('div[aria-colindex="2"] > div span div').textContent,
    );

    result.push({
      song,
      artist,
      possibleUrl: `https://www.youtube.com/results?search_query=${artist.split(" ").join("+")}+${song.split(" ").join("+")}`,
    });

    if (i % step === 0 && i < songsNum - step) {
      await page.keyboard.down("PageDown");

      await page.waitForSelector(
        `${trackListSelector} div[aria-rowindex="${i + step}"]`,
      );
    }
  }

  await browser.close();

  fs.writeFileSync("songs.json", JSON.stringify(result, null, 2), "utf-8");
}

module.exports = { getSongs };
