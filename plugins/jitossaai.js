import axios from 'axios';

let isSmartModeEnabled = false; // تعيين الوضع الذكي كافتراضيًا على عدم التفعيل
let lastRequestTime = {}; // تخزين وقت آخر طلب لكل مستخدم

let handler = async (m, { conn, text }) => {
  conn.autoai = conn.autoai ? conn.autoai : {};

  if (!text) {
    throw `*يمكنك الآن التحدث مع الذكاء الاصطناعي مباشرة بدون أوامر. يمكنك تفعيل الوضع الذكي عبر .autoai on وإلغاء الوضع الذكي عبر .autoai off*`;
  }

  if (text == "on" && !isSmartModeEnabled) {
    isSmartModeEnabled = true; // تفعيل الوضع الذكي على مستوى البوت
    m.reply("[ ✓ ] تم الانتقال بنجاح للوضع الذكي للبوت إسألني أي سؤال وسوف أجيبك لا تتردد يا صديقي 😉");
  } else if (text == "off" && isSmartModeEnabled) {
    isSmartModeEnabled = false; // إلغاء تفعيل الوضع الذكي على مستوى البوت
    m.reply("[ ✓ ] تم بنجاح الرجوع للوضع العادي للبوت");
  } else {
    // التحقق من تفعيل الوضع الذكي عندما يرسلها المستخدم في المحادثة العامة
    if (isSmartModeEnabled) {
      // التحقق من وقت آخر طلب للمستخدم ومنع الطلبات المتكررة
      let now = Date.now();
      if (lastRequestTime[m.sender] && now - lastRequestTime[m.sender] < 5000) { // الحد الزمني: 5 ثواني
        m.reply("برجاء الانتظار قليلاً قبل إرسال طلب آخر.");
        return;
      }
      lastRequestTime[m.sender] = now; // تحديث وقت آخر طلب للمستخدم

      // الإرسال للخادم الخارجي
      let name = conn.getName(m.sender);
      await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});
      const messages = [
        ...conn.autoai[m.sender]?.pesan || [],
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
    } else {
      m.reply("الرجاء تفعيل الوضع الذكي أولاً عبر .autoai on");
    }
  }
}

handler.before = async (m, { conn }) => {
  conn.autoai = conn.autoai ? conn.autoai : {};
  if (m.isBaileys && m.fromMe) return;
  if (!m.text) return;

  // لا يتم التحقق من الأوامر الخاصة هنا
  // يتم التحقق من تفعيل الوضع الذكي والطلبات المتكررة في الكود الرئيسي handler

  // لا يوجد تحقق من الوضع الذكي هنا
  // الكود الذي يتحقق من تفعيل الوضع الذكي موجود في الكود الرئيسي handler
}

handler.command = ['autoai'];
handler.tags = ["ai"];
handler.help = ['autoai'];
export default handler;