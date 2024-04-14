import { tiktokdl } from '@bochilteam/scraper';
import fg from 'api-dylux';

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  if (!args[0] && m.quoted && m.quoted.text) {
    args[0] = m.quoted.text;
  }
  if (!args[0] && !m.quoted) throw `أعطني رابط الفيديو من Tiktok أو قم بالرد على رابط Tiktok`;
  if (!args[0].match(/tiktok/gi)) throw `تحقق من أن الرابط هو من TikTok`;
 
  let txt = 'هنا فيديو الطلب الخاص بك';

  try {
    const { author: { nickname }, video, description } = await tiktokdl(args[0]);
    const url = video.no_watermark2 || video.no_watermark || 'https://tikcdn.net' + video.no_watermark_raw || video.no_watermark_hd;
    
    if (!url) throw global.error;
    
    conn.sendFile(m.chat, url, 'tiktok.mp4', '', m);
  } catch (err) {
    try {
      let p = await fg.tiktok(args[0]);
      conn.sendFile(m.chat, p.play, 'tiktok.mp4', '_تابعني على إنستجرام 🥰_ \n www.instagram.com/ovmar_1', m);
    } catch {
      m.reply('*حدث خطأ غير متوقع*');
    }
  }
};

handler.help = ['tiktok2'].map((v) => v + ' <الرابط>');
handler.tags = ['downloader'];
handler.command = /^(tiktok2|tt2)(d(own(load(er)?)?|l|2))?$/i;
handler.limit = false
export default handler;