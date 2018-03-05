comparevar fs = require("fs");
var path = require("path");
var friends =require("../data/friends")


module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        var lowest = 999999999;
        var bestFriend;

        for (var i = 0; i < friends.length; i++) {
            var compare = [];

            for (var j = 0; j < friends[i].scores.length; j++) {
                compare.push(Math.abs(friends[i].scores[j] - req.body.scores[j]));

            }
            var numToCompare = compare.reduce((a, b) => a + b, 0);

            if (numToCompare < lowest) {
                lowest = numToCompare;
                bestFriend = friends[i];
            }
        }
        res.json(bestFriend);
        friends.push(req.body);
    });
