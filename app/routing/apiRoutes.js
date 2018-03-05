var fs = require("fs");
var path = require("path");

module.exports = function(app, path) {
	app.get("/api/friends", function(req, res) {
		fs.readFile("app/data/friends.js", "utf8", function(err, data) {
			if (err) {
				return console.log(err);
			}

			else {
				res.json(JSON.parse(data));
			}
		});
	});


	app.post("/api/friends", function(req, res) {


		var returnMatch = [];
		var postResponse = JSON.stringify(req.body);

		fs.readFile('app/data/friends.js', function (err, data) {

		    var friendFile = JSON.parse(data);

		    // difference in scores
		    var closestMatch = 0;
		    var matchScore = 999999999999999;

		    // Loop through the file to find the closest match
		    for (var i = 0; i < friendFile.length; i++) {
		    	var numDiff = 0;
		    	for (var j = 0; j < friendFile[i]['answers[]'].length; j++) {
		    		numDiff += Math.abs((parseInt(req.body['answers[]'][j]) - parseInt(friendFile[i]['answers[]'][j])));
				}

				// If the space between the current listing is the closest to the user, update the closestMatch
				if(numDiff <= matchScore) {
					matchScore = numDiff;
					closestMatch = i;
		    	}
		    }

		    // console.log("Closest match: " + friendFile[closestMatch].name);

		    returnMatch.push(friendFile[closestMatch]);

		    // Add the new person to the existing array
		    friendFile.push(JSON.parse(postResponse));

		    // Push back the entire updated result immediately
		    fs.writeFile("app/data/friends.js", JSON.stringify(friendFile));
			res.send(returnMatch[0]);

		});
	});
}
