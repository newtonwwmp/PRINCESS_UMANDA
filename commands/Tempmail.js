"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
zokou({ nomCom: "tempmail", reaction: "😾", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = '*PRINCESS_UMANDA* Temporary emails,Powered by *MIHIRANGA* \n\n ' + "Click the link below to create unlimited TEMPORARY Emails. Powered by *MAHIYA-MD.*";
    let d = ' https://email10min.com';
    let varmess = z + d;
    var img = 'https://telegra.ph/file/7a8bf9f622dd6ccb403df.mp4';
    await zk.sendMessage(dest, { image: { url: img }, caption: varmess });
    //console.log("montest")
