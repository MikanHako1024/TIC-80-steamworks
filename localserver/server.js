const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

const BUILD_DIR = '../build/bin/';
const WIN_EXE_FILENAME = 'tic80.exe';
const WIN_ZIP_FILENAME = 'tic80-export.zip';
const DOWNLOAD_FILENAME = WIN_EXE_FILENAME;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

function downloadWin(res) {
	const filename = path.join(__dirname, BUILD_DIR, WIN_EXE_FILENAME);
	const rs = fs.createReadStream(filename);
	res.setHeader('Content-Type', 'application/octet-stream');
	res.setHeader('Content-Disposition', `attachment; filename="${WIN_EXE_FILENAME}"`);
	rs.pipe(res);
}

// tic80.com/exports/<VERSION>/<TARGET>
// any <VERSION> for latest version
app.get('/export/*/win', (req, res) => {
    console.log(`GET ${req.originalUrl}`);
	downloadWin(res);
});

app.get('/export/*/winjs', (req, res) => {
    console.log(`GET ${req.originalUrl}`);
	downloadWin(res);
});

app.get('/export/*/*', (req, res) => {
    console.log(`Unknown GET ${req.originalUrl}`);
});
