const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

const RESOURCE_DIR = '../resources/';
const FILE_EXTENSION = '.exe';

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

function makeFilename(version, target) {
	return `${target}${FILE_EXTENSION}`;
}

function makeFullname(version, target) {
	const versionDir = `${version}`;
	const filename = makeFilename(version, target);
	return path.join(__dirname, RESOURCE_DIR, versionDir, filename);
}

function downloadFile(res, version, target) {
	const filename = makeFilename(version, target);
	const fullname = makeFullname(version, target);
	if (fs.existsSync(fullname) && fs.statSync(fullname).isFile()) {
		const rs = fs.createReadStream(fullname);
		res.setHeader('Content-Type', 'application/octet-stream');
		res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
		rs.pipe(res);
		rs.on('error', (error) => {
			if (!res.headersSent) {
				res.status(500);
			}
		});
		res.on('error', (error) => {
			console.error('ReadStream Error:', error);
			rs.destroy();
		});
		res.on('close', () => {
			rs.destroy();
		});
		return true;
	}
	else {
		console.warn(`  Don't found file "${makeFullname(version, target)}"`);
		res.sendStatus(400);
	}
}

// tic80.com/exports/<VERSION>/<TARGET>
app.get('/export/:version/:target', (req, res) => {
	const version = req.params.version || '';
	const target = req.params.target || '';
	console.log(`GET ${req.originalUrl} : Version="${version}", Target="${target}"`);
	downloadFile(res, version, target);
});

app.get('/export/*', (req, res) => {
	console.log(`GET ${req.originalUrl}: Unknown Get`);
	res.sendStatus(400);
});
