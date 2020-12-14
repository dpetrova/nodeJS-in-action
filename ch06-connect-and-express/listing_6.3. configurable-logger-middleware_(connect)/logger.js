//setup function can be called multiple times with different configurations
function setup(format) {
  const regexp = /:(\w+)/g;

  //logger component uses a regexp to match request properties
  return function createLogger(req, res, next) {    
    //uses regexp to format log entry for request
    const str = format.replace(regexp, (match, property) => {
      return req[property];
    });
    
    console.log(str); //print request log entry to console    
    next(); //pass control to next middleware component
  }
}

//directly export logger setup function
module.exports = setup;
