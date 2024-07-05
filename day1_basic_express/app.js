//import express from express
const express = require("express");

//Here we create a variable called app that will contain the express tools we need to create a server
const app = express();

//We need to tell express where to find our static files, in most cases it'll be the public folder
app.use(express.static("public"));

//By using app.get we create a route that listens to GET requests, in this case on the default/index page "/"
app.get("/", (req, res, next) => res.sendFile(__dirname + "/views/index.html"));
// cat route:
app.get("/cat", (req, res, next) =>
  res.sendFile(__dirname + "/views/cat.html")
);

//With app.listen we make our server keep running and listening to requests on port 3000
app.listen(3000, () => console.log("My first app listening on port 3000! "));
