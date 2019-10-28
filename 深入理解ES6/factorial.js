// n!
function factorial(n) {
    if (n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1)
    }
}

// console.log(factorial(11111115)); //  Maximum call stack size exceeded

//  尾调用优化
function factorial1(n, p = 1) {
    if (n === 1) {
        return 1 * p;
    } else {
        let result = n * p;
        return factorial1(n - 1, result)
    }
}

// console.log(factorial1(11111115)); //  Maximum call stack size exceeded


function factorial2(n) {
    let res = 1;
    for (let i = 1; i <= n; i++) {
        res *= i;
    }
    return res;
}

console.log(factorial2(11111115));  
