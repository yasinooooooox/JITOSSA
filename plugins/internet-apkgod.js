import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, text, command }) => {

    let lister = [
        "s",
        "d"
    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*مثال:* .apkgod search|vpn\n\n*اختر نوعًا متوفرًا*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("ادخل رابط الاستعلام\n*مثال:* .apkgod search|vpn")
            await m.reply(wait)
            try {
                let res = await searchApkgod(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 [ نتيجة ${index + 1} ]

🔗 *الرابط:* ${item.link}
📰 *العنوان:* ${item.title}
🖼️ *الصورة:* ${item.image}
🏷️ *العلامات:* ${item.tags}
🔢 *الإصدار:* ${item.version}`

                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "app") {
            if (!inputs) return m.reply("ادخل رابط التطبيق\n*مثال:* .apkgod app|link")
            try {
                let resu = await getLinkDown(inputs)
                let resl = await getResultLink(resu[0].link)

                let cap = "*Name:* " + resl.title + "\n" + "*Link:* " + resl.link + "\n\n" + wait
                await conn.sendFile(m.chat, resl.icon, "", cap, m)
                await conn.sendFile(m.chat, resl.link, resl.title, null, m, true, {
                    quoted: m,
                    mimetype: "application/vnd.android.package-archive"
                })
            } catch (e) {
                await m.reply(eror)
            }
        }
    }
}
handler.help = ["apkgod"]
handler.tags = ["applications"]
handler.command = /^(apkgod)$/i
export default handler

/* New Line */
async function searchApkgod(q) {
    const url = 'https://apkgod.co/?s=' + q;

    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const items = [];

    $('article.flex-item').each((index, element) => {
        const $element = $(element);
        const item = {
            title: $element.find('.app-name h3').text().trim(),
            image: $element.find('.app-icon img').attr('src'),
            version: $element.find('.app-name .has-small-font-size').first().text().trim(),
            tags: $element.find('.app-tags .app-tag').map((index, tag) => $(tag).text().trim()).get(),
            link: $element.find('a.app').attr('href')
        };

        items.push(item);
    });

    return items;
}

async function getLinkDown(url) {
    try {
        const response = await fetch(url.endsWith('/download') ? url : url + '/download');
        const html = await response.text();
        const $ = cheerio.load(html);

        const downloadList = $('.download-list.margin-top-15');

        const results = [];

        downloadList.find('details').each((index, element) => {
            const downloadItem = $(element).find('.download-item');
            const icon = downloadItem.find('.download-item-icon img').attr('src');
            const name = downloadItem.find('.download-item-name .has-vivid-cyan-blue-color').text().trim();
            const link = $(element).find('.collapsible-body .wp-block-button__link').attr('href');

            results.push({
                icon,
                name,
                link
            });
        });

        return results;
    } catch (error) {
        throw new Error(`Scraping failed: ${error}`);
    }
}

async function getResultLink(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        const entryContent = $('.entry-block.entry-content.main-entry-content');
        const appIcon = entryContent.find('.app-icon img').attr('src');
        const appName = entryContent.find('.app-name .app-box-name-heading h1').text().trim();
        const appVersion = appName.match(/\[Latest\]$/i) ? 'Latest' : '';
        const appRating = entryContent.find('.app-name .rating span.star.active').length;
        const downloadButton = $('#download-button').attr('href');

        const data = {
            icon: appIcon,
            title: appName,
            version: appVersion,
            rating: appRating,
            link: downloadButton
        };

        return data;
    } catch (error) {
        throw new Error(`Scraping failed: ${error}`);
    }
}