const express = require("express");
const bodyParser = require("body-parser"); //body parser knows how to accept POST request bodies and turn them into data you can use in your code
const app = express();
const Article = require("./db").Article; //Loads the database module
const read = require("node-readability"); //Downloads a URL and turns the HTML into a simplified representation

app.set("port", process.env.PORT || 3000);

//app.use ->  load the middlewares required by the project
app.use(bodyParser.json()); //Supports request bodies encoded as JSON
app.use(bodyParser.urlencoded({ extended: true })); //Supports form encoded bodies
//to be able to serve static files (JS, images, and CSS) back to the browser, Express has some built-in middleware called express.static
//to use it, point at a directory that contains static files, and those files will then be available to the browser
app.use(
  "/css/bootstrap.css",
  express.static("node_modules/bootstrap/dist/css/bootstrap.css")
);

//Fetches all articles
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

//Gets a specific article by ID
app.get("/articles/:id", (req, res, next) => {
  const id = req.params.id;
  Article.find(id, (err, article) => {
    if (err) return next(err);
    res.format({
      html: () => {
        res.render("article.ejs", { article });
      },
      json: () => {
        res.send(article);
      },
    });
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

//Creates a new article
app.post("/articles", (req, res, next) => {
  //gets the URL from the POST body
  const url = req.body.url;
  //use the readability module to fetch the URL
  read(url, (err, result) => {
    if (err || !result) res.status(500).send("Error downloading article");
    //save article to the database
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
