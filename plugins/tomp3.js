import { toAudio } from '../lib/converter.js';

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q || q.msg).mimetype || q.mediaType || '';
    if (!/video|audio/.test(mime)) throw `رد برسالة صوتية أو فيديو تريد تحويلها إلى صوت/MP3 باستخدام الأمر *${usedPrefix + command}*`;

    let waitMessage = await conn.sendMessage(m.chat, 'جاري تحويل الملف، يرجى الانتظار...', { quoted: m });

    try {
        let media = await q.download();
        if (!media) throw 'لا يمكن تحميل الملف';
        let audio = await toAudio(media, 'mp4');
        if (!audio.data) throw 'لا يمكن تحويل الملف إلى صوت';
        conn.sendMessage(m.chat, { audio: audio.data, mimetype: 'audio/mpeg' }, { quoted: m });
    } catch (error) {
        throw error; // تعامل مع الخطأ حسب احتياجاتك
    } finally {
        await conn.deleteMessage(m.chat, waitMessage.key);
    }
};

handler.help = ['tomp3'];
handler.tags = ['upload'];
handler.alias = ['tomp3', 'toaudio'];
handler.command = /^to(mp3|audio)$/i;

export default handler;