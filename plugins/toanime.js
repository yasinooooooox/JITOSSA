import axios from 'axios';
import uploadImage from '../lib/uploadImage.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
conn.toanime = conn.toanime ? conn.toanime : {};
if (m.chat in conn.toanime) {
return m.reply("_Mohon Tunggu Sebentar, Masih Ada Proses Yang Belum Selesai_");
}
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw '*تحويل صورتك لشكل الأن متوفر في هاظا الأمر* \n\n.toanime بعدها قم بالرد على صورتك'
m.reply(wait)
let media = await q.download()
let url = await uploadImage(media)
conn["toanime"][m.chat] = true;
try {
        const openAIResponse = await processImageAndUpload(media);

        if (openAIResponse) {
            const result = openAIResponse;
            const tag = `@${m.sender.split('@')[0]}`;

            await conn.sendMessage(m.chat, {
                image: {
                    url: result
                },
                caption: `𝘑𝘪𝘵𝘰𝘴𝘴𝘴 𝘥𝘰𝘯𝘦 3^\nwww.instagram.com/ovmar_1`,
                mentions: [m.sender]
            }, {
                quoted: m
            })
        } else {
            console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
        }
    } catch (e) {
        await m.reply('تأكد من جودة الصورة والوجه')
    }
delete conn.toanime[m.chat];
}
handler.command = /^(toanime|jadianime)$/i
handler.help = ['toanime']
handler.tags = ['ai']
handler.register = false
handler.limit = false

export default handler

async function processImageAndUpload(buffer) {
    try {
        
        const base64String = Buffer.from(buffer, 'binary').toString('base64');

        const apiResponse = await axios.post('https://www.drawever.com/api/photo-to-anime', {
            data: `data:image/png;base64,${base64String}`,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return 'https://www.drawever.com' + apiResponse.data.urls[1] || 'https://www.drawever.com' + apiResponse.data.urls[0];
    } catch (error) {
        throw error;
    }
}