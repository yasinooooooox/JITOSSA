import axios from 'axios'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    m.reply(wait);
    let url = `https://kiicodeofficial.my.id/api/sfw/${command}?apikey=Ceri`;
    let response = await axios.get(url, { responseType: 'arraybuffer' });
    conn.sendFile(m.chat, response.data, "", "_ثم إرسال الصورة بنجاح 🏃🏻‍♀️..._\n www.instagram.com/ovmar_1", m);
}
handler.help = ['ayano','bocchi','chisato','ikuyo','kaguya','loli','rlas','takina','yotsuba','yumeko']
handler.command = /^(ayano|bocchi|chisato|ikuyo|kaguya|loli|rlas|takina|yotsuba|yumeko)$/i
handler.tags = ['anime']
handler.limit = true;
export default handler;
