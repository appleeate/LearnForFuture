import  Dep  from './Dep.js';

export default class Watcher {
  constructor(vm, expOrFn, cb) {
    this.cb = cb;
    this.vm = vm;
    this.expOrFn = expOrFn;
    this.value = this.get();
  }
  get() {
    // 在实例化某个 watcher 的时候，会将Dep类的静态属性 Dep.target 指向这个 watcher 实例
    Dep.target = this;
    // 在这一步 this.vm._data[this.expOrFn] 调用了 data 里某个 key 的 getter, 然后 getter 判断类的静态属性 Dep.target 不为null, 而为 watcher 的实例， 从而把这个 watcher 实例添加到 这个 key 对应的 dep 实例里。 巧妙！
    const value = this.vm._data[this.expOrFn];
    // 重置类属性 Dep.target 
    Dep.target = null;
    return value;
  }

  // 如果 data 里的某个 key 的 setter 被调用，则 key 会通知到 该 key 对应的 dep 实例, 该Dep实例， 该 dep 实例会调用所有 依赖于该 key 的 watcher 实例的 update 方法。
  update() {
    this.run();
  }
  run() {
    const value = this.get();
    if (value !== this.value) {
    this.value = value;
    // 执行 cb 回调
    this.cb.call(this.vm, value);
    }
  }
  
  addDep(dep){
    dep.addSub(this)
  }
}