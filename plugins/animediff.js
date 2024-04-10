import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
         let wm = global.me

        if (!text) throw `توليد صور أنمى  texts\n\n مثال usage\n${ usedPrefix + command } 1girl, blush, megane, school uniform`
        await m.reply('*Processing image*')
        await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '⌛'  }}, { messageId: m.key.id })
        try {
        let url = `https://api.xyroinee.xyz/api/ai/animediffusion?q=${text}&apikey=${global.xyro}`
        await conn.sendFile(m.chat, await(await fetch(url)).buffer(), 'image.jpg', wm, m)
        m.react(done)
      } catch (e) {
        console.log(e)
        m.reply(eror)
      }

    }


handler.help = ['animediff <text>']
handler.tags = ['drawing']
handler.command = /^(animediff)$/i

export default handler