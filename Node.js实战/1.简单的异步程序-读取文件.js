const fs = require('fs');

fs.readFile('./resource.json', (err, data) => {
  if (err) {
    console.log(err);
    return
  }

  const res = data.toString()
  console.log(typeof res, res, res.length);
  const arr = JSON.parse(res);
  console.log(typeof arr, arr, arr.length);
})