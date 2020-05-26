const connect = require('connect');

//  要输出的字段
function logger(options) {
  console.log('init logger middleware');

  return function logger(req, res, next) {

    options.forEach(element => {
      console.log(element, req[element]);
    });
    next()
  }
}



 

function hello(req, res, next) {
  console.log('hello', req.method, req.url);
  res.write('hello node')
  res.end();
}

const app = connect();

 

app.use(logger(['url', 'method', 'hostname', 'ip', 'originalUrl'])).use(hello); //  支持链式调用载入中间件

app.listen(3333)



