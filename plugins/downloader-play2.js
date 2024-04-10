import fs from 'fs';
import fetch from 'node-fetch';

let handler = async (m, { command, conn, text }) => {
    if (!text) throw `[❗INFO❗] أدخل اسم الأغنية التي تريد البحث عنها\n\n*—◉ مثال:\n#play.1 Good Feeling - Flo Rida*`; // إعلام المستخدم بإدخال اسم الأغنية بالإنجليزية

    try {
        if (command == 'play.1') { // إذا كان الأمر 'play.1'
            conn.reply(m.chat, `*_⏳ انتظر.._⏳*`, m, { // إعلام المستخدم بالانتظار بالإنجليزية
                contextInfo: {
                    externalAdReply: {
                        mediaUrl: sig, // يفترض أن تكون sig معرفة في مكان ما
                        mediaType: 1,
                        description: null,
                        title: 'AUDIO',
                        body: global.wm,
                        previewType: 0,
                        thumbnail: fs.readFileSync("./thumbnail.jpg"),
                        sourceUrl: sgh // يفترض أن تكون sgh معرفة في مكان ما
                    }
                }
            });
            let res = await fetch(`https://api.dhamzxploit.my.id/api/ytplaymp3?text=${text}`);
            let json = await res.json();
            conn.sendFile(m.chat, json.result.url, 'error.mp3', wm, m, null, adReply); // يفترض أن تكون wm و adReply معرفتين في مكان ما
        }

        if (command == 'play.2') { // إذا كان الأمر 'play.2'
            conn.reply(m.chat, `*_⏳ انتظر..⏳_*`, m, { // إعلام المستخدم بالانتظار بالإنجليزية
                contextInfo: {
                    externalAdReply: {
                        mediaUrl: sig, // يفترض أن تكون sig معرفة في مكان ما
                        mediaType: 1,
                        description: null,
                        title: 'VIDEO',
                        body: global.wm,
                        previewType: 0,
                        thumbnail: fs.readFileSync("./thumbnail.jpg"),
                        sourceUrl: `https://github.com/AyGemuy`
                    }
                }
            });
            let res = await fetch(`https://api.dhamzxploit.my.id/api/ytplaymp4?text=${text}`);
            let json = await res.json();
            conn.sendFile(m.chat, json.result.url, '', `*R E S U L T*`, m);
        }
    } catch (e) {
        m.reply('*[❗INFO❗] خطأ، لا يمكن العثور على الأغنية*'); // إخطار المستخدم بوجود خطأ
        console.log(e);
    }
}
handler.help = ['play.1', 'play.2'].map(v => v + ' <text>'); // تعليمات الأمر باللغة الإنجليزية
handler.tags = ['downloader']; // وسم المنزلق للتنزيل
handler.command = ['play.1', 'play.2']; // الأوامر المقبولة
export default handler;