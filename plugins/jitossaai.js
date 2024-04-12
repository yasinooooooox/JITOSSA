import axios from 'axios';

export const handler = async (m, { conn, text }) => {
    conn.autobard = conn.autobard ? conn.autobard : {};

    if (!text) throw `*يمكنك الان الانتقال للتحذث مع الذكاء الاصطناعي بدون اوامر يعني سوف تتحذث معه مباشرة وسوف يجيبك  بإجابات مباشرة*\nلتفعيل الوضع الذكي نكتب \n *.autobard on*\n واذا اردت الغاء الوضع الذكي والرجوع لوضع الاوامر نكتب :\n*.autobard off*`;

    if (text == "on") {
        conn.autobard[m.sender] = {
            pesan: []
        }
        m.reply("[ ✓ ] تم الانتقال بنجاح للوضع الذكي للبوت إسألني أي سؤال و سوف اجيبك لا تتردد يا صديقي 😉")
    } else if (text == "off") {
        delete conn.autobard[m.sender]
        m.reply("[ ✓ ] تم بنجاح الرجوع للوضع العادي للبوت")
    }
}

handler.before = async (m, { conn }) => {
    conn.autobard = conn.autobard ? conn.autobard : {};
    if (m.isBaileys && m.fromMe) return;
    if (!m.text) return
    if (!conn.autobard[m.sender]) return;

    if (
        m.text.startsWith(".") ||
        m.text.startsWith("#") ||
        m.text.startsWith("!") ||
        m.text.startsWith("/") ||
        m.text.startsWith("\\/")
    ) return

    if (conn.autobard[m.sender] && m.text) {
        let name = conn.getName(m.sender)
        await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});
        try {
            const response = await axios.get(`https://api.justifung.tech/api/bard?q=${m.text}&apikey=Nour`)
            const responseData = response.data;
            const hasil = responseData;
            await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key }});
            m.reply(hasil.result[0])
            conn.autobard[m.sender].pesan.push(hasil.result[0])
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }
}

handler.command = ['jitossa'];
handler.tags = ["ai"]
handler.help = ['jitossa']

export default handler;