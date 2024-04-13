import fetch from 'node-fetch'
import fg from 'api-dylux'

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `يرجى إرسال رابط الفيديو على فيسبوك\n\n📌 مثال :\n*${usedPrefix + command}* https://www.facebook.com/Ankursajiyaan/videos/981948876160874/?mibextid=rS40aB7S9Ucbxw6v`;
  }

  const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.watch)\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
  if (!urlRegex.test(args[0])) {
    throw '🙁 يرجى إدخال رابط صحيح.'
  }

 await conn.reply(m.chat, wait, m);

  try {
    const result = await fg.fbdl(args[0]);
    const tex = `
       ▢  _*JITOSSA FB2*_

> ↳ *العنوان:* _${result.title}_`

    const response = await fetch(result.videoUrl)
    const arrayBuffer = await response.arrayBuffer()
    const videoBuffer = Buffer.from(arrayBuffer)
    
    conn.sendFile(m.chat, videoBuffer, 'fb.mp4', tex, m)
  } catch (error) {
    console.log(error)
    m.reply('🙁 حدث خطأ أثناء معالجة الطلب. يرجى المحاولة مرة أخرى لاحقًا.')
  }
}

handler.help = ['facebook2 <url>']
handler.tags = ['downloader']
handler.command = /^(facebook2|fb2|fbdl2)$/i

export default handler