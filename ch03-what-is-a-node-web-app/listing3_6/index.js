const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Article = require("./db").Article;
const read = require("node-readability");

app.set("port", process.env.PORT || 3000);

//app.use ->  load the middlewares required by the project
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//to be able to serve static files (JS, images, and CSS) back to the browser, Express has some built-in middleware called express.static
//to use it, point at a directory that contains static files, and those files will then be available to the browser
app.use(
  "/css/bootstrap.css",
  express.static("node_modules/bootstrap/dist/css/bootstrap.css")
);

app.get("/articles", (req, res, next) => {
  Article.all((err, articles) => {
    if (err) return next(err);

    //make the router handlers respond with both JSON and HTML when necessary
    //res.format method, provided by Express allows app to respond with the right format based on the request
    res.format({
      html: () => {
        res.render("articles.ejs", { articles }); //render the articles.ejs template in the views folder
      },
      json: () => {
        res.send(articles);
      },
    });
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
  const url = req.body.url;

  read(url, (err, result) => {
    if (err || !result) res.status(500).send("Error downloading article");
    Article.create(
      { title: result.title, content: result.content },
      (err, article) => {
        if (err) return next(err);
        console.log(article);
        res.send("OK");
      }
    );
  });
});

app.listen(app.get("port"), () => {
  console.log("App started on port", app.get("port"));
});

module.exports = app;
