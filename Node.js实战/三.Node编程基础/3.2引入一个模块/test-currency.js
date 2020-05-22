//  require函数会返回这个模块中定义的exports对象中的内容
const currency = require('../3.1exports属性定义一个Node模块/currency')

console.log(currency.USToCanadian(100));

console.log(currency.canadianToUS(100));