import axios from 'axios';

let autoaiEnabled = {}; // قائمة لتخزين حالة الذكاء الاصطناعي لكل مستخدم

export const handler = async (m, { conn, text }) => {
  autoaiEnabled[m.sender] = autoaiEnabled[m.sender] ?? false; // تحديد حالة الذكاء الاصطناعي لكل مستخدم

  if (text == "on") {
    if (!autoaiEnabled[m.sender]) { // التحقق من أن وضع الذكاء الاصطناعي غير مُفعّل
      autoaiEnabled[m.sender] = true;
      m.reply("[ ✓ ] تم تفعيل وضع الذكاء الاصطناعي بنجاح. يمكنك الآن التحدث مباشرة مع الذكاء الاصطناعي.");
    } else {
      m.reply("[ ✖️ ] وضع الذكاء الاصطناعي مفعل بالفعل.");
    }
  } else if (text == "off") {
    autoaiEnabled[m.sender] = false;
    m.reply("[ ✓ ] تم إلغاء وضع الذكاء الاصطناعي بنجاح.");
  }
};

handler.before = async (m, { conn }) => {
  if (!autoaiEnabled[m.sender]) return; // التحقق من إذا كان وضع الذكاء الاصطناعي مُفعّلاً أم لا
  if (m.isBaileys && m.fromMe) return;
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