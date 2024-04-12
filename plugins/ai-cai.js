import { ApiGratis } from '../../lib/ai/api-gratis.js';
import chalk from 'chalk';

const handler = async (m, { conn, command, usedPrefix, text }) => {
    conn.externalIds = conn.externalIds || {};

    if (!text) {
        return m.reply(`
            أدخل استعلامًا. مثال: ${usedPrefix + command} مرحباً
            الاستخدام:
            ${usedPrefix + command} <external_id> - الحصول على معلومات شخصية بواسطة معرف خارجي.
            ${usedPrefix + command} <query> - البحث عن شخصية بواسطة الاستعلام.
            ${usedPrefix + command} - الحصول على الحالة الحالية.
            ${usedPrefix + command} <message> - إرسال رسالة باستخدام معرف خارجي محفوظ.
            ${usedPrefix + command} <external_id> - تعيين معرف خارجي لأمر .cai.
        `.trim());
    }

    const apiClient = new ApiGratis();

    try {
        let message = '';

        if (command === 'caiinfo') {
            const characterInfo = (await apiClient.getCharacterInfo(text)).result.character;
            message = characterInfo ? formatCharacterInfo(characterInfo) : 'لم يتم العثور على معلومات الشخصية.';
        } else if (command === 'caistats') {
            const status = (await apiClient.getStatus()).result;
            message = status.status === 'ok' ? formatStatus(status) : 'لم يتم العثور على الحالة.';
        } else if (command === 'cai') {
            message = conn.externalIds[m.chat] ? ((await apiClient.sendMessage(conn.externalIds[m.chat], text)).result.replies[0]?.text ?? 'لا توجد ردود من الذكاء الاصطناعي.') : 'لم يتم تعيين معرف خارجي. استخدم أمر .caiset لتعيين معرف خارجي. ❗';
        } else if (command === 'caisearch') {
            const searchResults = (await apiClient.searchCharacters(text)).result.characters;
            message = searchResults ? formatSearchResults(searchResults) : 'لم يتم العثور على نتائج البحث.';
        } else if (command === 'caiset') {
            if (!text) {
                message = `يرجى تقديم معرف خارجي للتعيين. مثال: ${usedPrefix}caiset your_external_id`;
            } else {
                conn.externalIds[m.chat] = text.trim();
                message = 'تم تعيين المعرف الخارجي بنجاح! ✅';
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

handler.help = ["cai", "caiinfo", "caistats", "caiset", "caisearch"];
handler.tags = ["ai"];
handler.command = /^(cai|caiinfo|caistats|caiset|caisearch)$/i;

export default handler;

function formatCharacterInfo(character) {
    const {
        title,
        name,
        visibility,
        greeting,
        avatar_file_name,
        participant__num_interactions,
        user__username,
        priority,
        search_score
    } = character;
    return `*العنوان:* ${title}\n*الاسم:* ${name}\n*الرؤية:* ${visibility}\n*التحية:* ${greeting}\n*الصورة الرمزية:* ${avatar_file_name}\n*مشاركات المشارك:* ${participant__num_interactions}\n*اسم المستخدم:* ${user__username}\n*الأولوية:* ${priority}\n*نقاط البحث:* ${search_score}`;
}

function formatStatus(status) {
    const {
        version,
        cai_status
    } = status;
    const isAuthenticated = cai_status.is_authenticated ? 'نعم' : 'لا';
    const isBrowserLaunched = cai_status.browser_launched ? 'نعم' : 'لا';
    return `*الحالة:* جيد\n*النسخة:* ${version}\n*مصادق عليه:* ${isAuthenticated}\n*تم تشغيل المتصفح:* ${isBrowserLaunched}`;
}

function formatSearchResults(characters) {
    return characters.slice(0, 10).map((char, index) => `*${index + 1}.* ${char.title}\n   *الاسم:* ${char.participant__name}\n   *المعرف الخارجي:* ${char.external_id}\n   *التحية:* ${char.greeting}\n   *الرؤية:* ${char.visibility}\n   *مشاركات المشارك:* ${char.participant__num_interactions}\n   *اسم المستخدم:* ${char.user__username}\n   *الأولوية:* ${char.priority}\n   *نقاط البحث:* ${char.search_score}`).join('\n\n');
}