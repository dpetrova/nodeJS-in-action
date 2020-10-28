const express = require("express");
const app = express();
const articles = [{ title: "Example" }];
//body parser knows how to accept POST request bodies and turn them into data you can use in your code
const bodyParser = require("body-parser");

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json()); //Supports request bodies encoded as JSON
app.use(bodyParser.urlencoded({ extended: true })); //Supports form encoded bodies

app.get("/articles", (req, res) => {
  res.send(articles);
});

app.post("/articles", (req, res) => {
  const article = { title: req.body.title };
  articles.push(article);
  res.send(article);
});

app.get("/articles/:id", (req, res) => {
  const id = req.params.id;
  console.log("Fetching:", id);
  res.send(articles[id]);
});

app.delete("/articles/:id", (req, res) => {
  const id = req.params.id;
  console.log("Deleting:", id);
  delete articles[id];
  res.send({ message: "Deleted" });
});

app.listen(app.get("port"), () => {
  console.log("App started on port", app.get("port"));
});

module.exports = app;
