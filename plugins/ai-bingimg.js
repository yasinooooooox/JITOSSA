import { BingImageCreator } from "../lib/bingimg.js";
export const handler = async (m, { conn, args, usedPrefix, command }) => {
 let text;
 if (args.length >= 1) {
 text = args.slice(0).join(" ");
 } else if (m.quoted && m.quoted.text) {
 text = m.quoted.text;
 } else {
 throw "*قم بتخيل شئ للبوت وسوف يرسمه  مثال :*\n .bingimg cat play with man";
 }
 await m.reply("*سوف يتم توليد صورتك بعد قليل* \n\n *تابعني على انستجرام*\n _*www.instagram.com/ovmar_1*_");
 try {
 const res = new BingImageCreator({
 cookie: "قم بإضافة ال (cookies) الخاص بك هنا",
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
 ` *(${i + 1}/${data.length})*\n\n www.instagram.com/ovmar_1`,
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