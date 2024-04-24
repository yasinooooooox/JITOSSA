let handler = async (m, { conn, usedPrefix, command }) => {
    m.react(rwait);
    let res = await conn.getFile('https://thispersondoesnotexist.com');
    let img = res.data;
    await conn.sendFile(m.chat, img, 'img.jpg', `✅ هذا الشخص غير موجود، تم إنشاؤه باستخدام الذكاء الاصطناعي`, m);
    m.react(done);
}
handler.help = ['person']
handler.tags = ['image-edit']
handler.command = ['persona', 'person']

export default handler