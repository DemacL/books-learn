const http = require('http');
const fs = require('fs')
const url = require('url')
const path = require('path')

http.createServer((req, res) => {


  const absPath = path.join(__dirname, url.parse(req.url).pathname);



  if(req.headers['Content-Type'])

  // req.pipe(fs.createWriteStream('./req-body.txt'))

  // res.setHeader('Content-Type','text/plain')
  // fs.readFile(absPath, (err, data) => {
  //   res.end(data) 
  // })


  // fs.exists((absPath), exists => {
  //   if (exists) {
      // const stream = fs.createReadStream(absPath);
      // // stream.pipe(res)

      // stream.on('data', chunk => {
      //   res.write(chunk)
      // })

      // stream.on('end', () => {
      //   res.end();
      // })

      // stream.on('error', msg=>{
      //   res.statusCode = 500;
      //   console.log(msg);
      //   res.write('Internal Server Error');
      //   res.end();
      // })
    // } else {
    //   res.statusCode = 404;
    //   res.write('Not Found');
    //   res.end()
    // }
  // })




  // res.end(); 
}).listen(3333, () => {
  console.log('serve running at http://localhost:3333/')
})



