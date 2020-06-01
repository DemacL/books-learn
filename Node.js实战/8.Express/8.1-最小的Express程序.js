const express = require('express')

const app = express();

app.get('/', function (req, res) { // 响应对 /的请求
  res.send('hello node node')
})

app.listen(3333, () => {
  console.log('serve running at http://localhost:3333/')
})

