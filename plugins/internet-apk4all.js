import { search, download } from 'aptoide-scraper';

const handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return conn.reply(m.chat, 'لـ تحميل التطبيقات من قم بكتابة هاذا الأمر \\n مثـال \n .apkmod facebook lite', m);

  try {
    let searchResults = await search(text);
    if (searchResults.length === 0) {
      return conn.reply(m.chat, '🚩 *لم يتم العثور على نتائج لهذا التطبيق*', m);
    }

    let data = await download(searchResults[0].id);
    if (!data || !data.name || !data.package || !data.lastup || !data.size || !data.dllink || !data.icon) {
      return conn.reply(m.chat, '🚩 *تعذر الحصول على تفاصيل التطبيق*', m);
    }

    let response = `💌 *اسم التطبيق:* ${data.name}\n📦 *الباقة:* ${data.package}\n🕒 *آخر تحديث:* ${data.lastup}\n📥 *الحجم:* ${data.size}`;

    if (data.size.includes('GB') || parseFloat(data.size.replace(' MB', '')) > 999) {
      return conn.reply(m.chat, '🚩 *حجم الملف كبير جدًا*', m);
    }

    await conn.sendMessage(m.chat, { text: response, contextInfo: { externalAdReply: { title: data.name, body: wm, sourceUrl: md, thumbnailUrl: data.icon, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true } } }, { quoted: m });
    await conn.sendMessage(m.chat, { document: { url: data.dllink }, mimetype: 'application/vnd.android.package-archive', fileName: data.name + '.apk', caption: null }, { quoted: m });
  } catch (error) {
    console.error(error);
    return conn.reply(m.chat, '🚩 *حدث خطأ أثناء معالجة الطلب*', m);
  }
};

handler.tags = ['applications'];
handler.help = ['apkmod'];
handler.command = /^(apkmod|modapk|dapk2|aptoide|aptoidedl)$/i;

export default handler;