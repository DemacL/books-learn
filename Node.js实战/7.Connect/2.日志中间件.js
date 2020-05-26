const connect = require('connect');

function logger(req, res, next) {
  console.log('logger', req.method, req.url);
  next();
}

const app = connect();

app.use(logger); // 用use载入中间件


app.listen(3333)



