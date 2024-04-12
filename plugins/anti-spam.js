import { performance } from 'perf_hooks';

const SPAM_THRESHOLD = 5; // عتبة السبام
const COOLDOWN_DURATION = 10000; // مدة التبريد بالمللي ثانية
const BAN_DURATION = 5000; // مدة الحظر بالمللي ثانية

export async function before(m) {
    const users = global.db.data.users; // قاعدة بيانات المستخدمين
    const chats = global.db.data.chats; // قاعدة بيانات الدردشات

    // التحقق من أن السبام مفعل وأن الرسالة ليست من نوع خاص بالنظام وأنها ليست رسالة فارغة وغير محظورة
    if (
        chats[m.chat].antiSpam &&
        !m.isBaileys &&
        !['protocolMessage', 'pollUpdateMessage', 'reactionMessage'].includes(m.mtype) &&
        m.msg &&
        m.message &&
        m.key.remoteJid === m.chat &&
        !users[m.sender].banned &&
        !chats[m.chat].isBanned
    ) {
        this.spam = this.spam || {};
        this.spam[m.sender] = this.spam[m.sender] || {
            count: 0,
            lastspam: 0
        };

        const now = performance.now();
        const timeDifference = now - this.spam[m.sender].lastspam;

        // التحقق من مدة التبريد
        if (timeDifference < COOLDOWN_DURATION) {
            this.spam[m.sender].count++;

            // التحقق من تجاوز عتبة السبام
            if (this.spam[m.sender].count >= SPAM_THRESHOLD) {
                users[m.sender].banned = true; // حظر المستخدم
                this.spam[m.sender].lastspam = now + BAN_DURATION; // تحديد موعد فتح الحظر

                // إلغاء الحظر بعد فترة زمنية
                setTimeout(() => {
                    users[m.sender].banned = false;
                    this.spam[m.sender].count = 0;
                    m.reply(`✅ *انتهت فترة التبريد*\nيمكنك إرسال الرسائل مرة أخرى.`);
                }, BAN_DURATION);

                const remainingCooldown = Math.ceil((this.spam[m.sender].lastspam - now) / 1000);
                const message = m.mtype.replace(/message$/i, '').replace('audio', m.msg.ptt ? 'PTT' : 'audio').replace(/^./, v => v.toUpperCase()) || 'Unknown';
                return m.reply(`❌ *يرجى عدم السبام في ${message}*\nانتظر لمدة ${remainingCooldown} ثانية.`);
            }
        } else {
            this.spam[m.sender].count = 0;
        }

        this.spam[m.sender].lastspam = now;
    }
}