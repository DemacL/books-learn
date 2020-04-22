

function printPush() {
  console.log(this.push);
}

function printToFixed() {
  console.log(this.toFixed);
}


function f2(arg1) {
  console.log(this.name, arg1);
}
name = 'globle__name';

function f1() {
  // console.log(this);
  console.log(this.name);
}

// f1();

// f1.call({name:'test'})

// 1.context为可选参数，如果不传的话默认上下文为 window

// 1.1 如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动替换为指向全局对象
// f1.call()

// 1.2原始值会被包装。
// printToFixed.call(2);

// f2.call({name:'test'},'test_arg')

// printPush.call([]);

Function.prototype.mycall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error!') // 函数对象才能调用call
  }
  context = context || window;

  context.fn = this; // 将当前函数作为context上下文对象即新this中的一个属性上

  const args = [...arguments].slice(1); // 获取参数

  // return context.fn(...(args || []));
  //  用当前的上下文作为this调用该函数，用的是object调用method的this指向原则

  const  result = context.fn(args); // 保存函数使用新的上下文this后的返回结果
  delete context.fn // 删除临时附着的函数属性
  return result;
}


function TestF1(...args) {
  console.log(this.name, args);
}
TestF1.mycall({ name: '12' })
TestF1.mycall({ name: '13' }, 1, 2, 3, 4, 5)


TestF1.mycall({ name: 'aaa' }, 1, 5)