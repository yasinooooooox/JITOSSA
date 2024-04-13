import fetch from 'node-fetch';
let handler = async (m, {
 text, 
 usedPrefix, 
 command
 }) => {
if (!text) throw `الرجاء إدخال السؤال!\n\n*مثال:* من هو رئيس المغرب؟`
try {
  await m.reply(wait)
  let apii = await fetch(`https://api.betabotz.org/api/search/bing-chat?text=${text}&apikey=${global.lann}`)
  let res = await apii.json()
  await m.reply(res.message)
} catch (err) {
  console.error(err)
  throw "حدث خطأ أثناء الرد على السؤال"
}
}
handler.command = handler.help = ['bard','bardai'];
handler.tags = ['ai'];
handler.premium = false;
export default handler;