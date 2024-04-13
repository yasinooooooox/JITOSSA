import fetch from "node-fetch";

let handler = async (m, { conn, usedPrefix, text, command }) => {
    if (!text) return m.reply("_*الرجاء إدخال النص.*_\n\n مثال الإستخدام\n ${usedPrefix + command} women with cat,");
    
    conn.animedif = conn.animedif ? conn.animedif : {};

    if (m.sender in conn.animedif)
        throw "هناك عملية قيد المعالجة، يرجى الانتظار >//<";
    else
        conn.animedif[m.sender] = true;

    try {
        m.reply(waittt);
        
        const res = await fetch(
            global.API("rose", "/image/anime/diffusion", { prompt: text }, "apikey")
        );

        if (!res.ok) throw "خطأ في الخادم :(";

        const Data = await res.arrayBuffer();

        conn.sendMessage(m.chat, { image : { url : Data }, caption : `النص: ${text}` }, m)
    } catch (error) {
        m.reply("خطأ في الخادم :(");
    } finally {
        if (conn.animedif[m.sender]) {
            delete conn.animedif[m.sender];
        }
    }
};

handler.help = ["animedif", "chara"];
handler.tags = ["ai"];
handler.command = ["animedif", "chara"];
handler.premium = true;

export default handler;