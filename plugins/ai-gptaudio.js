import fetch from "node-fetch"; // استيراد مكتبة fetch لإجراء طلبات HTTP
import cheerio from "cheerio"; // استيراد مكتبة cheerio لتحليل ومعالجة البيانات من صفحة الويب

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!m.quoted) return m.reply("هاذا الأمر يقوم بقراءة النصوص والردود عبر إرسال هاذا الأمر \n\n ${usedPrefix + command} \n\n بعدها قم بالرد بهاذا الأمر على أوديو أو نص");

    try {
        if (m.quoted.text) {
            let res = await gptChat(m.quoted.text);
            await m.reply(waitt);
        } else if (m.quoted.mimetype.includes("audio")) {
            let audioBuff = await m.quoted.download();
            let res = await gptAudio(audioBuff);
            await m.reply(res.data);
        } else return m.reply("الرجاء الرد على نص/صوت لاستخدام هذا الأمر");
    } catch (e) {
        console.error('حدث خطأ:', e.message);
        await m.reply('حدث خطأ. الرجاء المحاولة مرة أخرى.');
    }
};

handler.help = ["aiaudio"]; // وصف الأمر
handler.tags = ["ai"]; // الوسم المرتبط بالأمر
handler.command = /^(aiaudio)$/i; // الأوامر التي يتم استخدامها لاستدعاء الأمر

export default handler; // تصدير الأمر

/* New Line */

async function gptAudio(audioBuffer) {
    try {
        const info = await getInfo();
        const data = new FormData();
        const blob = new Blob([audioBuffer.toArrayBuffer()], {
            type: 'audio/mpeg'
        });
        data.append('_wpnonce', info[0]['data-nonce']);
        data.append('post_id', info[0]['data-post-id']);
        data.append('action', 'wpaicg_chatbox_message');
        data.append('audio', blob, 'wpaicg-chat-recording.wav');
        const response = await fetch('https://chatgptt.me/wp-admin/admin-ajax.php', {
            method: 'POST',
            body: data
        });

        if (!response.ok) throw new Error('لا يوجد استجابة شبكة صالحة');

        return await response.json();
    } catch (error) {
        console.error('حدث خطأ:', error.message);
        throw error;
    }
}

async function gptChat(message) {
    try {
        const info = await getInfo();
        const data = new FormData();
        data.append('_wpnonce', info[0]['data-nonce']);
        data.append('post_id', info[0]['data-post-id']);
        data.append('action', 'wpaicg_chatbox_message');
        data.append('message', message);
        const response = await fetch('https://chatgptt.me/wp-admin/admin-ajax.php', {
            method: 'POST',
            body: data
        });

        if (!response.ok) throw new Error('لا يوجد استجابة شبكة صالحة');

        return await response.json();
    } catch (error) {
        console.error('حدث خطأ:', error.message);
        throw error;
    }
}

async function getInfo() {
    const url = 'https://chatgptt.me';

    try {
        const html = await (await fetch(url)).text();
        const $ = cheerio.load(html);

        const chatData = $('.wpaicg-chat-shortcode').map((index, element) => {
            return Object.fromEntries(Object.entries(element.attribs));
        }).get();

        return chatData;
    } catch (error) {
        throw new Error('خطأ:', error.message);
    }
}