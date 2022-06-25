// 压缩js

const UglifyJS = require("uglify-es");

const path = require('path');

const fs = require('fs');

const jsPath = path.resolve(__dirname, '../src/template/page-build.js');

const js = fs.readFileSync(jsPath, 'utf-8');

let uyjs = UglifyJS.minify(js);

fs.writeFileSync(jsPath, uyjs.code, 'utf-8');