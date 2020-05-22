//  未导出 不能被导入，本文件/模块有效
const Currency = function(canadianDollar){
  this.canadianDollar = canadianDollar;
}

Currency.prototype.roundTwoDecimals = function(amount) {
  return Math.round(amount * 100) / 100;
}
 
Currency.prototype.canadianToUS = function (canadian) {
  return this.roundTwoDecimals(canadian * this.canadianDollar);
}

Currency.prototype.USToCanadian = function (us) {
  return this.roundTwoDecimals(us / this.canadianDollar);
}

// exports = Currency  // 不允许重写exports 中能往exports上挂载属性导出

// exports.Currency = Currency; // 这样用属性把构造函数挂载导出也可以  但是导入使用的时候不够简洁

// 用module.exports可以对外提供单个变量、函数或者对象
module.exports = Currency;