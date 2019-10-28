// var funs = [];
// for (var i = 0; i < 10; i++) {
//     (function (k) {
//         funs.push(function () {
//             console.log(k)
//         })
//     })(i)

// }

// funs.forEach(fun => fun())

// IIFEs 立即调用函数表达式
var funs = [];
for (var i = 0; i < 10; i++) {
    funs.push(function (i) {
        return function () {
            console.log(i)
        }
    }(i))
}

funs.forEach(fun => fun())