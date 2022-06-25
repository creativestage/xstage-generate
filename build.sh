#!/bin/sh

npm install

./node_modules/@babel/cli/bin/babel.js  ./src/template/page.js --out-file ./src/template/page-build.js

node ./bin/compress.js

node ./bin/insert.js

rm -f ./src/template/page-build.js

echo "build finished"