//import express from express
const express = require("express");

//Here we create a variable called app that will contain the express tools we need to create a server
const app = express();

//We need to tell express where to find our static files, in most cases it'll be the public folder
app.use(express.static("public"));

//By using app.get we create a route that listens to GET requests, in this case on the default/index page "/"
app.get("/", (req, res, next) => {
  console.log(req.query);
  res.sendFile(__dirname + "/views/index.html");
});

//const user1 = "Andre"
app.get("/profile/:username", (req, res, next) => {
  console.log(req.params);
  res.send("Hello");
});

app.get("/profile/:username/books/:bookId", (req, res, next) => {
  console.log(req.params); // {username: LuciaDuarte, bookId: i1y23h1b3k}

  const { username, bookId } = req.params;

  res.send(`Hello ${username}, you like the book ${bookId}`);
});

app.get("/search", (req, res, next) => {
  const { city, start } = req.query;

  //Your search for "city" starting on "date"
  res.send(`Your search for ${city} starting on ${start}`);
});

// cat route:
app.get("/cat", (req, res, next) =>
  res.sendFile(__dirname + "/views/cat.html")
);

//www.myWebsite.com/?city=Lisbon&month=July&year=2024

//With app.listen we make our server keep running and listening to requests on port 3000
app.listen(3000, () => console.log("My first app listening on port 3000! "));

/* https://www.airbnb.com/?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&search_mode=flex_destinations_search&flexible_trip_lengths%5B%5D=one_week&monthly_start_date=2024-08-01&monthly_length=3&monthly_end_date=2024-11-01&category_tag=Tag%3A8851&price_filter_input_type=0&channel=EXPLORE&date_picker_type=calendar&checkin=2024-07-06&checkout=2024-08-03&adults=1&source=structured_search_input_header&search_type=filter_change&drawer_open=false */
