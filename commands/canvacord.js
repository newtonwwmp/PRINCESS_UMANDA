const { zokou } = require("../framework/zokou");
const canvacord = require("canvacord");
const { uploadImageToImgur } = require("../framework/imgur");

// Generic function to create a canvacord order
function createCanvacordCommand(commandName, canvacordFunction) {
  zokou({
    nomCom: commandName,  
    categorie: "Image-Edit",
    reaction: "🎉"
  }, async (origineMessage, zk, commandeOptions) => {
    const { ms, msgRepondu, auteurMsgRepondu } = commandeOptions;
    const clientId = 'b40a1820d63cd4e'; 

    try {
      let img;
      if (msgRepondu) {
        if (msgRepondu.imageMessage) {
          const image = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
          img = await uploadImageToImgur(image, clientId);
        } else {
          img = await zk.profilePictureUrl(auteurMsgRepondu, 'image');
        }
      } else {
        img = "https://i.pinimg.com/564x/84/09/12/840912dd744e6662ab211b8070b5d84c.jpg";
      }

      const result = await canvacordFunction(img);

      await zk.sendMessage(origineMessage, { image: result }, { quoted: ms });
    } catch (error) {
      console.error(`Error when processing "${commandName}":`, error);
    }
  });
}

// Create commands using different Canvacord functions
createCanvacordCommand("shit", canvacord.shit);
createCanvacordCommand("wasted", canvacord.wasted);
createCanvacordCommand("wanted", canvacord.wanted);
createCanvacordCommand("trigger", canvacord.trigger);
createCanvacordCommand("trash", canvacord.trash);
createCanvacordCommand("rip", canvacord.rip);
createCanvacordCommand("sepia", canvacord.sepia);
createCanvacordCommand("rainbow", canvacord.rainbow);
createCanvacordCommand("hitler", canvacord.hitler);
createCanvacordCommand("invert", canvacord.invert);
createCanvacordCommand("jail", canvacord.jail);
createCanvacordCommand("affect", canvacord.affect);
createCanvacordCommand("beautiful", canvacord.beautiful);
createCanvacordCommand("blur", canvacord.blur);
createCanvacordCommand("circle", canvacord.circle);
createCanvacordCommand("facepalm", canvacord.facepalm);
createCanvacordCommand("greyscale", canvacord.greyscale);
createCanvacordCommand("joke", canvacord.jokeOverHead);
