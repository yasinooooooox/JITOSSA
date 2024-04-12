import { HuggingFaceBuffer } from '../../lib/tools/huggingface.js';

let handler = async (m, { command, usedPrefix, conn, text, args }) => {
    const input_data = [
        'Daniil-plotnikov/realism-diffusion',
        'aipicasso/manga-diffusion-poc',
        'Envvi/Inkpunk-Diffusion',
        'tensor-diffusion/AsianRealistic_SDLife_ChiasedammeV9.0',
        'hakurei/waifu-diffusion',
        'nitrosocke/mo-di-diffusion',
        'nitrosocke/Ghibli-Diffusion'
    ];

    let [urutan, tema] = text.split("|")
    if (!tema) return m.reply("أدخل الاستعلام!\n*مثال:*\n.diffuser [الرقم]|[الاستعلام]")

    await m.reply(waitt)
    try {
        let data = input_data.map((item, index) => ({
            title: (item.split('/')[1]).toUpperCase(),
            id: item
        }));
        if (!urutan) return m.reply("أدخل الاستعلام!\n*مثال:*\n.diffuser [الرقم]|[الاستعلام]\n\n*اختر الرقم الموجود*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        if (isNaN(urutan)) return m.reply("أدخل الاستعلام!\n*مثال:*\n.diffuser [الرقم]|[الاستعلام]\n\n*اختر الرقم الموجود*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        if (urutan > data.length) return m.reply("أدخل الاستعلام!\n*مثال:*\n.diffuser [الرقم]|[الاستعلام]\n\n*اختر الرقم الموجود*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        let out = data[urutan - 1].id

        const openAIResponse = await HuggingFaceBuffer(out, encodeURIComponent(tema));

        if (openAIResponse) {
            const tag = `@${m.sender.split('@')[0]}`;

            await conn.sendMessage(m.chat, {
                image: openAIResponse,
                caption: `هذا تأثير *${out}* \nطلب بواسطة: ${tag}`,
                mentions: [m.sender]
            }, {
                quoted: m
            });
        } else {
            console.log("لا يوجد استجابة من OpenAI أو حدث خطأ.");
        }
    } catch (e) {
        await m.reply(eror)
    }
};

handler.help = ["diffuser *[الرقم]|[الاستعلام]*"]
handler.tags = ["search"]
handler.command = /^(diffuser)$/i
export default handler