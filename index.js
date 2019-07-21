const axios = require('axios');
const express = require('express');
const injector = require('./injector');

const app = express();

const site = process.env.PROXY_SITE;
const port = process.env.PORT;

app.all('*', async(req, res) => {
	const url = `${site.replace(/\/$/, '')}${req.originalUrl}`;
	try {
		const { data, headers } = await axios.get(url, {
			 responseType: 'stream',
			 headers: {
			 	'User-Agent': req.headers['user-agent'],
			 	'Accept-Language': req.headers['accept-language'],
			 },
		});
		res.set({
			vary: headers.vary,
			'Content-Type': headers['content-type'],
		});

		const isHtml = headers['content-type'].includes('html');

		return data
		.pipe(injector({ site })(isHtml))
     	.pipe(res);
	} catch (e) {
		console.log(`${e.message}: ${url}`);
		res.send('error');
	}
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
