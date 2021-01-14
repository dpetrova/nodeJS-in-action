//require asynchronous function
require('./async.js')();

/* 

To run this example and see stacktrace:
1. 
run npm install to install trace and clarify packages

2. 
by default when error is thrown, it is shown a short stack trace that doesn’t show the caller of the failed function, only the location of the thrown exception 
trace will create super long stack traces:
run: "node -r trace index.js" ( -r flag tells Node to require the trace module before loading anything else)

3.
another problem with stack traces is they can be too detailed, e.g when the trace includes too much detail about Node’s internals
use clarify to clear up your stack
run: "node -r clarify index.js"

*/