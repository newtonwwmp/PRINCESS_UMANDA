const { zokou } = require("../framework/zokou");
const moment = require("moment-timezone");
const { default: axios } = require('axios');

zokou(
  {
    nomCom: 'test',
    desc: 'To check ping',
    Categorie: 'General',
    reaction: '🚨',
    fromMe: true,
  },
  async (dest, zk, commandeOptions) => {
    const { repondre } = commandeOptions;
    const start = new Date().getTime();

    await repondre('*PRINCESS_UMANDA is ALIVE*\n ```Responding at 2000 ms```');

    const end = new Date().getTime();
    await zk.sendMessage(dest, { text: `*Pong!*\n \`\`\`${end - start} ms\`\`\`` });
  }
);
