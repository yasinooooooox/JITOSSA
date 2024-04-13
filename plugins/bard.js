let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• مثال:* ${usedPrefix + command} مرحبًا`
m.reply(wait) // الرد برسالة انتظار

try {
let gpt = await (await fetch(`https://itzpire.site/ai/bard-ai?q={text}`)).json() // إجراء استعلام إلى Bard AI
m.reply("*[ sɪsᴋᴀ - ᴀɪ ]* " + '\n' + gpt.result) // إرسال الرد من Bard AI
 } catch(e) {
 throw "`*Gpt لم يستجب*`" // رمي خطأ في حالة عدم استجابة Bard AI
}
}

handler.help = ["bard"].map(a => a + " *[السؤال]*") // المساعدة للأمر
handler.tags = ["ai"] // الوسوم المرتبطة بالأمر
handler.command = ["bard"] // الأمر المستخدم لتنشيط الدالة

module.exports = handler // تصدير الدالة handler