// SETTING UP REQUIRES AND THE LOCAL HOST PORT
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 1600;
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

// getting the data from the note inputs and turning it into workable data
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
        req.body.id = parsedOldDbData.length + 1
        var newDb = parsedOldDbData.concat(req.body)

        // replacing the db.json file with our new array updated from inputs
        fs.writeFile('db/db.json', JSON.stringify(newDb), function (err) {
            console.log(err);
            res.json(newDb)
        });
    });
});

//DELETING CAPABILITY
app.delete('/api/notes/:id', (req, res) => {

    updatedArray = [];

    fs.readFile('db/db.json', (err, data) => {
        if (err) throw err;
        let deleteNoteId = req.params.id;
        let json = JSON.parse(data);

        json.forEach((item, i) => {
            if (item.id === deleteNoteId) {
                json.splice(i, 1);
            } else if (item.id != deleteNoteId) {
                updatedArray.push("");

            }
        });

        fs.writeFile('db/db.son', JSON.stringify(json, null, 2), (err) => {
            if (err) throw err;
            res.json(updatedArray);
        });
    });
})

// // ADDING THE DELETING FUNCTIONALITY ATTEMPT 2

// app.delete('/api/notes/:id', function(req, res) {
//     console.log('this is our id@@@', req.params)

//     // creating empty array to save the notes we do NOT want to delete back to
//     saveNotesArray = [];

//     // looping through existing array to find the id match for the note we want to delete so we can delete it. For any notes not selected to delete, they will save back to the empty array
//     for (let index = 0; index < parsedOldDbData.length; index++) {
//         if(id === req.params.id){
//             //then delete
//         } else if (id != req.params.id) {
//             //push all other notes to new array
//         }

        
//     };


//     // The will need to replace that new updated array with deleted items to the db.json file again like we did above

// });

// Getting local host port to work
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    });