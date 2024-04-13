let baileys = require("@adiwajshing/baileys")
let { useMultiFileAuthState, DisconnectReason, makeInMemoryStore, jidNormalizedUser, makeCacheableSignalKeyStore, PHONENUMBER_MCC } = baileys
let { Boom } = require("@hapi/boom")
let NodeCache = require("node-cache")
let Pino = require("pino")
let simple = require('../lib/simple')
let fs = require('fs')

if (global.conns instanceof Array) console.log()
else global.conns = []

let handler = async (m, { conn, args, usedPrefix, command, isOwner, text }) => {
if (!text) throw m.reply('• *Example :* .jadibot 6288980870067')
conn.reply(m.chat, '```Tunggu Sedang Menyiapkan Code Jadibot...```', m)
let conns = global.conn
let user = global.db.data.users[m.sender]

    let authFile = 'lib/jadibot'+m.sender.split`@`[0]+'.data.json'
    let isInit = !fs.existsSync(authFile)
    let { state, saveCreds} = await useMultiFileAuthState(authFile)
    let msgRetryCounterCache = new NodeCache() 
    
    const config = {
    logger: Pino({ level: "fatal" }).child({ level: "fatal" }),
    printQRInTerminal: false,
    mobile: false,
    auth: state,
    browser: ["Ubuntu","Chrome","20.0.04"],
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    msgRetryCounterCache,
    defaultQueryTimeoutMs: undefined
    }
    conn = simple.makeWASocket(config)
    let ev = conn.ev
    
     if (!conn.authState.creds.registered) {
        setTimeout(async () => {
          let codek = await conn.requestPairingCode(
            parseInt(await m.sender.replace(/[^0-9]/g, ""))
          );
          codek = codek?.match(/.{1,4}/g)?.join("-") || codek;
          conns.reply(text + '@s.whatsapp.net', codek, m)
          console.log("code anda adalah: " + codek);
        }, 3000);
        }
    async function connectionUpdate(update) {
    const { connection, lastDisconnect } = update
    console.log(update)
    if (connection == 'connecting') {
    console.log(connection)
    } else if (connection == 'close') {
    conns.reply(text + '@s.whatsapp.net', '```⏱️ koneksi terputus & mencoba menyambung ulang...```', m)
    } else if (connection == 'open') {
    conns.reply(text + '@s.whatsapp.net', '```✅ Tersambung```', m)
    global.conns.push(conn)
    }
    if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
    console.log(reloadHandler(true))
    }
   }

    reloadHandler = function (restatConn) {
    let Handler = require('../handler')
    let handler = require('../handler')
    if (Object.keys(Handler || {}).length) handler = Handler
    if (restatConn) {
    try { conn.ws.close() } catch { }
    conn = {
      ...conn, ...simple.makeWASocket(config)
     }
   }
   if (!isInit) {
     conn.ev.off('messages.upsert', conn.handler)
     conn.ev.off('group-participants.update', conn.onParticipantsUpdate)
     conn.ev.off('connection.update', conn.connectionUpdate)
     conn.ev.off('creds.update', conn.credsUpdate)
   }

   conn.welcome = 'Hai, @user!\nSelamat datang di grup *@subject*\n\n@desc'
   conn.bye = 'Selamat tinggal @user!'
   conn.spromote = '@user sekarang admin!'
   conn.sdemote = '@user sekarang bukan admin!'
   conn.handler = handler.handler.bind(conn)
   conn.onParticipantsUpdate = handler.participantsUpdate.bind(conn)
   conn.connectionUpdate = connectionUpdate.bind(conn)
   conn.credsUpdate = saveCreds.bind(conn)

   conn.ev.on('messages.upsert', conn.handler)
   conn.ev.on('group-participants.update', conn.onParticipantsUpdate)
   conn.ev.on('connection.update', conn.connectionUpdate)
   conn.ev.on('creds.update', conn.credsUpdate)
   isInit = false
   return true
}
    reloadHandler()   
}
handler.help = ['jadibot *<number>*']
handler.tags = ['jadibot']
handler.command = /^jadibot$/i
handler.register = true
handler.premium = false
handler.limit = 100
handler.owner = false
handler.private = true
module.exports = handler