/* a short script that displays how long it takes a program to run, without interrupting piping */

//a program can monitor a pipe without interrupting it by waiting for stdin to close and then piping the results to stdout
process.stdin.pipe(process.stdout);
const start = Date.now();
process.on('exit', () => {
  const timeTaken = Date.now() - start;
  console.error(`Time (s): ${timeTaken / 1000}`);
});


//both parse-json and time.js can easily be used together with pipes
//e.g. this shows how long it takes to parse JSON and send the data: parse-json -f test.json | node time.js