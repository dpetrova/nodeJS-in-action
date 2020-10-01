const http = require("http");
const fs = require("fs");

http
  //creates HTTP server and uses callback to define response logic
  .createServer((req, res) => {
    if (req.url == "/") {
      //reads JSON file and uses callback to define what to do with its contents
      fs.readFile("./titles.json", (err, data) => {
        //if error occurs, logs error and returns “Server Error” to client
        if (err) {
          console.error(err);
          res.end("Server Error");
        } else {
          const titles = JSON.parse(data.toString()); //parses data from JSON text
          //reads HTML template and uses callback when it’s loaded
          fs.readFile("./template.html", (err, data) => {
            if (err) {
              console.error(err);
              res.end("Server Error");
            } else {
              const tmpl = data.toString();
              const html = tmpl.replace("%", titles.join("</li><li>")); //assembles HTML page showing blog titles
              res.writeHead(200, { "Content-Type": "text/html" });
              res.end(html); //sends HTML page to user
            }
          });
        }
      });
    }
  })
  .listen(8000, "127.0.0.1");

//Most Node built-in modules use callbacks with two arguments:
//the first argument is for an error, should one occur, and the second argument is for the results
