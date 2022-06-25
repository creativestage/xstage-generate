const path = require('path');
const cheerio = require('cheerio');

const fs = require('fs');

const htmlPath = path.resolve(__dirname, '../src/template/page.html');

const jsPath = path.resolve(__dirname, '../src/template/page-build.js');

const jsContent = fs.readFileSync(jsPath, 'utf-8');
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

const $ = cheerio.load(htmlContent, {decodeEntities: false});

$('#js-build').html(jsContent);

let html = $.html();

fs.writeFileSync(htmlPath, html, 'utf-8');
