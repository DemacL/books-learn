const request = require("request");

const PromiseA = new Promise((resolve, reject) => {
  request.get('http://localhost:3333/1', (err, res) => {
    resolve(res.body)
  })

})

const PromiseB = new Promise((resolve, reject) => {
  request.get('http://localhost:3333/2', (err, res) => {
    resolve(res.body)
  })

})

const PromiseC = new Promise((resolve, reject) => {
  request.get('http://localhost:3333/3', (err, res) => {
    resolve(res.body)
  })

})

const PromiseRandomIndex = new Promise((resolve, reject) => {
  request.get('http://localhost:3333/random', (err, res) => {
    resolve(res.body)
  })
})


// PromiseA.then((data) => console.log(data))
// PromiseB.then((data) => console.log(data))
// PromiseC.then((data) => console.log(data))

//  按顺序同步请求
PromiseC.then((data1) => {
  console.log('3', data1)
  return PromiseB
}).then((data2) => {
  console.log('2', data2)
  return PromiseA
}).then((data3) => {
  console.log('1', data3)
})

// 第二次请求需要依赖第一次请求的结果
PromiseRandomIndex
.then((index) => {
  return new Promise((resolve, reject) => {
    request.get('http://localhost:3333/' + index, (err, res) => {
      resolve(res.body)
    })
  })
})
.then((data) => {
  console.log(data)
})