import { Blackbox } from "../../lib/ai/blackbox.js";
const blackbox = new Blackbox();

const handler = async (m, { command, usedPrefix, conn, args }) => {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || '';
    const media = await q.download();
    if (!mime) throw 'لم يتم العثور على وسائط';
    const text = args.length >= 1 ? args.join(" ") : (m.quoted && m.quoted.text) || (() => {
        throw "أدخل نصًا"
    })();

    await m.reply(wait)

    try {
        const data = await blackbox.image(media, text)
        if (data) await m.reply(data);
    } catch (e) {
        console.error("خطأ:", e);
        await m.reply(eror);
    }
}

handler.help = ["blackboximg"]
handler.tags = ["ai"];
handler.command = /^(blackboximg)$/i

export default handler;