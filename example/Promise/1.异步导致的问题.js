const request = require("request");

let res = '';

request.get('http://localhost:3333/3', (err, response) => {
  res = response.body // 这里的代码是异步的，导致下面输出的时候还没有赋值上数据
  console.log('res', res)
})

 
console.log('res', res)
// setTimeout(() => {
//   console.log('res', res)
// }, 6000);