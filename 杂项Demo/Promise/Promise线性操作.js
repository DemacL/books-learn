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


PromiseA.then((data) => console.log(data))
PromiseB.then((data) => console.log(data))
PromiseC.then((data) => console.log(data))


// Promise.resolve((resolve, reject) => {
//   PromiseA.then((data1) => {
//     console.log('A 1', data1)
//     resolve(PromiseB())
//   })
// }).then((data2) => {
//   console.log('B 2', data2)
//   resolve(PromiseC())
// }).then((data3) => {
//   console.log('C 2', data3)

// })

PromiseC.then((data1) => {
  console.log('3', data1)
  return PromiseB
}).then((data2) => {
  console.log('2', data2)
  return PromiseA
}).then((data3) => {
  console.log('1', data3)
})

// PromiseA.then((data) => {
//   console.log('A 1', data)
//     PromiseB()
// }).then((data) => {
//   console.log('B 2', data)
//     PromiseC()
// }).then((data) => {
//   console.log('C 3', data)
// })