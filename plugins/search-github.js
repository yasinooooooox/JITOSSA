import fetch from 'node-fetch';

let handler = async (m, { text }) => {
    try {
        if (!text) throw 'ماذا تبحث عنه؟';

        let res = await fetch(global.API('https://api.github.com', '/search/repositories', {
            q: text
        }));
        let json = await res.json();

        if (res.status !== 200) throw json;

        let str = json.items.map((repo, index) => `
${1 + index}. *${repo.full_name}*${repo.fork ? ' (fork)' : ''}
_${repo.html_url}_
_تم إنشاؤه في *${formatDate(repo.created_at)}*_
_آخر تحديث في *${formatDate(repo.updated_at)}*_
👁  ${repo.watchers}   🍴  ${repo.forks}   ⭐  ${repo.stargazers_count}
${repo.open_issues} مشكلة${repo.description ? `
*الوصف:*\n${repo.description}` : ''}
*استنساخ:* \`\`\`$ git clone ${repo.clone_url}\`\`\`
`.trim()).join('\n\n');

        await m.reply(str);
    } catch (error) {
        console.error('Error:', error);
        await m.reply('حدث خطأ أثناء البحث في مستودعات GitHub.');
    }
};

handler.help = ['githubs'];
handler.tags = ['search'];
handler.command = /^(ghs|githubs)$/i;

export default handler;

function formatDate(n, locale = 'id') {
    let d = new Date(n);
    return d.toLocaleDateString(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });
}