
const Currency = require('./currency')

console.log(Currency);

const canadianDollar = 0.91;

const currency = new Currency(canadianDollar);

console.log(currency.USToCanadian(100));

console.log(currency.canadianToUS(100));