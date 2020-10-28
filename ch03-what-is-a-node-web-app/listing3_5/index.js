const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Article = require("./db").Article;
//module provides an asynchronous function that downloads a URL and turns the HTML into a simplified representation
const read = require("node-readability");

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/articles", (req, res, next) => {
  Article.all((err, articles) => {
    if (err) return next(err);
    res.send(articles);
  });
});

app.get("/articles/:id", (req, res, next) => {
  const id = req.params.id;
  Article.find(id, (err, article) => {
    if (err) return next(err);
    res.send(article);
  });
});

app.delete("/articles/:id", (req, res, next) => {
  const id = req.params.id;
  Article.delete(id, (err) => {
    if (err) return next(err);
    res.send({ message: "Deleted" });
  });
});

app.post("/articles", (req, res, next) => {
  const url = req.body.url; //gets the URL from the POST body

  //Use the readability module to fetch the URL
  read(url, (err, result) => {
    if (err || !result) res.status(500).send("Error downloading article");
    //save article to the database
    Article.create(
      { title: result.title, content: result.content },
      (err, article) => {
        if (err) return next(err);
        console.log(article);
        res.send("OK"); //after saving the article, sends back a 200
      }
    );
  });
});

app.listen(app.get("port"), () => {
  console.log("App started on port", app.get("port"));
});

module.exports = app;
