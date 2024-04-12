import axios from 'axios';

export const handler = async (m, { conn, text }) => {
    conn.autobard = conn.autobard ? conn.autobard : {};

    if (!text) throw `*يمكنك الآن التحدث مباشرة مع الذكاء الاصطناعي بدون استخدام الأوامر. يعني ستتحدث معه مباشرة وسيقوم بالرد عليك مباشرة*\nلتفعيل الوضع الذكي، اكتب:\n*autobard on*\nوإذا أردت العودة إلى الوضع العادي واستخدام الأوامر، اكتب:\n*autobard off*`;

    if (text == "on") {
        conn.autobard.on = true; // تفعيل الوضع الذكي للجميع
        m.reply("[ ✓ ] تم التحويل بنجاح إلى الوضع الذكي للبوت. اسأل أي سؤال وسيقوم بالرد عليك مباشرة 😉")
    } else if (text == "off") {
        conn.autobard.on = false; // إلغاء تفعيل الوضع الذكي للجميع
        m.reply("[ ✓ ] تم إلغاء تفعيل الوضع الذكي للبوت.")
    }
}

handler.before = async (m, { conn }) => {
    conn.autobard = conn.autobard ? conn.autobard : {};
    if (m.isBaileys && m.fromMe) return;
    if (!m.text) return;

    if (conn.autobard.on) { // تحقق من تفعيل الوضع الذكي
        let name = conn.getName(m.sender)
        await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});
        try {
            const response = await axios.get(`https://deepenglish.com/wp-json/ai-chatbot/v1/chat`)
            const responseData = response.data;
            const hasil = responseData;
            await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key }});
            m.reply(hasil.result[0])
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }
}

handler.command = ['autobard'];
handler.tags = ["ai"]
handler.help = ['autobard']

export default handler;