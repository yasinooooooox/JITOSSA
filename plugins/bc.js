import fs from 'fs';
let handler = async (m, { conn, text } ) => {  
    let chatsall = Object.entries(conn.chats).filter(([_, chat]) => chat.isChats).map(v => v[0]);
    let cc = text ? m : m.quoted ? await m.getQuotedObj() : false || m;
    let teks = text ? text : cc.text;
    
    for (let id of chatsall) { 
        conn.sendButton(id, `╭━〘هاتسوني ميكو-بوت〙━⊷\n┃ ⛥│إعلان*\n┃ ⛥│${text}\n┃ ⛥╰───────────\n╰━━━━━━━━━━━──⊷`, 
            'اضغط هنا للانضمام إلى المجموعة الرسمية', 
            fs.readFileSync('./src/avatar_contact.png'), 
            [['المالك', '.owner'],['المانح', '.donar']], 
            false, 
            { 
                contextInfo: { 
                    externalAdReply: {
                        title: 'إعلان رسمي لجميع الدردشات',
                        body: 'هاتسوني ميكو-بوت', 
                        sourceUrl: `https://chat.whatsapp.com/L283DFlWlgVKWH40TOrUnP`, 
                        thumbnail: fs.readFileSync('./src/Menu2.jpg') 
                    } 
                }
            }
        );
    }

    m.reply(`[❗️INFO❗️] تم إرسال إعلان إلى جميع الدردشات\n\n*ملاحظة: هذا مجرد تجربة فقط*`);
};

handler.help = ['broadcast', 'bc'].map(v => v + ' <النص>');
handler.tags = ['owner'];
handler.command = /^(broadcast|bc)$/i;
handler.rowner = true;

export default handler;