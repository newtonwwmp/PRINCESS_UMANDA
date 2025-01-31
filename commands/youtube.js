const { zokou } = require("../framework/zokou");
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const fs = require('fs');
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

zokou({
  nomCom: "song",
  categorie: "Search",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Which song do you want?");
    return;
  }

  try {
    let topo = arg.join(" ");
    const search = await yts(topo);
    const videos = search.videos;

    if (!videos || videos.length === 0) {
      repondre('No video found.');
      return;
    }

    const video = videos[0];
    const urlElement = video.url;

    let infoMess = {
      image: { url: video.thumbnail },
      caption: `🎵 *Song:* _${video.title}_\n⏳ *Duration:* _${video.timestamp}_\n🔗 *URL:* _${video.url}_\n\n🎧 _PRINCESS_UMANDA SONG DOWNLOADING..._\n`
    };

    zk.sendMessage(origineMessage, infoMess, { quoted: ms });

    // File paths
    const tempFilePath = path.join(__dirname, "temp_audio.mp4");
    const outputFilePath = path.join(__dirname, "audio.mp3");

    // Download audio
    const audioStream = ytdl(urlElement, { filter: 'audioonly', quality: 'highestaudio' });

    const fileStream = fs.createWriteStream(tempFilePath);
    audioStream.pipe(fileStream);

    fileStream.on('finish', () => {
      console.log("Download complete! Converting to MP3...");

      // Convert to MP3 using ffmpeg
      ffmpeg(tempFilePath)
        .toFormat("mp3")
        .on("end", () => {
          console.log("MP3 conversion finished!");

          // Send the audio file
          zk.sendMessage(origineMessage, { audio: { url: outputFilePath }, mimetype: 'audio/mp3' }, { quoted: ms, ptt: false });

          // Delete temp files after sending
          fs.unlinkSync(tempFilePath);
          fs.unlinkSync(outputFilePath);
        })
        .on("error", (err) => {
          console.error("FFmpeg error:", err);
          repondre("An error occurred while converting the audio.");
        })
        .save(outputFilePath);
    });

    fileStream.on('error', (error) => {
      console.error('Error writing audio file:', error);
      repondre('An error occurred while writing the audio file.');
    });

  } catch (error) {
    console.error('Error during search or download:', error);
    repondre('An error occurred during search or download.');
  }
});
