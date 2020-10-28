const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Article = require("./db").Article; //Loads the database module

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Fetches all articles
app.get("/articles", (req, res, next) => {
  Article.all((err, articles) => {
    if (err) return next(err);
    res.send(articles);
  });
});

//Finds a specific article by ID
app.get("/articles/:id", (req, res, next) => {
  const id = req.params.id;
  Article.find(id, (err, article) => {
    if (err) return next(err);
    res.send(article);
  });
});

//Deletes an article by ID
app.delete("/articles/:id", (req, res, next) => {
  const id = req.params.id;
  Article.delete(id, (err) => {
    if (err) return next(err);
    res.send({ message: "Deleted" });
  });
});

app.listen(app.get("port"), () => {
  console.log("App started on port", app.get("port"));
});

module.exports = app;
