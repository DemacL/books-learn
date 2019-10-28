ts = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100))
function qs(arr) {
    if (arr.length < 2) {
        return arr;
    } else {
        let item = arr[0];
        let left = [];
        let right = [];
        for (let i = 1; i < arr.length; i++) {
            const num = arr[i];
            if (num > item) {
                right.push(num);
            } else {
                left.push(num);
            }
        }
        return [...qs(left), item, ...qs(right)]
    }

}

console.log(ts);
console.log(qs(ts));