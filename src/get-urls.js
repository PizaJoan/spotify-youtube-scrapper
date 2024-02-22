const puppeteer = require("puppeteer");
const fs = require("fs");

const firstOptionSelector = `div[id="contents"] a[id="thumbnail"]`;

async function getVideoUrls() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 });

  const data = JSON.parse(fs.readFileSync("songs.json", { encoding: "utf-8" }));
  const videos = [];
  const errors = [];

  for (const video of data) {
    try {
      await page.goto(video.possibleUrl);
      await page.waitForSelector(firstOptionSelector);

      const pathToVid = await page.$eval(firstOptionSelector, (el) => el.href);
      const videoId = /v=([^&]*)/g.exec(pathToVid)[1];
      // .split("?")[1].split("&")[0].split("=")[1];

      videos.push({ ...video, url: pathToVid, videoId: videoId });
    } catch (e) {
      errors.push({ ...video, error: e });
      console.error(
        `Problem at video: ${video.possibleUrl}, artis+song: ${video.artist} ${video.song}`,
      );
    }
  }

  await browser.close();

  fs.writeFileSync(
    "youtubeUrls.json",
    JSON.stringify(videos, null, 2),
    "utf-8",
  );

  if (errors.length > 0)
    fs.writeFileSync(
      "youtubeUrlsErrors.json",
      JSON.stringify(errors, null, 2),
      "utf-8",
    );
}

module.exports = { getVideoUrls };
