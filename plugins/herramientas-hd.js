import {
    VyroAI
} from "../../lib/ai/vyro-ai.js";
import {
    ImageProcessor
} from "../../lib/tools/art-enhance.js";

const genAi = new VyroAI({
    link: false,
    buffer: true
});
const generate = new ImageProcessor({
    token: '',
    replicate: "3a4886dd3230e523600d3b555f651dc82aba3a4e"
});

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    if (/image/g.test(mime) && !/webp/g.test(mime)) {
        try {
            let media = await q.download();
            let sauce = await genAi.upscaleImage(media);
            await conn.sendFile(m.chat, sauce.buffer, null, '', m);
        } catch (e) {
            try {
                let media = await q.download();
                let sauce = await generate.upscaleImage(media);
                await conn.sendFile(m.chat, sauce, null, '', m);
            } catch (e) {
                try {
                    let media = await q.download();
                    let sauce = await generate.artEnhance(media);
                    await conn.sendFile(m.chat, sauce, null, '_ثم تحسين الجودة_ \n _*instagram.com/ovmar_1*_', m);
                } catch (e) {
                    await m.reply("خطأ أثناء تحسين جودة الصورة");
                }
            }
        }
    } else {
        await m.reply(`يرجى إرسال صورة مع تسمية *${usedPrefix + command}* أو علامة على الصورة التي تم إرسالها مسبقًا`);
    }
};

handler.help = ['hd', 'enhance'];
handler.tags = ['image-edit'];
handler.command = /^(hd|enhance)$/i;

export default handler;