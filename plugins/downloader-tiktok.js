
import axios from 'axios';
import cheerio from 'cheerio';

var handler = async (m, { conn, args }) => {
  if (!args[0]) {
    throw 'أين الرابط الخاص بالفيديو Tiktok';
  }

  try {
    await conn.reply(m.chat, 'جاري تنزيل الفيديو من سيرفراتنا \n _تابعني على إنستجرام 🥰_ \n www.instagram.com/ovmar_1', m);

    const { thumbnail, video, audio } = await tiktokdl(args[0]);
    const url = video;

    if (!url) {
      throw 'لايمكن تحميل الفيديو أسفة 😄';
    }

    await conn.sendMessage(m.chat, { video: { url: url } }, m);
    await conn.reply(m.chat, '_تابعني على إنستجرام 🥰_ \n www.instagram.com/ovmar_1', m);
  } catch (error) {
    conn.reply(m.chat, `Error : ${error}`, m);
  }
};

handler.help = ['tiktok'].map((v) => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^t(t|iktok(d(own(load(er)?)?|l))?|td(own(load(er)?)?|l))$/i;

export default handler;

async function tiktokdl(url) {
  if (!/tiktok/.test(url)) {
    throw 'الرابط غير صحيح حاول برابط جديد 😆';
  }

  const gettoken = await axios.get('https://tikdown.org/id');
  const $ = cheerio.load(gettoken.data);
  const token = $('#download-form > input[type=hidden]:nth-child(2)').attr('value');
  const param = {
    url: url,
    _token: token,
  };

  const { data } = await axios.request('https://tikdown.org/getAjax?', {
    method: 'post',
    data: new URLSearchParams(Object.entries(param)),
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.115',
    },
  });

  var getdata = cheerio.load(data.html);

  if (data.status) {
    return {
      status: true,
      thumbnail: getdata('img').attr('src'),
      video: getdata('div.download-links > div:nth-child(1) > a').attr('href'),
      audio: getdata('div.download-links > div:nth-child(2) > a').attr('href'),
    };
  } else {
    return {
      status: false,
    };
  }
}