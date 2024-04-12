import axios from 'axios';

export const handler = async (m, { conn }) => {
    conn.autobard = conn.autobard ? conn.autobard : {};

    // تحقق من عدم وجود رسالة فارغة وأن وضع الذكاء الاصطناعي غير مفعل لهذا المرسل
    if (!m.isBaileys && m.text && !conn.autobard[m.sender]) {
        conn.autobard[m.sender] = { pesan: [] }; // تفعيل وضع الذكاء الاصطناعي
        m.reply("[ ✓ ] تم التحول بنجاح لوضع الذكاء الاصطناعي. يمكنك التحدث مباشرة معي الآن.");
    }

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

handler.before = async (m, { conn }) => {
    // تحقق من وجود الرسالة وأن وضع الذكاء الاصطناعي مفعل لهذا المرسل
    if (m.text && conn.autobard[m.sender]) {
        return false; // لعدم منع تنفيذ الأوامر إذا كان وضع الذكاء الاصطناعي مفعل
    }
    return true; // لمنع تنفيذ الأوامر إذا لم يكن وضع الذكاء الاصطناعي مفعل
}

handler.command = ['autobard'];
handler.tags = ["ai"]
handler.help = ['autobard']

export default handler;