import axios from'axios'

let handler = async (m, { conn, text }) => {
 conn.autoai = conn.autoai ? conn.autoai : {};

 if (!text) throw `*يمكنك الان الانتقال للتحذث مع الذكاء الاصطناعي بدون اوامر يعني سوف تتحذث معه مباشرة وسوف يجيبك  بإجابات مباشرة*\nلتفعيل الوضع الذكي نكتب \n *.autoai on*\n واذا اردت الغاء الوضع الذكي والرجوع لوضع الاوامر نكتب :\n*.autoai off*`;

 if (text == "on") {
 conn.autoai[m.sender] = {
 pesan: []
 }
 m.reply("[ ✓ ] تم الانتقال بنجاح للوضع الذكي للبوت إسألني أي سؤال و سوف اجيبك لا تتردد يا صديقي 😉")
 } else if (text == "off") {
 delete conn.autoai[m.sender]
 m.reply("[ ✓ ] تم بنجاح الرجوع للوضع العادي للبوت")
 }
}

handler.before = async (m, { conn }) => {
conn.autoai = conn.autoai ? conn.autoai : {};
 if (m.isBaileys && m.fromMe) return;
 if (!m.text) return
 if (!conn.autoai[m.sender]) return;

 if (
 m.text.startsWith(".") ||
 m.text.startsWith("#") ||
 m.text.startsWith("!") ||
 m.text.startsWith("/") ||
 m.text.startsWith("\\/")
 ) return

 if (conn.autoai[m.sender] && m.text) {
 let name = conn.getName(m.sender)
 await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});
 const messages = [
 ...conn.autoai[m.sender].pesan,
 { role: "system", content: `انا بوت واتساب  ${name}` },
 { role: "user", content: m.text }
 ];
 try {
 const response = await axios.post("https://api.justifung.tech/api/bard?q=${m.text}&apikey=Nour", {
 messages
 });

 const responseData = response.data;
 const hasil = responseData;
 await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key }});
 m.reply(hasil.answer)
 conn.autoai[m.sender].pesan = messages
 } catch (error) {
 console.error("Error fetching data:", error);
 throw error;
 }
 }
}

handler.command = ['autoai'];
handler.tags = ["ai"]
handler.help = ['autoai']
export default handler