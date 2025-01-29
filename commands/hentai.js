const {zokou } = require("../framework/zokou");
const axios = require('axios');

zokou({
  nomCom: "hwaifu",
  categorie: "Hentai",
  reaction: "🙄"
}, async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  const url = 'https://api.waifu.pics/nsfw/waifu'; // Remplace avec ton lien réel

  try { 
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;
      zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms });
    }
  } catch (error) {
    repondre('Erreur lors de la récupération des données : ' + error);
  }
});

/////////////// hneko //////////
zokou({
  nomCom: "trap",
  categorie: "Hentai",
  reaction: "🙄"
}, async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  const url = 'https://api.waifu.pics/nsfw/trap'; // Remplace avec ton lien réel

  try { 
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;
      zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms });
    }
  } catch (error) {
    repondre('Erreur lors de la récupération des données :', error);
  }
});

zokou({
  nomCom: "hneko",
  categorie: "Hentai",
  reaction: "🙄"
}, async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  const url = 'https://api.waifu.pics/nsfw/neko'; // Remplace avec ton lien réel

  try { 
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;
      zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms });
    }
  } catch (error) {
    repondre('Erreur lors de la récupération des données :', error);
  }
});

zokou({
  nomCom: "blowjob",
  categorie: "Hentai",
  reaction: "🙄"
}, async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  const url = 'https://api.waifu.pics/nsfw/blowjob'; // Remplace avec ton lien réel

  try { 
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;
      zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms });
    }
  } catch (error) {
    repondre('Erreur lors de la récupération des données :', error);
  }
});
