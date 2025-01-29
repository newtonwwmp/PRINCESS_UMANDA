"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
zokou({ nomCom: "repo", reaction: "😌", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = 'Hello This is  *PRINCESS_UMANDA* \n\n ' + "The Following is *MAHIYA-MD Repo.*";
    let d = ' https://github.com/newtonwwmp/MAHIYA-MD';
    let varmess = z + d;
    var img = 'https://telegra.ph/file/fe050337ca308d395301f.jpg";
    await zk.sendMessage(dest, { image: { url: img }, caption: varmess });
    //console.log("montest")
});
console.log("mon test");
/*module.exports.commande = () => {
  var nomCom = ["test","t"]
  var reaction="☺️"
  return { nomCom, execute,reaction }
};

async function  execute  (origineMessage,zok) {
  console.log("Commande saisie !!!s")
   let z ='Salut je m\'appelle *MAHIYA-MD* \n\n '+'je suis un bot Whatsapp Multi-appareil '
      let d =' developpé par *MAHIYA*'
      let varmess=z+d
      var img='https://telegra.ph/file/fe050337ca308d395301f.jpg"'
await  zok.sendMessage(origineMessage,  { image:{url:img},caption:varmess});
}  */ 
