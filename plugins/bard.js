// Este Código pertenece a Azami.js Editado Por By @Alba070503
import fetch from 'node-fetch'

var handler = async (m, { text,  usedPrefix, command }) => {

if (!text) throw `أنا مساعد غوغل جاهز لمساعدك فأي بحث فقطم قم بإرسال الأمر هاكذا \n\n ${usedPrefix + command} من هو عمر ابن الخطاب`

try {

//await m.reply(waitt)
conn.sendPresenceUpdate('composing', m.chat)
var apii = await fetch(`https://aemt.me/gemini?text=${text}`)
var res = await apii.json()
await m.reply(res.result)

} catch (error) {
console.error(error)
throw 'أسفة حدث خطأ لم أتقوعه حاول لاحقا 🙁'
}

}
handler.command = ['bard']
handler.help = ['bard']
handler.tags = ['ai']

handler.premium = false

export default handler