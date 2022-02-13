//imports express ( a node.js)framework with middlware module packages  body parser, uuid and morgan 
const bodyParser = require("body-parser");
const express = require("express"),
morgan = require("morgan"),
//automatically creates and assigns unique ids to new users
uuid = require("uuid");

//sets  express’s functionality to a variable
const app = express();

//invokes the middleware module body-parser.
//it allows you to read the “body” of HTTP requests within your request handlers simply by using the code req.body.
app.use(bodyParser.json())

//invokes middle ware function with "common" parameters using the default format 
app.use(morgan('common'));


let users = [


  
]



let topMovies = [
  { title: "One Flew Over the Cuckoo's Nest", year: "1975",director:"Milos Forman" },
  { title: "Hable con ella", year: "2002", director:"Pedro Almodóvar" },
  { title: "Donnie Darko", year: "2001", director:"Richard Kelly" },
  { title: "Nightcrawler", year: "2014", director:"Dan Gilroy" },
  { title: "Drive", year: "2011", director: "Nicolas Winding Refn"},
  { title: "Mulholland Dr.", year: "2001",director:"David Lynch"},
  { title: "Parasite", year: "2019",director:"Bong Joon Ho" },
  { title: "The Hunt", year: "2012",director:"Thomas Vinterberg"},
  { title: "Rear Window", year: "1954" ,director:"Alfred Hitchcock"},
  { title: "The Lord of the Rings: The Return of the King", year: "2003",director:"Peter Jackson"},
];

//GET route located ate the endpoint "/movies" which returns a json object in form of a  list of top 10 movies
app.get("/movies", (req, res) => {
  res.json(topMovies);
});

//GET request to display message in the browser upon entering "localhost:8080" in the browser
app.get("/", (req, res) => {
  res.send("Welcome to my top 10 movies");
});

//setting up server on port 8080, listen for request
app.listen(8080, () => {
  console.log("My app is listening on port 8080.");
});

//express function that automatically routes all requests for static files to their corresponding files in the "public" folder
app.use(express.static("public"));

//Morgan middleware library that logs all request 
let myLogger = (req, res, next) =>{
  console.log(req.url);
  next();
}
app.use(myLogger);

//setting the error handler in express(always put it last in line)
app.use((err,req,res,next) =>{
  console.error(err.stack);
  res.status(500).send("Error!");
})
