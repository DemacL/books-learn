//  arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
function fff(array) {
  const res = [];
  for (let i = 0; i < array.length; i++) {

    if (array[i] instanceof Array) {
      res.push(...fff(array[i]))
    } else {
      res.push(array[i])
    }
  }
  return res
}