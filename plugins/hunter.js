import fetch from 'node-fetch'
import { pinterest } from '../lib/scrape.js'

let handler = async (m, { conn, command, text, usedPrefix }) => {

  try {
    const hasil = await pinterest('هانتر × هانتر 4K');
    let gambarUrls = hasil.slice(0, 20); // استرجاع 20 صورة

    // ترتيب الصور بشكل عشوائي
    for (let i = gambarUrls.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gambarUrls[i], gambarUrls[j]] = [gambarUrls[j], gambarUrls[i]];
    }

    // إرسال 5 صور بشكل عشوائي
    for (let i = 0; i < 5; i++) {
      let imageUrl = gambarUrls[i];
      let imageRes = await fetch(imageUrl);
      let imageBuffer = await imageRes.buffer();

      // إرسال الصورة إلى الدردشة
      await conn.sendFile(m.chat, imageBuffer, 'صورة.jpg', '');

      // انتظار قبل إرسال الصورة القادمة
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  } catch (e) {
    console.log(e)
    conn.reply(m.chat, 'حدث خطأ', m)
  }
}

handler.help = ['hunter']
handler.tags = ['anime']
handler.command = /^hunter$/i
export default handler