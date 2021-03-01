// 引入将上面中实现的 Observer
import  Observer  from './Observer.js';
import Watcher from './Watch.js';

export default class Vue {
  constructor(options) {
    debugger;
    // 在this上挂在一个公有变量 $options 用来暂存所有参数
    this.$options = options;
    // 声明一个私有变量_data 用来暂存data
    let data = this._data = this.$options.data
    // 在this上面挂在所有的data里面的key值 这些key对应的get/set方法 都呗代理到 this._data上对应的key值
    Object.keys(data).forEach(key => this._proxy(key))
    // 将this._data进行 reactive 化
    new Observer(data, this)
  }

  $watch(expOrFn, cb) {
    new Watcher(this, expOrFn, cb)
  }

  // 将 this.keyName 的某个key值 的 get/set 代理到 this._data.keyName 的具体实现
  _proxy(key) {
    let self = this;
    Object.defineProperty(self, key, {
      enumerable: true,
      configurable: true,
      get: function proxyGetter() {
        return self._data[key]
      },
      set: function proxySetter(val) {
        self._data[key] = val
      }
    })
  }
}