function takeLast(array, total) {
  const ring = [];
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (ring.length < total) {
      ring.push(array[i])
    } else {
      ring[(count++) % total] = array[i]
    }
    console.log(ring);
  }

  for (let index = 0; index < ring.length; index++) {
    console.log(ring[(count++) % total]);

  }
  return ring
}

const ranNums = Array.from({ length: 16 }, () => Math.floor(Math.random() * 1000));
console.log(ranNums);
console.log(takeLast(ranNums, 7));