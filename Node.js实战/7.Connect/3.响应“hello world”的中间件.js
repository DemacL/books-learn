const connect = require('connect');

function logger(req, res, next) {
  console.log('logger', req.method, req.url);

  next();
}

// function logger2(req, res, next) {
//   console.log('logger2', req.method, req.url);
//   next();
// }

function restrict(req, res, next) {
  // if (req.url.startsWith('/li')) {

  const ran = Math.random();
  console.log(ran);
  if (ran < 0.5) {
    res.write('no pass' + ran)
    res.end();
  }
  else {
    next();
  }
  // } else {
  //   res.write('no auth')
  //   res.end();
  // }
}

function admin(req, res, next) {
  if (req.url === '/li/admin') {
    res.write('admin')
    res.end();
  } else {
    next();
  }
}

function hello(req, res, next) {
  console.log('hello', req.method, req.url);
  res.write('hello node')
  res.end();
}

const app = connect();

// app.use(logger); // 用use载入中间件
// app.use(hello); //  载入hello中间件

app.use(logger).use('/li', restrict).use(admin).use(hello); //  支持链式调用载入中间件

app.listen(3333)



