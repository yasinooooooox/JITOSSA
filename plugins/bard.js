import fetch from 'node-fetch'

var handler = async (m, { text,  usedPrefix, command }) => {

if (!text) throw `انا   bard
مساعدك الذكي اطرح اي سؤال وسوف اجيبك مثال:
*.bard* ما هي الجنة  `

try {

await m.reply(waitt)
var apii = await fetch(`https://aemt.me/bard?text=${text}`)
var res = await apii.json()
await m.reply(res.result)

} catch (error) {
console.error(error)
throw '*وقع خطأ حاول لاحقا*'
}

}
handler.command = ['bard']
handler.help = ['bard']
handler.tags = ['ai']

handler.premium = false

export default handler