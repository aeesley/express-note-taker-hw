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

// 
app.get("/api/notes", function(req, res) {
    
    fs.readFile('db/db.json', 'utf8', function (err, data) {
          
        // Worked with tutor for this solution, we were having difficulty getting data to display the right way and had to take some extra steps
        var strData = JSON.stringify(data)
        var regularArray = JSON.parse(strData)
        var parsedOldDbData = JSON.parse(regularArray)
        res.json(parsedOldDbData)
        console.log(data);
    })    
});




app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    });