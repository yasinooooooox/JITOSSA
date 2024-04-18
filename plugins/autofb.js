import { fbdl } from '../../lib/download.js'

// رسالة الانتظار
export let wait = 'جاري تحميل الفيديو، يرجى الانتظار...';

export let m = {
   start: async (m, {
      conn,
      budy,
      autodl,
      User
   }) => {
      if (autodl && /(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.gg)\/[^\s/]+(?:\/videos\/\d+\/?)?/.test(budy)) {
         if (User.checkLimitUser(m.sender) <= 0) {
            await conn.reply(m.chat, wait, m); // رسالة الانتظار هنا
            return m.reply(mess.limit);
         };
         m.react('🕒', m.chat)
         let { video } = await fbdl(budy);
         m.react('🕗', m.chat)
         conn.sendFile(m.chat, video, {
            caption: `🍌 Facebook`,
            quoted: m
         });
         User.Limit(m, m.sender, 4);
      }
   }
};