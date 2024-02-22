const fs = require("fs");

async function addSongs() {
  const songs = JSON.parse(fs.readFileSync("youtubeUrls.json"));

  const status = [];

  for (let i = 0; i < songs.length; i++) {
    const result = await fetch(
      "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,status",
      {
        method: "POST",
        headers: {
          Authorization: "token-here",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          snippet: {
            playlistId: "playlist-id-here",
            resourceId: {
              videoId: `${songs[i].videoId}`,
              kind: "youtube#video",
            },
          },
        }),
      },
    ).then((res) => res.json());

    status.push({ id: songs[i].videoId, result });
  }

  fs.writeFileSync("results.json", JSON.stringify(status, null, 2), "utf-8");
}

module.exports = { addSongs };
