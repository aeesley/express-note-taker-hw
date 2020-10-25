// SETTING UP REQUIRES AND THE LOCAL HOST PORT
const express = require("express");
const path = require("path");
const app = express();
const PORT = 1600;
const fs = require('fs')

// SETTING UP EXPRESS TO HANDLE DATA
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

// PATHS
// When the user hits the main path they will get the index.html page
app.get("/", function(req, res) {
    console.log('we smack the route!!')
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
// WHen the user hits the /notes path they will get the notes.html page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// getting the data from the note inputs
app.get("/api/notes", function(req, res) {
    
    fs.readFile('db/db.json', 'utf8', function (err, data) {
          
        // Worked with tutor for this solution, we were having difficulty getting data to display the right way and had to take some extra steps
        var strData = JSON.stringify(data)
        var regularArray = JSON.parse(strData)
        var parsedOldDbData = JSON.parse(regularArray)
        res.json(parsedOldDbData)
    })    
});

// posting data saved from the note input and assigning it an id that we can use to call the specific note so that we can add deleting functionality later
app.post("/api/notes", function(req, res) {
    console.log("hit the post route input from form!!!", req.body);

    fs.readFile('db/db.json', 'utf8', function (err, data) {
        
        // adding new note to our array
        var strData = JSON.stringify(data)
        var regularArray = JSON.parse(strData)
        var parsedOldDbData = JSON.parse(regularArray)

        // adding id to each note that is created
        console.log('Add new note to this array!!', parsedOldDbData)
        req.body.id = parsedOldDbData.length + 1
        var newDb = parsedOldDbData.concat(req.body)
        console.log('new DB!!! time to update db.json file wiht this array!!!', newDb)

        // replacing the db.json file with our new array updated from inputs
        fs.writeFile('db/db.json', JSON.stringify(newDb), function (err) {
            console.log(err);
            res.json(newDb)
        });
    });
});


// Getting local host port to work
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    });