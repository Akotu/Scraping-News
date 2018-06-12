// Dependencies
var express = require("express");
var mongoose = require("mongoose");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");
var path = require("path");
var app = express();



app.engine("handlebars", exphbs({
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "/views/layouts/partials")
}));

app.set("view engine", "handlebars");

var db = mongoose.connection;


// Initialize Express


var port = process.env.PORT || 3000

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

require("./controllers/apiRoutes.js")(app);


db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
  });

  db.once("open", function() {
    console.log("Mongoose connection successful.");
  });
  

// Listen on port 3000
app.listen(port, function() {
  console.log("App running on port" + port);
});
