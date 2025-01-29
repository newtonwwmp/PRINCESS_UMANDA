const { zokou } = require("../framework/zokou");
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const fs = require('fs');
const yt = require("../framework/dl/ytdl-core.js");
const ffmpeg = require("fluent-ffmpeg");
const yts1 = require("youtube-yts");

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

    if (videos && videos.length > 0 && videos[0]) {
      const urlElement = videos[0].url;

      let infoMess = {
        image: { url: videos[0].thumbnail },
        caption: `\n*Song name:* _${videos[0].title}_\n*Time:* _${videos[0].timestamp}_\n*URL:* _${videos[0].url}_\n\n_*PRINCESS_UMANDA SONG DOWNLOADING...*_\n\n`
      };

      zk.sendMessage(origineMessage, infoMess, { quoted: ms });

      // Obtain audio stream from video
      const audioStream = ytdl(urlElement, { filter: 'audioonly', quality: 'highestaudio' });

      // Save the audio file locally
      const filename = './audio.mp3';
      const fileStream = fs.createWriteStream(filename);
      audioStream.pipe(fileStream);

      fileStream.on('finish', () => {
        // Send the audio file
        zk.sendMessage(origineMessage, { audio: { url: filename }, mimetype: 'audio/mp3' }, { quoted: ms, ptt: false });
        console.log("Audio file sent!");
      });

      fileStream.on('error', (error) => {
        console.error('Error writing audio file:', error);
        repondre('An error occurred while writing the audio file.');
      });
    } else {
      repondre('No video found.');
    }
  } catch (error) {
    console.error('Error during search or download:', error);
    repondre('An error occurred during search or download.');
  }
});

zokou({
  nomCom: "video",
  categorie: "Search",
  reaction: "🎥"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, ms, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("Insert video name.");
    return;
  }

  const topo = arg.join(" ");
  try {
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const Element = videos[0];

      let InfoMess = {
        image: { url: videos[0].thumbnail },
        caption: `*Video name:* _${Element.title}_\n*Time:* _${Element.timestamp}_\n*URL:* _${Element.url}_\n\n_*PRINCESS_UMANDA On downloading...*`
      };

      zk.sendMessage(origineMessage, InfoMess, { quoted: ms });

      // Get video info from YouTube link
      const videoInfo = await ytdl.getInfo(Element.url);
      // Choose the best available video format
      const format = ytdl.chooseFormat(videoInfo.formats, { quality: '18' });
      // Start downloading the video stream
      const videoStream = ytdl.downloadFromInfo(videoInfo, { format });

      // Save the video file locally
      const filename = './video.mp4';
      const fileStream = fs.createWriteStream(filename);
      videoStream.pipe(fileStream);

      fileStream.on('finish', () => {
        // Send the video file
        zk.sendMessage(origineMessage, { video: { url: filename }, caption: "*PRINCESS_UMANDA*", gifPlayback: false }, { quoted: ms });
      });

      fileStream.on('error', (error) => {
        console.error('Error writing video file:', error);
        repondre('An error occurred while writing the video file.');
      });
    } else {
      repondre('No video found.');
    }
  } catch (error) {
    console.error('Error during search or download:', error);
    repondre('An error occurred during search or download.');
  }
});
