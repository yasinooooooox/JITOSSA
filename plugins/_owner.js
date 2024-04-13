import fetch from "node-fetch";
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    let teks = "* *التواصل مع مطور البوت*\n\n *إنستجرام*\nwww.instagram.com/ovmar_1\n\n *واتساب*\n wa.me/212670941551\n\n *تيليجرام*\n t.me/Jinkx7 \n\n _®OMAR CHARAF_";
    await conn.sendMessage(
        m.chat,
        {
            text: teks,
            mentions: [m.sender],
            contextInfo: {
                forwardingScore: 9999999,
                isForwarded: false,
                mentionedJid: [m.sender],
                externalAdReply: {
                    showAdAttribution: false,
                    renderLargerThumbnail: true,
                    title: "OMAR CHARAF",
                    body: "يرجى عدم الإزعاج !!",
                    containsAutoReply: true,
                    mediaType: 1,
                    thumbnailUrl: `https://telegra.ph/file/f3105b8337c9c66acd5bb.jpg`,
                    mediaUrl: ``,
                    sourceUrl: "https://wa.me/212670941551'",
                },
            },
        },
        { quoted: m },
    );
};
handler.help = ["owner"];
handler.tags = ["main"];
handler.command = /^(owner|creator)$/i;

export default handler;