import axios from 'axios'

let isProcessing = false; // متغير للتحكم في التكرار

var handler = async (m, { conn, args }) => {
    if (isProcessing) {
       // m.reply('انتظر قليلاً، يتم معالجة الطلب السابق...');
    }
     m.reply('سوف يتم الارسال قريبا'),
  
    isProcessing = false; // تعيين المتغير للتكرار إلى true قبل تنفيذ الكود

    try {
        if (!args[0]) {
            throw 'يرجى إدخال رابط الفيديو.';
        }

     //   await m.react('✔️')

        const tiktokData = await tryServer1(args[0]);

        if (!tiktokData) {
            throw 'فشل تنزيل الفيديو!';
        }

        const videoURL = tiktokData.video.noWatermark;

        await conn.sendFile(m.chat, videoURL, 'tiktok.mp4', 'تابع صاحب البوت هنا \n *_www.instagram.com/ovmar_1_*', m);
    } catch (error) {
        throw `خطأ: ${error}`;
    } finally {
        isProcessing = false; // إعادة تعيين المتغير للتكرار إلى false بعد الانتهاء من الكود
    }
};

handler.help = ['tiktok'].map((v) => v + ' <رابط>')
handler.tags = ['downloader']
handler.command = /^t(t|iktok(d(own(load(er)?)?|l))?|td(own(load(er)?)?|l))$/i
handler.register = false
handler.limit = true

export default handler

async function tryServer1(url) {
    let tiklydownAPI = `https://api.tiklydown.eu.org/api/download?url=${url}`;
    let response = await axios.get(tiklydownAPI);
    return response.data;
}