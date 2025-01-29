const { zokou } = require("../framework/zokou");
const fs = require("fs");
const { exec } = require("child_process");

// Generate a random filename
const filename = `${Math.random().toString(36)}`;

zokou(
  {
    nomCom: "deep",
    categorie: "Audio-Edit",
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, msgRepondu } = commandeOptions;

    if (msgRepondu) {
      if (msgRepondu.audioMessage) {
        const media = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
        let set = "-af atempo=4/4,asetrate=44500*2/3";
        let ran = `${filename}.mp3`;

        try {
          exec(`ffmpeg -i ${media} ${set} ${ran}`, (err) => {
            fs.unlinkSync(media);
            if (err) return repondre("Error during the procedure " + err);

            let buff1 = fs.readFileSync(ran);
            zk.sendMessage(dest, { audio: buff1, mimetype: "audio/mpeg" }, { quoted: ms });
            fs.unlinkSync(ran);
          });
        } catch (e) {
          repondre("Error");
        }
      } else {
        repondre("The command only works with audio messages");
      }
    } else {
      repondre("Please mention an audio");
    }
  }
);

zokou(
  {
    nomCom: "emojimix",
    categorie: "Conversion",
  },
  async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms } = commandeOptions;

    if (!arg[0] || arg.length !== 1) {
      repondre("Incorrect use. Example: .emojimix 😀;🥰");
      return;
    }

    const emojis = arg.join(" ").split(";");

    if (emojis.length !== 2) {
      repondre("Please specify two emojis using a ';' as a separator.");
      return;
    }

    const emoji1 = emojis[0].trim();
    const emoji2 = emojis[1].trim();

    try {
      const axios = require("axios");
      const response = await axios.get(`https://levanter.onrender.com/emix?q=${emoji1}${emoji2}`);

      if (response.data.status === true) {
        const { Sticker, StickerTypes } = require("wa-sticker-formatter");

        let stickerMess = new Sticker(response.data.result, {
          pack: "PRINCESS_UMANDA",
          type: StickerTypes.CROPPED,
          categories: ["🤩", "🎉"],
          id: "12345",
          quality: 70,
          background: "transparent",
        });

        const stickerBuffer2 = await stickerMess.toBuffer();
        zk.sendMessage(dest, { sticker: stickerBuffer2 }, { quoted: ms });
      } else {
        repondre("Unable to create emoji mix.");
      }
    } catch (error) {
      repondre("An error occurred while creating the emoji mix: " + error);
    }
  }
);
