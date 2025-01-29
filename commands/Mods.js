const { zokou } = require('../framework/zokou');
const axios = require("axios");
let { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const { isUserBanned, addUserToBanList, removeUserFromBanList } = require("../bdd/banUser");
const { addGroupToBanList, isGroupBanned, removeGroupFromBanList } = require("../bdd/banGroup");
const { isGroupOnlyAdmin, addGroupToOnlyAdminList, removeGroupFromOnlyAdminList } = require("../bdd/onlyAdmin");
const { removeSudoNumber, addSudoNumber, issudo } = require("../bdd/sudo");

const sleep = (ms) => {
  return new Promise((resolve) => { setTimeout(resolve, ms) });
};

zokou({ nomCom: "tgs", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, nomAuteurMessage, superUser } = commandeOptions;

  if (!superUser) {
    repondre('Only Mods can use this command');
    return;
  }

  if (!arg[0]) {
    repondre("Put a Telegram sticker link.");
    return;
  }

  let lien = arg.join(' ');
  let name = lien.split('/addstickers/')[1];
  let api = `https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(name)}`;

  try {
    let stickers = await axios.get(api);
    let type = stickers.data.result.is_animated || stickers.data.result.is_video ? 'animated sticker' : 'not animated sticker';

    let msg = `   PRINCESS_UMANDA-stickers-dl

*Name:* ${stickers.data.result.name}
*Type:* ${type} 
*Length:* ${(stickers.data.result.stickers).length}

Downloading...`;

    await repondre(msg);

    for (let i = 0; i < (stickers.data.result.stickers).length; i++) {
      let file = await axios.get(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${stickers.data.result.stickers[i].file_id}`);
      let buffer = await axios({
        method: 'get',
        url: `https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/${file.data.result.file_path}`,
        responseType: 'arraybuffer',
      });

      const sticker = new Sticker(buffer.data, {
        pack: nomAuteurMessage,
        author: "PRINCESS_UMANDA",
        type: StickerTypes.FULL,
        categories: ['🤩', '🎉'],
        id: '12345',
        quality: 50,
        background: '#000000'
      });

      const stickerBuffer = await sticker.toBuffer();

      await zk.sendMessage(
        dest,
        { sticker: stickerBuffer },
        { quoted: ms }
      );
    }
  } catch (e) {
    repondre("We got an error \n", e);
  }
});

zokou({ nomCom: "save", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre, msgRepondu, superUser, auteurMessage } = commandeOptions;

  if (superUser) {
    if (msgRepondu) {
      console.log(msgRepondu);
      let msg;

      if (msgRepondu.imageMessage) {
        let media = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
        msg = {
          image: { url: media },
          caption: msgRepondu.imageMessage.caption,
        };
      } else if (msgRepondu.videoMessage) {
        let media = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
        msg = {
          video: { url: media },
          caption: msgRepondu.videoMessage.caption,
        };
      } else if (msgRepondu.audioMessage) {
        let media = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
        msg = {
          audio: { url: media },
          mimetype: 'audio/mp4',
        };
      } else if (msgRepondu.stickerMessage) {
        let media = await zk.downloadAndSaveMediaMessage(msgRepondu.stickerMessage);
        let stickerMess = new Sticker(media, {
          pack: 'PRINCESS_UMANDA',
          type: StickerTypes.CROPPED,
          categories: ["🤩", "🎉"],
          id: "12345",
          quality: 70,
          background: "transparent",
        });
        const stickerBuffer2 = await stickerMess.toBuffer();
        msg = { sticker: stickerBuffer2 };
      } else {
        msg = { text: msgRepondu.conversation };
      }

      zk.sendMessage(auteurMessage, msg);
    } else {
      repondre('Mention the message that you want to save');
    }
  } else {
    repondre('Only Mods can use this command.');
  }
});
