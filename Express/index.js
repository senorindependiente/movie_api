//imports express framework
const express = require("express");
//sets  express’s functionality to a variable
const app = express();

let topMovies = [
{title:"One Flew Over the Cuckoo's Nest", year:"1975"},
{title:"Hable con ella",year:"2002"},
{title:"Donnie Darko",year:"2001"},
{title:"Nightcrawler",year:"2014"},
{title:"Drive",year:"2011"},
{title:"Mulholland Dr.",year:"2001"},
{title:"Parasite",year:"2019"},
{title:"The Hunt",year:"2012"},
{title:"Rear Window",year:"1954"},
{title:"The Lord of the Rings: The Return of the King",year:"2003"}
];

//GET route located ate the endpoint "/movies" which returns a json object in form of a  list of top 10 movies
app.get("/movies", (req, res) => {
  res.json(topMovies);
});

//GET request to 
app.get("/", (req, res) => {
  res.send("Welcome to my top 10 movies");
});

//listen for reqeusts 
app.listen(8080, () => {
  console.log("My app is listening on port 8080.");
});
