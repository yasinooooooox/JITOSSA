import { exec } from 'child_process';

let handler = async (m, { conn, usedPrefix, command, isOwner }) => {
    
    try {
        const repoOwner = 'AOMAR-7'; // https://github.com/AOMAR-7/JITOSSA
        const repoName = 'JITOSSA';
        const branch = 'master'; //masterdefault

        m.reply('Checking for updates...');

        exec(`git ls-remote https://github.com/${repoOwner}/${repoName}.git ${branch}`, async (error, stdout, stderr) => {
            if (error) {
                console.error('Update check error:', error);
                console.error('Update check stderr:', stderr);
                await conn.reply(m.chat, 'جاري البحث عن تحديث.', m);
                return;
            }

            const remoteCommit = stdout.trim();
            const localCommit = require('child_process').execSync('git rev-parse HEAD').toString().trim();

            if (remoteCommit === localCommit) {
                await conn.reply(m.chat, '> Jessi-MD is up to date. No updates found.', m);
            } else {
                await conn.reply(m.chat, 'ثم الوصول إلىتحديث جديد من ق%& المطور جاري التحديث', m);

                exec('git pull origin main', async (updateError, updateStdout, updateStderr) => {
                    if (updateError) {
                        console.error('> JITOSSA update error:', updateError);
                        console.error('> JITOSSA update stderr:', updateStderr);
                        await conn.reply(m.chat, '> JITOSSA update failed.', m);
                        return;
                    }

                    await conn.reply(m.chat, '> JITOSSA ثم تحديث البوت.  إعادة تشغيل البوت مجددا', m);

                    
                    setTimeout(() => {
                        conn.send('> Jessi-MD is restarting...');
                        process.exit(0);
                    }, 1000);
                });
            }
        });
    } catch (err) {
        console.error('Update check error:', err);
        await conn.reply(m.chat, 'Update check failed.', m);
    }
};

handler.help = ['update];
handler.tags = ['misc'];
handler.command = /^(update)$/i;

handler.owner = true
handler.botAdmin = true



export default handler;
