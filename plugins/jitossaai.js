import axios from 'axios';

let smartModeEnabled = true; // تعيين الوضع الذكي كافتراضياً عند تشغيل البوت
let enabledUsers = {}; // متغير لتخزين حالة تفعيل الوضع الذكي للمستخدمين

let handler = async (m, { conn, text }) => {
  conn.autoai = conn.autoai ? conn.autoai : {};

  if (!text) {
    throw `*يمكنك الآن التحدث مع الذكاء الاصطناعي مباشرة بدون أوامر. يمكنك تفعيل الوضع الذكي عبر .autoai on وإلغاء الوضع الذكي عبر .autoai off*`;
  }

  // التحقق من تفعيل الوضع الذكي عند تشغيل البوت
  if (smartModeEnabled && !enabledUsers[m.sender]) {
    enabledUsers[m.sender] = true; // تفعيل الوضع الذكي للمستخدم
    conn.autoai[m.sender] = { pesan: [] };
    m.reply("[ ✓ ] تم الانتقال بنجاح للوضع الذكي للبوت إسألني أي سؤال وسوف أجيبك لا تتردد يا صديقي 😉");
  }

  if (text == "on") {
    enabledUsers[m.sender] = true; // تفعيل الوضع الذكي للمستخدم
    conn.autoai[m.sender] = { pesan: [] };
    m.reply("[ ✓ ] تم الانتقال بنجاح للوضع الذكي للبوت إسألني أي سؤال وسوف أجيبك لا تتردد يا صديقي 😉");
  } else if (text == "off") {
    delete enabledUsers[m.sender]; // إلغاء تفعيل الوضع الذكي للمستخدم
    delete conn.autoai[m.sender];
    m.reply("[ ✓ ] تم بنجاح الرجوع للوضع العادي للبوت");
  } else {
    // الإرسال للخادم الخارجي
    let name = conn.getName(m.sender);
    await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});
    const messages = [
      ...conn.autoai[m.sender].pesan,
      { role: "system", content: `انا بوت واتساب  ${name}` },
      { role: "user", content: text }
    ];

    try {
      const response = await axios.post("https://deepenglish.com/wp-json/ai-chatbot/v1/chat", {
        messages
      });

      const responseData = response.data;
      const hasil = responseData;
      await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key }});
      m.reply(hasil.answer);
      conn.autoai[m.sender].pesan = messages;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
}

handler.before = async (m, { conn }) => {
  conn.autoai = conn.autoai ? conn.autoai : {};
  if (m.isBaileys && m.fromMe) return;
  if (!m.text) return;

  if (!enabledUsers[m.sender]) return;

  if (
    m.text.startsWith(".") ||
    m.text.startsWith("#") ||
    m.text.startsWith("!") ||
    m.text.startsWith("/") ||
    m.text.startsWith("\\/")
  ) return;

  // التحقق من وقت آخر طلب للمستخدم ومنع الطلبات المتكررة
  let now = Date.now();
  if (conn.lastRequestTime && now - conn.lastRequestTime < 5000) { // الحد الزمني: 5 ثواني
    m.reply("برجاء الانتظار قليلاً قبل إرسال طلب آخر.");
    return;
  }

  conn.lastRequestTime = now; // تحديث وقت آخر طلب للمستخدم
}

handler.command = ['autoai'];
handler.tags = ["ai"];
handler.help = ['autoai'];
export default handler;