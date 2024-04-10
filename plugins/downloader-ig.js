// Script coded by github.com/Xnuvers007
import { instagramdl } from "@bochilteam/scraper";
import { snapsave } from "@bochilteam/scraper-sosmed";
import fetch from "node-fetch";
import fs from "fs/promises";

var handler = async (m, { args, conn, usedPrefix, command }) => {
  if (!args[0])
    throw `مثال:\n${usedPrefix}${command} https://www.instagram.com/reel/C0EEgMNSSHw/?igshid=MzY1NDJmNzMyNQ==`;
  const instagramUrlRegex = /^(https?:\/\/)?(www\.)?instagram\.com/i;
  if (!instagramUrlRegex.test(args[0])) {
    conn.reply(
      m.chat,
      `الرجاء إدخال رابط Instagram\nمثال: ${usedPrefix}${command} https://www.instagram.com/reel/C0zv5N7ShOs/?utm_source=ig_web_copy_link`,
      m
    );
    return;
  }

  let res;
  try {
    res = await snapsave(args[0]);
    conn.reply(m.chat, "جاري تحميل الفيديو... على خادم snapsave", m);
  } catch (error1) {
    try {
      res = await instagramdl(args[0]);
      conn.reply(
        m.chat,
        "جاري تحميل الفيديو... على خادم instagramdl",
        m
      );
    } catch (error2) {
      console.log("error", error2);
      conn.reply(m.chat, "فشل تحميل الفيديو", m);
      return;
    }
  }

  try {
    let media = await res[0].url;
    const sender = m.sender.split(`@`)[0];

    if (!res) throw "لا يمكن تحميل المنشور";

    await conn.sendMessage(
      m.chat,
      {
        video: { url: media },
        caption: `_*instagram.com/ovmar_1*_`,
        mentions: [m.sender],
      },
      m
    );
  } catch (e) {
    conn.reply(m.chat, "فشل تحميل الفيديو", m);
  }
};

handler.help = ["instagram"];
handler.tags = ["downloader"];
handler.command = /^(ig(dl)?|instagram(dl)?)$/i;

export default handler;