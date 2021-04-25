const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected'
// 新建MyPromise类
class MyPromise {
  constructor(excutor) {
    // excutor 是一个执行期， 进入会立即执行
    excutor(this.resolve, this.reject)
  }

  status = PENDING;

  value = null;
  reason = null;
  // 储存成功回调函数
  onFulfilledCallbacks = [];
  // 储存失败回调函数
  onRejectedCallbacks = [];

  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      while (this.onFulfilledCallbacks.length) {
        // 取出第一个元素 然后调用
        this.onFulfilledCallbacks.shift()(value);
      }
    }
  };
  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason)
      }
    }
  };

  then(onFulfilled, onRejected) {

    // 为了链式调用 这里直接黄创建一个MyPromise， 并在后面return出去
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        const x = onFulfilled(this.value);
        // 传入 resolvePromise 集中处理
        resolvePromise(x, resolve, reject)
      } else if (this.status === REJECTED) {
        onRejected(this.reason)
      } else if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(onFulfilled);
        this.onRejectedCallbacks.push(onRejected)
      }
    })
    return promise2;


  }
}

function resolvePromise(x, resolve, reject) {
  // 判断x是不是 MyPromise 实例对象
  if (x instanceof MyPromise) {
    // 执行x， 调用then方法 目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(resaon))
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}

module.exports = MyPromise;