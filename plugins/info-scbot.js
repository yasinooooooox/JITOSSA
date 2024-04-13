import fetch from 'node-fetch'; // استيراد مكتبة fetch لإجراء طلبات HTTP
import moment from 'moment-timezone'; // استيراد مكتبة moment-timezone للتعامل مع التواريخ والأوقات

var handler = async (m, { conn, usedPrefix }) => {
    let res = await fetch('https://api.github.com/repos/Omarcharaf1/JITOSSA');
    let json = await res.json();

    let git = `*معلومات البوت*\n\n◦ *الاسم* : ${json.name}\n◦ *عدد الزوار* : ${json.watchers_count}\n◦ *الحجم* : ${(json.size / 1024).toFixed(2)} ميجابايت\n◦ *تاريخ التحديث* : ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}\n◦ *رابط المشروع* : ${json.html_url}\n\n	   ${json.forks_count} Forks · ${json.stargazers_count} Stars · ${json.open_issues_count} Issues\n\n${azami}`;

    await conn.sendUrl(m.chat, git, m, { externalAdReply: { mediaType: 1, renderLargerThumbnail: true, thumbnail: imagen2, thumbnailUrl: imagen1, title: '\t\t\t\t\t\ _JITOSSA MD_', }});
}

handler.tags = ['info']; // وسم يدل على نوعية الأمر
handler.help = ['script']; // وصف الأمر
handler.command = ['sc', 'script', 'codigo', 'git', 'github']; // الأوامر التي يتم استخدامها لاستدعاء الأمر

handler.register = true; // تفعيل تسجيل الأمر ليظهر في قائمة المساعد

export default handler; // تصدير الأمر