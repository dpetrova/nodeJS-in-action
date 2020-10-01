const Currency = require("./currency");
const canadianDollar = 0.91;
const currency = new Currency(canadianDollar);
console.log(currency.canadianToUS(50));

//Node will follow certain rules, to search for this module:
//1. Start looking in the same directory as the program file
//2. Is the module a core module?
//3. Is module in node_modules directory in the current directory?
//4. Attempt to move to parent directory.
//repeat
//5.No more parent directory -> Does module exist in a directory specified by the NODE_PATH environment variable?

//If a module is a directory,
//the file in the module directory that will be evaluated must be named index.js,
//unless specified otherwise by a file in the module directory named package.json
//To specify an alternative to index.js, the package.json file must contain JSON data defining
//an object with a key named "main" that specifies the path, within the module directory:
// {
//    "main": "currency.js"
// }
