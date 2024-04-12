let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply(`توليد الصورة الكرتونية قم بإنشاء الكثير من الصور عبر عقلك \n مثال: *${usedPrefix + command}* 1girl, solo, ponytail, blush.`)
await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });
    try {
let data = (`https://api.yanzbotz.my.id/api/text2img/neima?prompt=${text}`)
conn.sendFile(m.chat, data,"apa", '_متابعة في حسابي الإنستجرام ❤️_\n www.instagram.com/ovmar_1', m)
	} catch (e) {
		m.reply(error);
	}
};
handler.help = ["animediff"]
handler.tags = ["drawing"]
handler.command = ["animediff"]
handler.register = true
export default handler