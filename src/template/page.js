class EventEmitter {
  constructor() {
    this.cacheEmitter = {};
  }
  on(eventName, cb) {
    const handles = this.cacheEmitter[eventName] || [];
    handles.push(cb);
    this.cacheEmitter[eventName] = handles;
  }
  emit(eventName, ...argv) {
    const handles = this.cacheEmitter[eventName] || [];
    handles.forEach(handler => {
      handler(...argv);
    });
  }
}
window.CWEvent = new EventEmitter();
class Compiler {
  constructor(options) {
    const {id, config} = options;
    this.el = '#' + id;
    this.config = config;
    this.Event = window.CWEvent;
  }
  require(jsSrc) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = jsSrc;
      document.getElementsByTagName('head')[0].appendChild(script);
      script.onload = resolve;
      script.onerror = reject;
    });
  }
}
window.Compiler = Compiler;