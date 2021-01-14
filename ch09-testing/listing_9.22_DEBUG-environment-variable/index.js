/*  Create separate loggers for models, views, and controllers in MVC web app */

const debugViews = require('debug')('debug-example:views');
const debugModels = require('debug')('debug-example:models');
const debugControllers = require('debug')('debug-example:controllers');

debugViews('Example view message');
debugModels('Example model message');
debugControllers('Example controller message');


//To run this example and see the view logs:
//1. run npm install to install debug package
//2. set DEBUG to debug-example:views: "DEBUG=debug-example:views node index.js"
