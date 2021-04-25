const MyPromise = require('./MyPromise');
const promise = new MyPromise((resolve, reject) => {
  // resolve('success');
  // reject("err")
  resolve('success')
});

function other() {
  return new MyPromise((resolve, reject) => {
    resolve('other')
  })
}

promise.then(value => {
  console.log(1);
  console.log('resolve', value);
  return other()
}).then(value => {
  console.log(2);
  console.log('resovle', value);
})