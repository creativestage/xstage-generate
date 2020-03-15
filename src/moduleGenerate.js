const less = require('less');
const UglifyJS = require("uglify-es");
const lessUint =  '@m: 46.875rem;';
class ModuleGenerate {
  constructor(moduleOptions) {
    this.options = moduleOptions;
  }
  async init() {
    const {id, html, css, js, config} = this.options;
    this.config = config;
    this.id = id;
    this.template = this.wrapTemplate(html);
    
    this.script = this.getScript(js);
    this.style = await this.lessToCss(css);
    return this;
  }
  async lessToCss(css) {
    try {
      let cssText = await less.render(lessUint + css);
      return `<style>${cssText.css}</style>`;
    } catch (e) {
      return '';
    }
  }
  wrapTemplate(html) {
    const prev = `<div id="${this.id}" v-cloak>`;
    const end = '</div>';
    return prev + html + end;
  }
  getScript(js) {
    let uyjs = UglifyJS.minify(js);
    if (uyjs.error) {
      throw new Error(uyjs.error);
    }
    return `
      <script>
        try {
          ;new Function(\`${uyjs.code}\`).call(new Compiler({id:\'${this.id}\', config: ${this.config}}))
        } catch(e) {
          console.error(e)
        }
      </script>
    `;
  }
}

module.exports = ModuleGenerate;