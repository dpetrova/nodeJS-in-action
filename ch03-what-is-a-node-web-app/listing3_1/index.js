const express = require("express");
const app = express();
const articles = [{ title: "Example" }];

const port = process.env.PORT || 3000;

//home page
app.get("/", (req, res) => {
  res.send("Hello World");
});

//Gets all articles
app.get("/articles", (req, res) => {
  res.send(articles);
});

//Creates an article
app.post("/articles", (req, res) => {
  res.send("OK");
});

//Gets a single article
app.get("/articles/:id", (req, res) => {
  const id = req.params.id;
  console.log("Fetching:", id);
  res.send(articles[id]);
});

//Deletes an article
app.delete("/articles/:id", (req, res) => {
  const id = req.params.id;
  console.log("Deleting:", id);
  delete articles[id];
  res.send({ message: "Deleted" });
});

app.listen(port, () =>
  console.log(`Express web app available at localhost: ${port}`)
);

module.exports = app;
