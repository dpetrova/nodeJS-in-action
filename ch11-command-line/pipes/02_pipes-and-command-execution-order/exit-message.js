/*  a little script that logs a message when a process is exiting over stderr */

//when you pipe commands, each command starts immediately; the commands don’t wait for each other in any way
//this means piping data won’t wait for any command to exit, and you can’t know how the previous command exited
//using && executes the next command if the previous exit code is zero,
//and || executes the next command if the exit code is a nonzero number

//all you need to do is listen for the process exit event, and then write the arguments to stderr
process.stdin.pipe(process.stdout);
process.on('exit', () => {
  const args = process.argv.slice(2);
  console.error(args.join(' '));
});

//using &&, you can call exit-message.js if the JSON parsed successfully: parse-json -f test.json && node exit-message.js "parsed JSON successfully"
