//import db from '../lib/database.js'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who
     if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
     else who = m.chat
     let user = global.db.data.users[who]
     if (!who) throw `*قم بالإشارة للشخص الذي تريد إزالة الحظر عنه*\\n مثال الإستخدام \n .unban @user`
     let users = global.db.data.users
     users[who].banned = false
     conn.reply(m.chat, `
*ثم إزالة الحظر بنجاح ✔️*
 
 ───────────
 @${who.split`@`[0]} *الأن يمكنك إستخدام البوت أسف* `, m, { mentions: [who] })
 }
 handler.help = ['un @user']
 handler.tags = ['owner']
 handler.command = /^unban$/i
 handler.rowner = true
 
 export default handler