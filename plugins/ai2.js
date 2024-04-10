import fetch from 'node-fetch'
let handler = async (m, { text,  usedPrefix,  command }) => {
    if (!text) throw `Mau Nanya Apa???`
let zeltoria = await fetch(`https://api.botcahx.live/api/search/openai-chat?text=${text}&apikey=AXreaUg6`)
let hasil = await zeltoria.json()
 m.reply(`${hasil.message}`.trim())
    }  
handler.help = ['ai2', 'openai2']
handler.tags = ['ai']
handler.command = /^(ai2|yae2|openai2)$/i
export default handler