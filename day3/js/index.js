import { Observer } from './Observer.js'
const obj = {
  a: {
    aa: 1
  },
  b: 2
}

// 将 obj 整体 reactive
new Observer(obj);
obj.b = 2;
// set b - 2 - 3 - newVal is Basic Value
obj.b = 3;
// set b - 3 - [object Object] - newVal is Object
obj.b = {
  bb: 4
}
// get b-[object Object]
obj.b;
// get a-[object Object]
obj.a;
// get aa-1
obj.a.aa
// set aa - 1 - 3 - newVal is Basic Value
obj.a.aa = 3