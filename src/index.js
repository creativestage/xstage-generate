
const cheerio = require('cheerio');
const minify = require('html-minifier').minify;
const fs = require('fs');
const path = require('path');
const ModuleGenerate = require('./moduleGenerate');
let pageTemplate = fs.readFileSync(path.join(__dirname, './template/page.html'), 'utf8');
const renderPageHtml = async (title, modules) => {
  const $ = cheerio.load(pageTemplate, {decodeEntities: false});
  $('title').text(title);
  const moduleGenerator = modules.map(options => {
    const {id, html, js, css, config} = options;
    let generator = new ModuleGenerate({id, html, js, css, config});
    return generator;
  });
  for (let itemModule of moduleGenerator) {
    let context = await itemModule.init();
    const {template, script, style} = context;
    $('head').append(style);
    $('#app').append(template);
    $('body').append(script);
  }
  let html = $.html();
  html = minify(html, {
    minifyJS: true,
    collapseWhitespace: true,
    minifyCSS: true,
    removeComments: true,
    removeCommentsFromCDATA: true,
  });
  return html;
};
module.exports = renderPageHtml;