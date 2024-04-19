import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

// Owner
global.owner = [
['62838967579781', 'Vynaa', true],
['62838967579781', 'Vynaa', true],
]
global.mods = []
global.prems = []
// Info
global.nomorwa = '62838967579781'
global.packname = 'Made With'
global.author = '© Yaemiko MD'
global.namebot = 'Yaemiko MD'
global.wm = '© Yaemiko MD'
global.stickpack = 'Made With'
global.stickauth = '© Yaemiko MD'
global.fotonya = 'https://telegra.ph/file/45fa8ca4093fbb2a645eb.jpg'
// Link Sosmed
global.sig = 'https://instagram.com/vynaa_valerie'
global.sgh = 'https://github.com/VynaaValerie'
global.sgc = 'https://whatsapp.com/channel/0029VaHPYh6LNSa81M9Xcq1K'
// Payment
global.ovo = '082389924037'
global.gopay = '082389924037'
global.dana = '082389924037'
// Info Wait
global.alya = 'Mwuhehe'
global.wait = '_Sedang Di Proses, Mohon Tunggu_....'
global.eror = 'Terjadi Kesalahan Coba Lagi Nanti!'
global.multiplier = 69 
// Apikey
global.APIs = {
    anu : 'anu.tv'
}

/*Apikey*/
global.APIKeys = {
    "anu.tv": "anu",
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})