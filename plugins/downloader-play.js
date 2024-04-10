import fetch from "node-fetch";
import ytdl from "ytdl-core";
import yts from "yt-search";
import { generateWAMessageFromContent } from "@whiskeysockets/baileys";

let dla = "جارٍ تحميل الصوت، يرجى الانتظار"; // ترجمة "Downloading audio please wait"
let dls = "تم تحميل الصوت بنجاح"; // ترجمة "Downloading audio success"
throw "الفيديو غير موجود، جرب عنوانًا آخر"; // ترجمة "Video Not Found, Try Another Title"

let limit = 80;
let handler = async (m, { conn, command, text, args, usedPrefix }) => {
    if (!text) throw `استخدم المثال *${usedPrefix + command}* naruto blue bird`; // ترجمة "Use example *${usedPrefix + command}* naruto blue bird"
    const combinedRegex = /^(play|ytplay|ytmp3|playmp3|playmp4|ytplaymp4)$/i;
    const isMP3 = combinedRegex.test(command);

    try {
        let vid = await searchAndFilterVideos(text);
        if (!vid) throw "الفيديو غير موجود، جرب عنوانًا آخر"; // ترجمة "Video Not Found, Try Another Title"
        let {
            title,
            thumbnail,
            timestamp,
            views,
            ago,
            url
        } = vid;
        let ytthumb = await (await conn.getFile(thumbnail)).data;
        let msg = await generateWAMessageFromContent(m.chat, {
            extendedTextMessage: {
                text: captvid,
                jpegThumbnail: ytthumb,
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        body: dla,
                        containsAutoReply: true,
                        mediaType: 1,
                        mediaUrl: url,
                        renderLargerThumbnail: true,
                        showAdAttribution: true,
                        sourceId: "WudySoft",
                        sourceType: "PDF",
                        previewType: "PDF",
                        sourceUrl: url,
                        thumbnail: ytthumb,
                        thumbnailUrl: thumbnail,
                        title: htki + " Y O U T U B E " + htka
                    }
                }
            }
        }, {
            quoted: m
        });
        await conn.relayMessage(m.chat, msg.message, {});

        if (isMP3) {
            let Ytdl = await ytmp3(url);
            let ytthumb = await (await conn.getFile(Ytdl.meta.image)).data;
            let doc = {
                audio: Ytdl.buffer,
                mimetype: "audio/mp4",
                fileName: Ytdl.meta.title,
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true,
                        mediaType: 2,
                        mediaUrl: url,
                        title: Ytdl.meta.title,
                        body: dls, // ترجمة "Downloading audio success"
                        sourceUrl: url,
                        thumbnail: ytthumb
                    }
                }
            };
            await conn.sendMessage(m.chat, doc, {
                quoted: m
            });
        } else {
            let item = await ytmp4(url);
            let q = args[1] || "360p";
            if ((item.contentLength).split("MB")[0] >= limit) return m.reply(`_يتجاوز حجم الملف الحد المسموح به_ *+${limit} MB*`); // ترجمة "The file exceeds the download limit +${limit} MB"
            let dls = "تم تشغيل الفيديو بنجاح"; // ترجمة "Play video success"
            let doc = {
                video: {
                    url: item.videoUrl
                },
                mimetype: "video/mp4",
                caption: captvid,
                contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true,
                        mediaType: 2,
                        mediaUrl: url,
                        title: item.title,
                        body: dls, // ترجمة "Play video success"
                        sourceUrl: url,
                        thumbnail: await (await conn.getFile(item.image)).data
                    }
                }
            };
            await conn.sendMessage(m.chat, doc, {
                quoted: m
            });
        }
    } catch (e) {
        await m.reply(e); // إرسال رسالة الخطأ كما هي دون ترجمتها
    }
};
handler.help = ["play"].map(v => v + " <بحث>"); // ترجمة "play" مع الاستخدام المحتمل للبحث
handler.tags = ["downloader"]; // ترجمة العلامات إذا لزم الأمر
handler.command = /^(play|ytplay|ytmp3|playmp3|playmp4|ytplaymp4)$/i; // ترجمة الأوامر المسموح بها
handler.limit = true; // ترجمة حدود الاستخدام إذا كان هناك
export default handler;