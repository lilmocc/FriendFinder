var path = require("path");

module.exports = function(app) {
    app.get("/questions", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/survey.html"));
    });

    app.use(function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/home.html"));
    });
};
