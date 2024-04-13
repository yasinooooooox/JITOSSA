let handler = async (m, { conn, text }) => {
    if (!text) throw 'من ترغب في حظره؟'
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw 'الرجاء وضع علامة؟'
    let users = global.db.data.users
    users[who].banned = true
    conn.reply(m.chat, '*تم حظرك من إستخدام JITOSSA*', m)
}
handler.help = ['ban']
handler.tags = ['owner']
handler.command = /^ban(user)?$/i
handler.rowner = true

export default handler