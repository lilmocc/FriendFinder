var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");

var app = express();

var PORT = process.env.PORT || 8080; // heroku port

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
