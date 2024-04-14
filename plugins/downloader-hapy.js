import fetch from 'node-fetch';

let handler = async (m, { conn, args, text, usedPrefix, command, sender }) => {
    if (!args[0]) throw 'Ex: ' + usedPrefix + command + ' <عنوان URL لـ HappyMod>';
    let res = await apk(text, sender);

    await conn.sendMessage(m.chat, {
        text: `جارٍ تنزيل APK...`,
    });

    await conn.sendMessage(
        m.chat,
        { document: { url: res.download }, mimetype: res.mimetype, fileName: res.fileName },
        { quoted: m }
    );
};

handler.command = /^(hapy)$/i;
handler.help = ['hapy <عنوان URL>'];
handler.tags = ['applications'];
handler.premium = false;
export default handler;

async function apk(url, sender) {
    let res = await fetch('https://api.happymod.com/vergion/3.0/apkdetails?id=' + encodeURIComponent(url));
    let data = await res.json();
    let fileName = data.data.title + '.apk';
    let download = data.data.url;
    let size = (await fetch(download, { method: 'head' })).headers.get('Content-Length');

    if (!size) throw 'لا يمكن تنزيل APK!';
    let mimetype = (await fetch(download, { method: 'head' })).headers.get('content-type');

    return { fileName, mimetype, download, size };
}