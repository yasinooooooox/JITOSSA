let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `${lenguajeMY['smsAvisoMG']()} *هاذا الأمر خاص بتحميل قصص الإنستجرام*\n\n*مثال الإستخدام*\n${usedPrefix + command}  ovmar_1`
    await m.reply(global.wait)    
    const res = await fetch(`https://api.lolhuman.xyz/api/igstory/${args[0]}?apikey=${lolkeysapi}`)
    var anu = await res.json()
    var anuku = anu.result
    if (anuku == '') return m.reply(`${lenguajeMY['smsAvisoFG']()} *لايوجد أي قصة لهاذا الشخص*`)  
    for (var i of anuku) {
        let res = await axios.head(i)
        let mime = res.headers['content-type']
        if (/image/.test(mime)) await conn.sendFile(m.chat, i, 'error.jpg', null, m).catch(() => { return m.reply(`${lenguajeMY['smsAvisoFG']()} لاتوجد أي قصة هنا`)})
        if (/video/.test(mime)) await conn.sendFile(m.chat, i, 'error.mp4', null, m).catch(() => { return m.reply(`${lenguajeMY['smsAvisoFG']()} لاتوجد أي قصة هنا`)})
        conn.reply(m.chat, `${lenguajeMY['smsAvisoIIG']()} `_تابعني على إنستجرام 🥰_ \n www.instagram.com/ovmar_1`, m, {
            contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, 
            title: author,
            body: 'Super Bot WhatsApp',         
            previewType: 0, thumbnail: fs.readFileSync 'https://telegra.ph/file/c11ccb4fff461c40ab313.jpg',
            sourceUrl: `https://github.com/omarcharaf1/JITOSSA`}}})
    }
}
handler.help = ['igstory <username>']
handler.tags = ['downloader']
handler.command = ['igstory', 'ighistoria', 'ighistorias' ]
handler.limit = 3
handler.exp = 87
export default handler