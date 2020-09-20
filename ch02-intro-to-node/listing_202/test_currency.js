// const currency = require('./currency');
// console.log("50 Canadian dollars equals this amount of US dollars:");
// console.log(currency.canadianToUS(50));
// console.log("30 US dollars equals this amount of Canadian dollars:");
// console.log(currency.USToCanadian(30));

//using destructuring
const { canadianToUS, USToCanadian } = require("./currency");
console.log("50 Canadian dollars equals this amount of US dollars:");
console.log(canadianToUS(50));
console.log("30 US dollars equals this amount of Canadian dollars:");
console.log(USToCanadian(30));
