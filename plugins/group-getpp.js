import fetch from 'node-fetch'
let handler = async(m, { conn }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    let url = await conn.profilePictureUrl(who, 'image')
    await conn.sendFile(m.chat, url, 'profile.jpg', `هاذه صورتك ياصديقي ✔️ @${who.split`@`[0]}`, m, null, { mentions: [who]})
}
handler.command = /^(getpp|getprofile)$/i
handler.help = ['getprofile']
handler.tags = ['tools']
export default handler