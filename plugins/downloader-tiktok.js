import axios from 'axios';
import cheerio from 'cheerio';

var handler = async (m, { conn, args }) => {
  if (!args[0]) {
    throw 'Uhm... URL-nya mana?';
  }

  try {
    await conn.reply(m.chat, 'Tunggu sebentar kak, video sedang di download...', m);

    const { thumbnail, video, audio } = await tiktokdl(args[0]);

    if (!video) {
      throw 'Can\'t download video!';
    }

    await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', 'Ini thumbnail videonya', m);
    await conn.sendFile(m.chat, video, 'tiktok.mp4', 'Ini kak videonya', m);
    await conn.sendFile(m.chat, audio, 'tiktok.mp3', 'Ini kak audionya', m);
    conn.reply(m.chat, '•⩊• Ini kak Videonya ૮₍ ˶ᵔ ᵕ ᵔ˶ ₎ა\nDitonton yah ₍^ >ヮ<^₎', m);
  } catch (error) {
    conn.reply(m.chat, `Error: ${error}`, m);
  }
};

handler.help = ['tiktok'].map((v) => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^t(t|iktok(d(own(load(er)?)?|l))?|td(own(load(er)?)?|l))$/i;

export default handler;

async function tiktokdl(url) {
  if (!/tiktok/.test(url)) {
    throw 'Invalid TikTok URL!';
  }

  try {
    const getdata = await axios.get(`https://tikdown.org/getAjax?url=${url}`, {
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36',
      },
    });

    var $ = cheerio.load(getdata.data.html);

    if (getdata.data.status) {
      return {
        status: true,
        thumbnail: $('.download-result .preview-image').attr('src'),
        video: $('.download-result .download-links a[href*=".mp4"]').attr('href'),
        audio: $('.download-result .download-links a[href*=".mp3"]').attr('href'),
      };
    } else {
      return {
        status: false,
      };
    }
  } catch (error) {
    throw 'Can\'t download video!';
  }
}

