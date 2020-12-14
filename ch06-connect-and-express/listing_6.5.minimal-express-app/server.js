const express = require('express');
const app = express();

//respond to any web request to /
app.get('/', (req, res) => {
  res.send('Hello'); //send “Hello” as response text
});

app.listen(3000); //listen on port 3000
