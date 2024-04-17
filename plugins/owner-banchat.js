let handler = async (m) => {
global.db.data.chats[m.chat].isBanned = true
m.reply('*ثم حظر هاذا المستخدم* ✓')
}
handler.help = ['banchat']
handler.tags = ['owner']
handler.command = /^banchat|bangp$/i
handler.rowner = true
export default handler