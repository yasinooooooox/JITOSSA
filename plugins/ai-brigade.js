import { BotBrigade } from '../../lib/ai/brigade.js';
import chalk from 'chalk';

const handler = async (m, { conn, command, usedPrefix, text }) => {
    conn.brigadeIds = conn.brigadeIds || {};

    if (!text) {
        return m.reply(`
            أدخل استعلامًا. مثال: ${usedPrefix + command} مرحباً
            الاستخدام:
            ${usedPrefix + command} <message> - إرسال رسالة باستخدام معرف خارجي محفوظ.
            ${usedPrefix + command} <external_id> - تعيين معرف خارجي لأمر .brigade.
        `.trim());
    }

    const apiClient = new BotBrigade();

    try {
        let message = '';

        if (command === 'brigade') {
            message = conn.brigadeIds[m.chat] ? ((await apiClient.ReqChat(conn.brigadeIds[m.chat], text)).response ?? 'لا توجد ردود من الذكاء الاصطناعي.') : 'لم يتم تعيين معرف خارجي. استخدم أمر .brigadeset لتعيين معرف خارجي. ❗';
        } else if (command === 'brigadeset') {
            if (!text) {
                message = `يرجى تقديم معرف خارجي للتعيين. مثال: ${usedPrefix}brigadeset your_external_id`;
            } else {
                const brigadeList = ["أنيس-إمين", "برابوو-جيبران", "غنجر-محفوظ"];
                const brigadeOptions = brigadeList.map((brigade, index) => `${index + 1}. ${brigade}`).join('\n');
                const index = parseInt(text.trim()) - 1;
                if (index >= 0 && index < brigadeList.length) {
                    conn.brigadeIds[m.chat] = brigadeList[index];
                    message = 'تم تعيين المعرف الخارجي بنجاح! ✅';
                } else {
                    message = `فهرس غير صالح. يرجى اختيار فهرس صالح من القائمة:\n${brigadeOptions}`;
                }
            }
        } else {
            message = 'أمر غير صالح. ❌';
        }

        await m.reply(message);
    } catch (error) {
        console.error(chalk.red('خطأ:', error.message));
        await m.reply(`خطأ: ${error.message} ❌`);
    }
};

handler.help = ["brigade", "brigadeset"];
handler.tags = ["ai"];
handler.command = /^(brigade|brigadeset)$/i;

export default handler;