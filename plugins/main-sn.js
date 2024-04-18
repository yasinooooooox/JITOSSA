import { createHash } from 'crypto'

let handler = async function (m, { conn, text, usedPrefix }) {
  let serialNumber = createHash('md5').update(m.sender).digest('hex')
  m.reply(`
┌─「 *رقم التسلسل* 」─
▢ *رقم التسلسل* : ${serialNumber}
└──────────────
`.trim())
}

handler.help = ['mysn']
handler.tags = ['owner']
handler.command = ['nserie', 'sn', 'mysn']
handler.register = true

export default handler