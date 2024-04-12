import axios from 'axios';

export const handler = async (m, { conn }) => {
    conn.autobard = conn.autobard ? conn.autobard : {};

    // تحقق من وجود الرسالة وأن wالوضع الذكي غير مفعل لهذا المرسل
    if (!m.isBaileys && m.text && !conn.autobard[m.sender]) {
        conn.autobard[m.sender] = { pesan: [] }; // تفعيل وضع الذكاء الاصطناعي
        m.reply("[ ✓ ] تم التحول بنجاح لوضع الذكاء الاصطناعي. يمكنك التحدث مباشرة معي الآن.");
    }

    if (!m.text) return;

    // تنفيذ وظيفة الذكاء الاصطناعي إذا كان وضع الذكاء الاصطناعي مفعلًا لهذا المرسل
    if (conn.autobard[m.sender] && m.text) {
        let name = conn.getName(m.sender)
        await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});
        try {
            const response = await axios.get(`https://api.justifung.tech/api/bard?q=${encodeURIComponent(m.text)}&apikey=Nour`)
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

handler.tags = ["ai"]
handler.help = ['autobard']

export default handler;