const { zokou } = require('../framework/zokou');
const { addOrUpdateDataInAlive, getDataFromAlive } = require('../bdd/alive');
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou(
    {
        nomCom: 'alive',
        categorie: 'General'
    }, async (dest, zk, commandeOptions) => {

        const { ms, arg, repondre, superUser } = commandeOptions;

        const data = await getDataFromAlive();

        if (!arg || !arg[0] || arg.join('') === '') {

            if (data) {

                const { message, lien } = data;

                var mode = "public";
                if ((s.MODE).toLocaleLowerCase() != "yes") {
                    mode = "private";
                }

                moment.tz.setDefault('EAT');

                // Create date and time in EAT
                const temps = moment().format('HH:mm:ss');
                const date = moment().format('DD/MM/YYYY');

                const alivemsg = `
*Owner* : ${s.OWNER_NAME}
*Mode* : ${mode}
*Date* : ${date}
*Time* : ${temps}

${message}

*PRINCESS_UMANDA is alive!*`;

                if (lien.match(/\.(mp4|gif)$/i)) {
                    try {
                        zk.sendMessage(dest, { video: { url: lien }, caption: alivemsg }, { quoted: ms });
                    }
                    catch (e) {
                        console.log("🥵🥵 Menu error " + e);
                        repondre("🥵🥵 Menu error " + e);
                    }
                }
                // Checking for .jpeg or .png
                else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
                    try {
                        zk.sendMessage(dest, { image: { url: lien }, caption: alivemsg }, { quoted: ms });
                    }
                    catch (e) {
                        console.log("🥵🥵 Menu error " + e);
                        repondre("🥵🥵 Menu error " + e);
                    }
                }
                else {
                    repondre(alivemsg);
                }

            } else {
                if (!superUser) { repondre("There is no alive message for this bot."); return; }

                await repondre("👋 *HY WELCOME PRINCESS_UMANDA IS ALIVE NOW* 👋");
                repondre(" *AUTO STATUS SEEN, FAKE RECORDING AUDIO, AUTO STATUS DOWNLOAD, 190+ COMMANDS*");
            }
        } else {

            if (!superUser) { repondre("Only the owner can modify the alive message."); return; }

            const texte = arg.join(' ').split(';')[0];
            const tlien = arg.join(' ').split(';')[1];

            await addOrUpdateDataInAlive(texte, tlien);

            repondre('Alive message refreshed successfully');
        }
    });
