const axios = require('axios');

let handler = async (m, { conn, text }) => {
 conn.alicia = conn.alicia ? conn.alicia : {};

 if (!text) throw `*[JITOSSA] نظام ذكاء إصتناعي يقوم بالرد عن أي سؤال لديك حين تقوم بتفعلي*ه \n\n للتفعيل \n*${usedPrefix + command} on* \n للإغلاق \n *${usedPrefix + command} off*`;

 if (text == "on") {
 conn.alicia[m.chat] = {
 pesan: []
 }
 m.reply("[ ✓ ] ثم تشغيل الذكاء الإصطتناعي JITOSSA")
 } else if (text == "off") {
 delete conn.alicia[m.chat]
 m.reply("[ ✓ ] ثم إيقاف الذكاء الإصطناعي JITOSSA")
 }
}

handler.before = async (m, { conn }) => {
conn.alicia = conn.alicia ? conn.alicia : {};
 if (m.isBaileys && m.fromMe) return;
 if (!m.text) return
 if (!conn.alicia[m.chat]) return;

 if (
 m.text.startsWith(".") ||
 m.text.startsWith("#") ||
 m.text.startsWith("!") ||
 m.text.startsWith("/") ||
 m.text.startsWith("\\/")
 ) return

 if (conn.alicia[m.chat] && m.text) {
 let name = conn.getName(m.sender)
 await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});
 const messages = [
 ...conn.alicia[m.chat].pesan,
 { role: "system", content: `JITOSSA هو نظام ذكاء اصطناعي يعتمد على تكنولوجيا اللغة الطبيعية والتعلم العميق. يهدف JITOSSA إلى توفير حلول ذكية ومتقدمة لمجموعة متنوعة من التطبيقات والاستخدامات. يمكن أن يشمل استخدام JITOSSA مجالات مثل:

1. **مساعد شخصي ذكي**: يمكن لـ JITOSSA أن يكون مساعدًا شخصيًا يقدم المعلومات والتوجيهات وفقًا لاحتياجات المستخدم.
2. **محرك بحث متقدم**: يمكن لـ JITOSSA توفير نتائج بحث دقيقة ومخصصة باستخدام تقنيات التعلم العميق وتحليل اللغة الطبيعية.
3. **تحليل بيانات**: يمكن استخدام JITOSSA لتحليل البيانات والمعلومات بشكل متقدم لاستخراج الأنماط والتوصيات.
4. **مساعدة في الاتخاذ القرار**: يمكن لـ JITOSSA تقديم التوجيه والتحليلات اللازمة لمساعدة القرارات في مجموعة متنوعة من المجالات.
5. **معالجة اللغة الطبيعية**: يمكن لـ JITOSSA التفاعل مع المستخدمين بطريقة طبيعية وفهم أوامرهم واستفساراتهم.

توفر JITOSSA قدرات متقدمة لتحليل وفهم اللغة الطبيعية وتعلم من البيانات بشكل مستمر، مما يجعلها قادرة على تقديم تجارب مستخدم متفوقة وحلول ذكية للمشاكل المعقدة.` },
 { role: "user", content: m.text }
 ];
 try {
 const response = await axios.post("https://deepenglish.com/wp-json/ai-chatbot/v1/chat", {
 messages
 });

 const responseData = response.data;
 const hasil = responseData;
 await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key }});
 m.reply(hasil.answer)
 conn.alicia[m.chat].pesan = messages
 } catch (error) {
 console.error("هناك مشكلة في هاذا الأمر:", error);
 throw error;
 }
 }
}

handler.command = ['jitossa'];
handler.tags = ["ai"]
handler.help = ['jitossa'].map(a => a + " *[on/off]*");

module.exports = handler