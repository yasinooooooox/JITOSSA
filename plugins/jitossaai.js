import axios from 'axios';

let autoaiEnabled = {}; // قائمة لتخزين حالة الذكاء الاصطناعي لكل مستخدم

export const handler = async (m, { conn, text }) => {
  autoaiEnabled[m.sender] = true; // تفعيل وضع الذكاء الاصطناعي تلقائياً

  if (text && text.trim() === '.autobard off') {
    autoaiEnabled[m.sender] = false;
    m.reply("[ ✓ ] تم إلغاء وضع الذكاء الاصطناعي بنجاح. يمكنك الآن استخدام الأوامر بشكل عادي.");
    return; // للخروج من دالة المعالجة إذا تم إلغاء الوضع
  }

  if (!m.text) return;

  let name = conn.getName(m.sender);
  await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});

  try {
    const response = await axios.get(`https://api.justifung.tech/api/bard?q=${encodeURIComponent(m.text)}&apikey=Nour`)
    const responseData = response.data;
    const hasil = responseData;
    await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key }});
    m.reply(hasil.result[0]);
    autoaiEnabled[m.sender] = false; // تعطيل وضع الذكاء الاصطناعي بعد الاستخدام الواحد
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

handler.command = ['autobard'];
handler.tags = ["ai"]
handler.help = ['autobard']

export default handler;