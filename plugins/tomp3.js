import { toAudio } from '../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    if (!/video|audio/.test(mime)) throw `*تحويل مقاطع فيديو إلى أغنية عن طريق كتابة هاذا الأمر*\n\n*${usedPrefix + command}*`
    let media = await q.download?.()
    if (!media) throw 'خطأ في التحميل حاول لاحقا'
    let audio = await toAudio(media, 'mp4')
    if (!audio.data) throw 'خطأ فى إنشاء المقطع الصوتي'
    conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, null, { mimetype: 'audio/mp4' })
}
handler.help = ['tomp3']
handler.tags = ['audio-changer']
handler.command = /^to(mp3|a(udio)?)$/i

export default handler
