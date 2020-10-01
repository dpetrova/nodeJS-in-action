//A convention you can use when creating event emitters
//is to emit an error type event instead of directly throwing an error.

const events = require("events");
const myEmitter = new events.EventEmitter();

myEmitter.on("error", (err) => {
  console.log(`ERROR: ${err.message}`);
});

myEmitter.emit("error", new Error("Something is wrong."));

//If no listener for this event type is defined when the error event type is emitted,
//the event emitter will output a stack trace and halt execution.
//The stack trace indicates an error of the type specified by the emit call’s second argument.
//This behavior is unique to error type events;
//when other event types are emitted, and they have no listeners, nothing happens.

//If an error type event is emitted without an error object supplied as the second argument,
//a stack trace will indicate an Uncaught, unspecified 'error' event error, and your application will halt.
