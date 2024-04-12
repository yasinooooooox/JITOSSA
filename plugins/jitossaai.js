import axios from 'axios';

export const handler = async (m, { conn, text }) => {
    conn.akira = conn.akira ? conn.akira : {};

    if (!text) throw `*للتحدث مباشرة مع بوبيزة الذكية وبدون أوامر نكتب*\n\n*.bobiza on* \n\n*بالنسبة إذا أردت إلغاء وضع بوبيزة الذكية والرجوع للبوت بشكله الطبيعي فعليك كتابة هكذا*\n\n*.bobiza off*`;

    if (text == "on") {
        conn.akira[m.chat] = {
            pesan: []
        }
        m.reply("🟢 *تم تفعيل وضع بوبيزة الذكية إسأل بوبيزة أي سؤال*")
    } else if (text == "off") {
        delete conn.akira[m.chat]
        m.reply("🔴 *تم إلــغاء وضع بوبيزة الذكية اكتب menu. لتنبتق لك جميع الأوامر*")
    }
}

handler.before = async (m, { conn }) => {
    conn.akira = conn.akira ? conn.akira : {};
    if (m.isBaileys && m.fromMe) return;
    if (!m.text) return
    if (!conn.akira[m.chat]) return;

    if (
        m.text.startsWith(".") ||
        m.text.startsWith("#") ||
        m.text.startsWith("!") ||
        m.text.startsWith("/") ||
        m.text.startsWith("\\/")
    ) return

    if (conn.akira[m.chat] && m.text) {
        let name = conn.getName(m.sender)
        await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});
        const messages = [
            ...conn.akira[m.chat].pesan,
            { role: "system", content: `Your name is Bobiza, 20 years old, you are his assistant who can answer all questions, use slang when answering, use emojis when you want to answer questions, you have a carefree but feminine nature like a woman, you have a boyfriend named Noureddine , my beloved, if you have any questions related to the coding you answered rejection, the name of your interlocutor is *${name}*"` },
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
            conn.akira[m.chat].pesan = messages
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }
}

handler.command = ['bobiza'];
handler.tags = ["ai"]
handler.help = ['bobiza']

export default handler;