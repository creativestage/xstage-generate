const ModuleGenerate = require('../src/moduleGenerate');

const generator = new ModuleGenerate({
  id: 'f12',
  html: '<div><span>{{msg}}</span></div>',
  css: '.a {.b {width: 200px}}',
  config: JSON.stringify({
    msg: 12
  }),
  js: `
    new Vue({
      data:() => (this.msg),
      mounted() {
        console.log('ok)
      }
    }).$mouted(this.id)
  `
})