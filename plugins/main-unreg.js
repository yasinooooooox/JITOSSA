import { createHash } from 'crypto'

let handler = async function (m, { conn, args, usedPrefix }) {
  if (!args[0]) {
    throw `✳️ *أدخل رقم التسلسل*\nاستخدم رقم التسلسل الخاص بك للتحقق باستخدام الأمر...\n\n*${usedPrefix}unreg* <رقم التسلسل>`
  }

  let user = global.db.data.users[m.sender]
  let sn = createHash('md5').update(m.sender).digest('hex')

  if (args[0] !== sn) {
    throw '⚠️ *رقم التسلسل غير صحيح*'
  }

  user.registered = false
  m.reply(`✅ تم إلغاء التسجيل بنجاح`)
}

handler.help = ['unreg <رقم التسلسل>']
handler.tags = ['owner']

handler.command = ['unreg']
handler.register = true

export default handler