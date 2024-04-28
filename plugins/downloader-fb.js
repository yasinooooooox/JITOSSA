import fetch from 'node-fetch'
import fg from 'api-dylux'


const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `*التحميل من فيسبوك*\n\n قم *بإرسال رابط الفيديو فيسبوك مع أمر التحميل هاكذا*\n ${usedPrefix + command} https://www.facebook.com/100082145413578/videos/795491955946201/?mibextid=rS40aB7S9Ucbxw6v`;
  }

  const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.watch)\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
  if (!urlRegex.test(args[0])) {
    throw 'أسفة ولكن الرابط لايعمل .'
  }

 await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '⌛'  }}, { messageId: m.key.id })

  try {
    const result = await fg.fbdl(args[0]);
    const tex = `> ғʙ ᴊɪᴛᴏssᴀ \n instagram.com/ovmar_1`

    const response = await fetch(result.videoUrl)
    const arrayBuffer = await response.arrayBuffer()
    const videoBuffer = Buffer.from(arrayBuffer)
    
    conn.sendFile(m.chat, videoBuffer, 'fb.mp4', tex, m)
  } catch (error) {
    console.log(error)
    m.reply('حدث خطأ حاول مرة أخرى رجاء أو تقدم بطلب صاحب البوت بالإصلاح أسفة')
  }
}

handler.help = ['facebook <url>']
handler.tags = ['downloader']
handler.command = /^((facebook|fb)(downloder|dl)?)$/i

export default handler
