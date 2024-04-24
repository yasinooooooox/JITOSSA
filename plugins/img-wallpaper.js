
import fg from 'api-dylux';
let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw ` ${mssg.notext}`
  try {
    let res = await fg.wallpaper(text);
    let re = pickRandom(res);
    await conn.sendMessage(m.chat, { image: { url: re.image[0] }, caption: `✅ ${mssg.result}` }, { quoted: m });
  } catch (error) {
   m.reply(` ${mssg.error}`)
  }
  
}
handler.help = ['wallpaper']
handler.tags = ['image-edit']
handler.command = ['wallpaper', 'wallpapers', 'wp']
handler.diamond = true

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
