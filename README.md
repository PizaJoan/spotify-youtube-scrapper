## Spotify to youtube scrapper

This is a project that comes from my try to get old spotify playlist into youtube playlist using **puppeteer**

In case interested run the following:

`  pnpm install`

Need to download the headless browser

`  pnpm run configure`

- In the `run.js` just leave the `await getSongs()` line uncommented and comment the rest.You need to add in `get-songs.js` your spotify playlist URL. Then run `pnpm run start`. It may last a while, deppending on the size of your playlist.

It will generate a `songs.json` with some data like artist, song and possible youtube search query.

- After we have to gather the info from youtube with the `songs.json` generated. To do so, begin on `run.js` and leave just the second call `await getVideoUrls()`. Again, `pnpm run start`.

This will get on youtube, search the artist and song and retrieve the first result url for each song. So it take a lot of time. At the end, you'll get a `youtubeUrls.json` and, if something went wrong, a `error.json` with specific videos that caused an error.

- Last leave the last line in `run.js` uncommented and comment the rest, which is `await addSongs()`. Here, you have to modify a bit. You'll need an Authorization token from Google Oauth. I've tried with [Google's Oauth Playground](https://developers.google.com/oauthplayground/). But it worked just for like 160 songs. Also you'll need your playlist ID.

It just creates a request with that playlist id and inserts all the songs retrieved before.

-- Juan Piza
