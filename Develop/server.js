// SETTING UP REQUIRES AND THE LOCAL HOST PORT
const express = require("express");
const path = require("path");
const app = express();
const PORT = 8080;
const fs = require('fs')

// SETTING UP EXPRESS TO HANDLE DATA
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

// PATHS
app.get("/", function(req, res) {
    console.log('we smack the route!!')
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
    });