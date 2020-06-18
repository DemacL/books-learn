function test(a, b) {
  console.log(b);
  return {
    test: function (c, a) {
      return test(c, a)
    }
  }
}
// var a = test(100, 200); // 200
// console.log(a)
// a.test(300);//  
// a.test(400);// 300

test(101).test(201).test(401)// undefind 101 201