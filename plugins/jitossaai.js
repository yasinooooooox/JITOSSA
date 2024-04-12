import axios from 'axios';

let autoaiEnabled = {}; // قائمة لتخزين حالة الذكاء الاصطناعي لكل مستخدم

let handler = async (m, { conn, text }) => {
  autoaiEnabled[m.sender] = autoaiEnabled[m.sender] ?? false; // تحديد حالة الذكاء الاصطناعي لكل مستخدم

  if (!text) {
    throw `*يمكنك الآن التحدث مباشرة مع الذكاء الاصطناعي بدون استخدام أوامر. سوف يجيبك مباشرة.*\nلتفعيل الوضع الذكي، اكتب:\n.autoai on\nلإلغاء الوضع الذكاء الاصطناعي، اكتب:\n.autoai off`;
  }

  if (text == "on") {
    autoaiEnabled[m.sender] = true;
    m.reply("[ ✓ ] تم تفعيل وضع الذكاء الاصطناعي بنجاح. يمكنك الآن التحدث مباشرة مع الذكاء الاصطناعي.");
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

  const messages = [
    { role: "system", content: `أنا بوت واتساب ${name}` },
    { role: "user", content: m.text }
  ];

  try {
    const response = await axios.post("https://deepenglish.com/wp-json/ai-chatbot/v1/chat", { messages });
    const responseData = response.data;
    const hasil = responseData;
    
    await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key }});
    m.reply(hasil.answer);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

handler.command = ['autoai'];
handler.tags = ["ai"];
handler.help = ['autoai'];
export default handler;