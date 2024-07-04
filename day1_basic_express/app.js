const express = require("express");

const app = express();

app.use(express.static("public"));

// ...
// our first Route:
app.get("/", (request, response, next) =>
  response.sendFile(__dirname + "/views/index.html")
);

app.get("/home", (request, response, next) =>
  response.sendFile(__dirname + "/views/home.html")
);

// cat route:
app.get("/cat", (request, response, next) =>
  response.sendFile(__dirname + "/views/cat.html")
);

app.get("/search", (req, res) => {
  console.log(req.query);
  /* 
  if (req.query.city === "Lisbon") {
    res.send("Good choice!");
  } else {
    res.send("Still good choice but not Lisbon");
  } */
  res.send(req.query);
});

app.get("/users/:user", (req, res) => {
  console.log(req.params.user);
  res.send(req.params.user);
});

app.get("/users/:user/books/:bookId", (req, res) => {
  console.log(req.params.user);
  res.send(req.params);
});
// ...

app.listen(3000, () => console.log("My first app listening on port 3000! "));
