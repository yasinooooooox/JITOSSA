let { tiktok2 } = require('../lib/scrape.js'); // استيراد دالة tiktok2 من ملف scrape.js

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  if (!text) { // إذا لم يتم تحديد رابط TikTok
    conn.sendPresenceUpdate("composing", m.chat); // إرسال إشعار "يكتب" للمستخدم
    return conn.reply(m.chat, `• *مثال:* ${usedPrefix + command} https://vm.tiktok.com/xxxxx`, m); // إرسال رسالة مع توضيح المثال
  }
  if (!text.match(/tiktok/gi)) { // إذا لم يكن الرابط من TikTok
    return conn.reply(m.chat, 'تأكد من أن الرابط هو من TikTok', m); // إرسال رسالة تحذير بشأن رابط غير صالح
  }
  conn.sendMessage(m.chat, { // إرسال رسالة "يكتب" مع الرمز الزمني
    react: {
      text: '🕒',
      key: m.key,
    }
  });
  try {
    let old = new Date(); // حفظ الزمن الحالي
    let p = await tiktok2(`${text}`); // تنزيل مقطع الفيديو من TikTok
    let kemii = `乂  *T I K T O K*\n\n`; // إعداد الرسالة
    kemii += `┌  ◦ *العنوان* : ${p.title}\n`; // إضافة عنوان المقطع
    kemii += `└  ◦ *الوقت* : ${((new Date - old) * 1)} ms\n\n`; // حساب الوقت المستغرق للتنزيل
    kemii += `ᴋɪᴋᴜ - ᴡᴀʙᴏᴛ ᴍᴀᴅᴇ ʙʏ ᴛᴀᴋᴀꜱʜɪ ᴋᴇᴍɪɪ`; // إضافة معلومات إضافية
    await conn.sendFile(m.chat, p.no_watermark, 'tiktok.mp4', kemii, m); // إرسال مقطع الفيديو
    conn.sendMessage(m.chat, { // إرسال رسالة "تم" مع الرمز الزمني
      react: {
        text: '✅',
        key: m.key,
      }
    });
   } catch (e) { // في حالة حدوث خطأ أثناء التنفيذ
    console.log(e); // إظهار الخطأ في وحدة التحكم
    conn.sendMessage(m.chat, { // إرسال رسالة "فشل" مع الرمز الزمني
      react: {
        text: '🍉',
        key: m.key,
      }
    });
  }

};

handler.help = ['tiktok'].map(v => v + ' *<رابط>*'); // المساعدة للأمر
handler.tags = ['downloader']; // الوسوم المرتبطة بالأمر
handler.command = /^(tiktok|tt|tiktokdl|tiktoknowm)$/i; // الأمر لتنشيط الدالة
handler.limit = false; // تعطيل الحد الأقصى للاستخدام
handler.group = false; // تعيين الأمر للمحادثات الخاصة

module.exports = handler; // تصدير الدالة handler