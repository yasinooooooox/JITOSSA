import fetch from 'node-fetch'; // استيراد مكتبة node-fetch

let handler = async (m, { conn, text }) => {
    // التحقق من وجود نص
    if (!text) throw '😇ما الذي تريدني أن أنشئه؟ \n\n مثال\n. bingimg2 women'
    m.react(rwait) // تفعيل رد الفعل انتظار

    // تشفير النص لاستخدامه في URL
    let msg = encodeURIComponent(text)
    let res = await fetch(`https://aemt.me/bingimg?text=${msg}`) // إرسال طلب HTTP للحصول على الصورة
    let data = await res.json() // تحويل الرد إلى JSON
    console.log(data)
    let buffer = data.result // استخراج الصورة من البيانات الواردة
    // إرسال الصورة كمرفق في الدردشة
    conn.sendFile(m.chat, buffer, 'image.png', `_تابعني على إنستجرام 🥰_ \n www.instagram.com/ovmar_1`, m)
    m.react(done) // تفعيل رد الفعل تم
}

handler.help = ['bingimg2 <query>'] // الأمر المساعد
handler.tags = ['drawing'] // الوسم
handler.command = /^bingimg2$/i // نمط الأمر المقبول

export default handler // تصدير الدالة handler كافتراضي للاستخدام في أي مكان آخر