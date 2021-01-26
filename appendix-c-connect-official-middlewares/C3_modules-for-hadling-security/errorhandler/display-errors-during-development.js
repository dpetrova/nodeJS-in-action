/* Using errorhandler for displaying errors during development */

const connect = require('connect');
const errorhandler = require('errorhandler')

connect()
 .use((req, res, next) => {
   setTimeout(function () {
      next(new Error('something broke!'));
   }, 500);
 })
 .use(errorhandler());