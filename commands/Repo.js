const {
  king
} = require("../france/king");
king({
  'nomCom': "repo",
  'aliases': ['sc', 'script'],
  'reaction': '🤍',
  'nomFichier': __filename
}, async (_0x25b7b6, _0x43813d, _0x270eb0) => {
  const {
    repondre: _0xea69b4,
    auteurMessage: _0x45fd7b
  } = _0x270eb0;
  try {
    const _0x42fd81 = await fetch("https://api.github.com/repos/franceking1/PRINCESS_UMANDA");
    const _0x29108f = await _0x42fd81.json();
    if (_0x29108f) {
      const _0x54863e = {
        'stars': _0x29108f.stargazers_count,
        'forks': _0x29108f.forks_count,
        'update': _0x29108f.updated_at,
        'owner': _0x29108f.owner.login
      };
      const _0x33a071 = new Date(_0x29108f.created_at).toLocaleDateString('en-GB');
      const _0x456d8d = "*HEY 👋 THIS IS PRINCESS_UMANDA.*\n\nI'm A WhatsApp bot created by *©Mihiranga id*.\n\n[✨] *STARS:* - " + _0x54863e.stars + "\n[🧧] *FORKS:* - " + _0x54863e.forks + "\n[📅] *RELEASE DATE:* - " + _0x33a071 + "\n[🗼] *REPO:* - " + _0x29108f.html_url + "\n[👨‍💻] *OWNER:* - *Mihiranga id* \n__________________________________\n             *Made With* 🤍";
      await _0x43813d.sendMessage(_0x25b7b6, {
        'text': _0x456d8d,
        'contextInfo': {
          'mentionedJid': [_0x45fd7b],
          'externalAdReply': {
            'title': "THE PRINCESS_UMANDA",
            'body': "POWERED BY Mihiranga id",
            'thumbnailUrl': "https://telegra.ph/file/4143dfac775bff078cc5a.jpg",
            'sourceUrl': "##",
            'mediaType': 0x1,
            'renderLargerThumbnail': true
          }
        }
      });
    } else {
      console.log("Could not fetch data");
      _0xea69b4("An error occurred while fetching the repository data.");
    }
  } catch (_0x47dea8) {
    console.error("Error fetching repository data:", _0x47dea8);
    _0xea69b4("An error occurred while fetching the repository data.");
  }
});
