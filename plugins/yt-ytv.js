import ytdl from "ytdl-core";

let handler = async (m, { conn, text, usedPrefix, command }) => {
	if (!text) return m.reply(`*مثال:* .${command} https://www.youtube.com/xxxxxxx`);
	conn.reply(wait));
	try {
		let [videoInfo, videoBuffer] = await Promise.all([getYoutubeInfo(text), downloadVideo(text)]);
		conn.sendFile(m.chat, videoBuffer, `${videoInfo.title}.mp4`, `العنوان: ${videoInfo.title}\nالحجم: ${formatBytes(videoBuffer.length)}\nالجودة: 360p`, m, 0, {
			mimetype: "video/mp4",
			asDocument: true,
		});
	} catch (error) {
		console.error(error);
		m.reply("حدث خطأ أثناء معالجة الطلب.");
	}
};

handler.help = ['ytmp4']
handler.tags = ['downloader']
handler.command = ['ytmp4', 'ytv']
export default handler;

async function getYoutubeInfo(url) {
	try {
		const { videoDetails } = await ytdl.getInfo(url, { lang: "en", quality: 'lowest' });
		return {
			title: videoDetails.title,
			channel: videoDetails.author.name,
			seconds: videoDetails.lengthSeconds,
			description: videoDetails.description,
			image: videoDetails.thumbnails.slice(-1)[0].url,
		};
	} catch (error) {
		throw error;
	}
}

async function downloadVideo(url) {
	try {
		const stream = ytdl(url, {
			filter: "videoandaudio",
			quality: 'lowest',
			format: 'mp4',
			highWaterMark: 1024 * 1024 * 10, // 300MB
		});
		const chunks = [];
		stream.on("data", (chunk) => {
			chunks.push(chunk);
		});
		await new Promise((resolve, reject) => {
			stream.on("end", resolve);
			stream.on("error", reject);
		});
		return Buffer.concat(chunks);
	} catch (error) {
		throw error;
	}
}

// دالة مساعدة لتنسيق حجم الملف
function formatBytes(bytes, decimals = 2) {
	if (bytes === 0) return '0 Bytes';
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}