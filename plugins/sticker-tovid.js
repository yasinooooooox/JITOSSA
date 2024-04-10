import { webp2mp4 } from '../lib/webp2mp4.js'

let handler = async (m, { conn, usedPrefix, command }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/webp/.test(mime) || /ptv/.test(q.mtype) || q.isAnimated) {
	let out = await q.download()
	if (/webp/.test(mime)) out = await webp2mp4(out).catch(_ => null) || Buffer.alloc(0)
	await conn.sendFile(m.chat, out, '', '*DONE*', m)
	} else throw `تحويل الملصق إلى فيديو \n\n *${usedPrefix + command}*`
}

handler.help = [''tovid2']
handler.tags = ['sticker']
handler.command = /^((tovid2))$/i

export default handler
