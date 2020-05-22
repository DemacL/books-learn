//  未导出 不能被导入，本文件/模块有效
const canadianDollar = 0.91;

function roundTwoDecimals(amount) {
  return Math.round(amount * 100) / 100;
}
//  作为exports的属性导出
exports.canadianToUS = function (canadian) {
  return roundTwoDecimals(canadian * canadianDollar);
}

exports.USToCanadian = function (us) {
  return roundTwoDecimals(us / canadianDollar);
}