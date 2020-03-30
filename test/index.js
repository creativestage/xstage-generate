const renderPageHtml = require('../src');
const fs = require('fs');

renderPageHtml('你好页面', [
  {
    id: 'f12',
  html: '<div><span>{{msg}}</span></div>',
  css: '.a {.b {width: 2/@m}}',
  config: JSON.stringify({
    msg: 12
  }),
  js: `
    $this = this;
    ;new Vue({
      data: {msg: this.config.msg},
      mounted() {
        console.log(this.msg)
        $this.require('https://cdn.bootcss.com/jquery/3.4.1/jquery.js').then(() => {
          console.log($)
        })
        setTimeout(() => {
          this.msg = 444;
        }, 1000)
        $this.Event.on('myevent', (a, b) => {
          this.msg = a + b;
        });
      },
      methods: {
        
      }
    }).$mount(this.el)
  `
  },
  {
    id: 'f6666',
  html: '<div @click="onClick"><span>{{msg}}</span></div>',
  css: '.a {.b {width: 200px}}',
  config: JSON.stringify({
    msg: 'xu'
  }),
  js: `
    new Vue({
      data: {msg: this.config.msg},
      mounted() {
        console.log(this.msg)
        setTimeout(() => {
          this.msg = '888';
        }, 1000)
      },
      methods: {
        onClick() {
          console.log($this.Event)
          $this.Event.emit('myevent', 1, 9)
        }
      }
    }).$mount(this.el)
  `
  }
]).then(html => {

// console.log(html)

  fs.writeFileSync('./test.html', html, 'utf8')
})
