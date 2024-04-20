let handler = async (m, { conn }) => {
    let txt = ''
    for (let [jid, chat] of Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats)) {
        txt += `${await conn.getName(jid)}\n${jid} [${chat?.metadata?.read_only ? 'غادر' : 'انضم'}]\n\n`;
    }
    m.reply(`قائمة القروبات:\n${txt}`.trim());
}

handler.help = ['groups', 'grouplist'];
handler.tags = ['info'];
handler.command = /^(listgc)$/i;

export default handler;