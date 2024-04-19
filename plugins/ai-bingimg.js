import { BingImageCreator } from "../lib/bingimg.js";
export const handler = async (m, { conn, args, usedPrefix, command }) => {
 let text;
 if (args.length >= 1) {
 text = args.slice(0).join(" ");
 } else if (m.quoted && m.quoted.text) {
 text = m.quoted.text;
 } else {
 throw "*تخيل والبوت يرسم  مثال 😉:*\n .bingimg cat play with man";
 }
 await m.reply("المرجو الانتظار سنحاول رسم صورتك ...\nتابعني في الانستغرام تشجيعا لي \ninstagram.com/noureddine_ouafy");
 try {
 const res = new BingImageCreator({
 cookie: "1vwIsoUtbCSQaGLu4tRgkfI9chk7IEgJJPNzRe2nEreGTYUQ0SvylL1BMdyWYwxDuC2Kt-H5KLtPnDKlCReY1WXoJBW20ArsaTiIuPG4UnpPc530PUOfy8eG2UE8x6AdCUVF92yFevh2Lk7fwTXtnpABqjP6syjQSsVusSTLiey_Gg6bnTIJIo34YspbDjhs1QNbNxglB0robYk3BDQOVnQ",
 });
 const data = await res.createImage(text);
 if (data.length > 0) {
 for (let i = 0; i < data.length; i++) {
 try {
 if (!data[i].endsWith(".svg")) {
 await conn.sendFile(
 m.chat,
 data[i],
 "",
 `😎 *(${i + 1}/${data.length})*\n\n*Prompt*: ${text}`,
 m,
 false,
 { mentions: [m.sender] },
 );
 }
 } catch (error) {
 console.error(`Error sending file: ${error.message}`);
 await m.reply(`Failed to send image *(${i + 1}/${data.length})*`);
 }
 }
 } else {
 await m.reply("لم يتم العثور على أي صورة.");
 }
 } catch (error) {
 console.error(`Error in handler: ${error.message}`);
 await m.reply(`${error}\n\n${error.message}`);
 }
};
handler.help = ["bingimg"]
handler.tags = ["drawing"];
handler.command = ["bingimg"];
export default handler