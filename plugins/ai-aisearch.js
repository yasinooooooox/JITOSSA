import fetch from 'node-fetch';

const endpoint = 'https://v2-guru-indratensei.cloud.okteto.net/perplexity?query=';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        let text;
        if (args.length >= 1) {
            text = args.slice(0).join(" ");
        } else if (m.quoted && m.quoted.text) {
            text = m.quoted.text;
        } else {
            return m.reply("البحث التي تريده الرسالة!");
        }
        
        conn.sendPresenceUpdate('composing', m.chat);
        let emsg = await conn.sendMessage(m.chat, { text: 'wait' });

        const prompt = encodeURIComponent(text);
        const response = await fetch(endpoint + prompt);

        if (!response.ok) {
            throw `تلقيت استجابة خطأ من الخادم: ${response.status} - ${response.statusText}`;
        }

        const data = await response.json();
        const result = data.response.trim();
        
        await conn.relayMessage(m.chat, {
            protocolMessage: {
                key: emsg.key,
                type: 14,
                editedMessage: {
                    conversation: result
                }
            }
        }, {});
    } catch (error) {
        console.error('خطأ:', error);
        m.reply(`حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى لاحقًا.`);
    }
};

handler.help = ['aisearch']
handler.tags = ['ai']
handler.command = ['aisearch'];
handler.limit = true;

export default handler;