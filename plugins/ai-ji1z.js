import fetch from "node-fetch"; // استيراد مكتبة fetch لإجراء طلبات HTTP

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let text;
    if (args.length >= 1) {
        text = args.slice(0).join(" ");
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } else throw "يرجى إدخال نص";

    await m.reply(waitt);

    const messages = [
        {
            role: 'system',
            content: 'أنت مساعد AI جاهز لمساعدة في أي شيء.'
        },
        {
            role: 'user',
            content: text
        },
    ];

    try {
        let res = await chatWithGPT(messages);
        await m.reply(res.choices[0].message.content);
    } catch (e) {
        await m.reply("حدث خطأ");
    }
}

handler.help = ["ji1z"]; // وصف الأمر
handler.tags = ["ai"]; // الوسوم المرتبطة بالأمر
handler.command = /^(ji1z)$/i; // الأوامر التي يتم استخدامها لاستدعاء الأمر

export default handler; // تصدير الأمر

/* New Line */
async function chatWithGPT(messages) {
    try {
        const response = await fetch("https://chatbot-ji1z.onrender.com/chatbot-ji1z", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messages
            }),
        });

        const data = await response.json(); // تحويل الرد إلى JSON
        return data; // إرجاع البيانات المستلمة من الخدمة
    } catch (error) {
        console.error("Error fetching data:", error); // إظهار رسالة الخطأ في حالة حدوث خطأ
        throw error; // رمي الخطأ للتعامل معه خارج الدالة
    }
}