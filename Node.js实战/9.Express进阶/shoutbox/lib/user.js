const redis = require('redis');
const bcrypt = require('bcrypt');
const lodash = require('lodash');

const db = redis.createClient(); // 创建到Redis的长连接


module.exports = User; // 从这个模块中输出User函数

function User(obj) { // 遍历传入对象中的键
  for (const key in obj) {
    this[key] = obj[key]; // 合并值
  }
}

User.prototype.save = function (fn) {
  if (this.id) {
    this.update(fn); // 用户已存在
  } else {
    const user = this;
    db.incr('user:ids', function (err, id) { // 从id生成器中获取一个自增数作为id
      if (err) return fn(err);
      user.id = id; // 设定ID，以便保存
      user.hashPassword(function (err) {
        if (err) return fn(err);
        user.update(fn);
      });
    });
  }
};

User.prototype.update = function (fn) {
  const user = this;
  const id = user.id;
  db.set('user:id:' + user.name, id, function (err) {
    if (err) return fn(err);
    // db.hmset('user:' + id, user, function(err) {

    db.hmset('user:' + id, lodash.pick(user, ['pass', 'age', 'name', 'id', 'salt']), function (err) {
      fn(err);
    });
  });
};

User.prototype.hashPassword = function (fn) {
  const user = this;
  bcrypt.genSalt(12, function (err, salt) {
    if (err) return fn(err);
    user.salt = salt;
    bcrypt.hash(user.pass, salt, function (err, hash) {
      if (err) return fn(err);
      user.pass = hash;
      fn();
    })
  });
};

User.getByName = function (name, fn) {
  User.getId(name, function (err, id) {
    console.log('getByName', err, id);
    if (err) return fn(err);
    User.get(id, fn);
  });
};

User.getId = function (name, fn) {
  db.get('user:id:' + name, fn);
};

User.get = function (id, fn) {
  db.hgetall('user:' + id, function (err, user) {
    console.log('get', id, err, user);
    if (err) return fn(err);
    fn(null, new User(user));
  });
};

User.authenticate = function (name, pass, fn) {
  User.getByName(name, function (err, user) {
    console.log('authenticate', err, user);
    if (err) return fn(err);
    if (!user.id) return fn('没有找到该用户');
    bcrypt.hash(pass, user.salt, function (err, hash) {
      if (err) return fn(err);
      if (hash == user.pass) return fn(null, user);
      fn('用户密码不正确');
    });
  });
};

User.prototype.toJSON = function () {
  return {
    id: this.id,
    name: this.name
  }
};

// 测试新增用户
// const tobi = new User({
//   name: 'jack ',
//   pass: '123456',
//   age: '35'
// });

// tobi.save(function (err) {
//   if (err) throw err;
//   console.log('user id %d', tobi.id);
// });

//  测试根据用户名密码验证
User.authenticate('jack1 ', '123456', (err, user) => console.log(err, user))