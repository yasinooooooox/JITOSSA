let handler = async(m, { conn, command }) => {
  let isPublic = command === "public";
  let self = global.opts["self"]

  // التحقق من تغيير وضعية البوت
  if (self === !isPublic) {
    return conn.reply(m.chat, `الوضعية ${!isPublic ? "خاص" : "عام"} الخاصة بك، ${m.sender.split("@")[0] === global.owner[1] ? "أستاذة" : "أستاذ"} :v`, m)
  }

  // تحديث وضعية البوت
  global.opts["self"] = !isPublic

  // رد على الطلب بنجاح تحديث الوضعية
  conn.reply(m.chat, `تم تحديث وضعية البوت إلى ${!isPublic ? "خاص" : "عام"}!`, m)
}

// قائمة المساعدة والكلمات الدالة
handler.help = ["self", "public"]
handler.tags = ["owner"]

// تحديد أن هذا الأمر مخصص لمالك البوت
handler.rowner = true

// تحديد الأوامر المقبولة لتغيير الوضعية
handler.command = /^(self|public)/i

module.exports = handler