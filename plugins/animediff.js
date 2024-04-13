const fetch = require('node-fetch');

const handler = async (m, { text }) => {
  if (!text) return conn.reply(m.chat, '*Example*: .animediff a girl', m);
  
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });

  let url = `https://itzpire.site/ai/animediff?prompt=${encodeURIComponent(text)}&model=animeGen`;
  let image = (await (await fetch(url)).buffer()).toString('base64');
  conn.sendFile(m.chat, `data:image/jpeg;base64,${image}`, 'freefire.jpg',  `*Prompt:* ${text}`, m);
};

handler.help = ['animediff *qᴜᴇʀʏ*'];
handler.tags = ["ai"];
handler.command = /^animediff$/i;
handler.register = true;
handler.limit = true;

module.exports = handler;