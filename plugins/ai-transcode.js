import fetch from "node-fetch"

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let text
    if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else return m.reply("رد على الكود الذي ترغب في تحويله.\n*مثال:*\n" + usedPrefix + command + " py js")
    await m.reply(wait)
    try {
        let res = await TranslateCode(text)
        m.reply(res.join('\n'));
    } catch (e) {
        m.reply(eror);
    }
}
handler.help = ["transcode"]
handler.tags = ["tools"]
handler.command = /^(transcode)$/i

export default handler

/* New Line */
async function TranslateCode(code, fromlang, tolang) {
    try {
        const response = await fetch(`https://api.yanzbotz.my.id/api/ai/codetranslator?code=${code}&fromlang=${fromlang}&tolang=${tolang}`);
        if (!response.ok) {
            throw new Error('استجابة الشبكة لم تكن جيدة');
        }
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('خطأ:', error);
        throw error;
    }
}