import fetch from 'node-fetch';

export async function before(m) {
    const { alicia } = global.db.data.chats[m.chat] || {};
    if (m.isBaileys || !alicia || !m.text) return false;

    const text = m.text.replace(/[^\x00-\x7F]/g, '').trim();
    if (!text) return false;

    const url = `https://api.azz.biz.id/api/alicia?q=${encodeURIComponent(text)}&user=${m.name}&key=global`;

    try {
        const api = await fetch(url);
        const res = await api.json();

        if (res.respon) {
            await this.reply(m.chat, `*اليسيا تقول:*\n${res.respon || ''}`, m);

            if (text.trim().toUpperCase() === 'ALICIA STOP') {
                alicia = false;
                await this.reply(m.chat, `*تم إيقاف اليسيا بنجاح*`, m);
            }
            return true;
        }
    } catch (error) {
        // يمكنك معالجة الأخطاء هنا
    }

    await this.reply(m.chat, `*خطأ في الاتصال باليسيا*`, m);
    return true;
}