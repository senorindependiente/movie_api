//imports express ( a node.js)framework with middlware module packages  body parser, uuid and morgan
const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  //automatically creates and assigns unique ids to new users
  uuid = require("uuid");

//sets  express’s functionality to a variable
const app = express();

//invokes the middleware module body-parser.
//it allows you to read the “body” of HTTP requests within your request handlers simply by using the code req.body.
app.use(bodyParser.json());

//invokes middle ware function with "common" parameters using the default format
app.use(morgan("common"));

let users = [

{
  id: 1,
name:"Christian Pingel",
favoriteMovies:[]

},

{
 id: 2,
name:"Hans Zimmerman",
favoriteMovies:[]
},

{
  id: 3,
name:"Sabine Musterman",
favoriteMovies:["Donnie Darko"]
}

];

let topMovies = [
  {
    Title: "One Flew Over the Cuckoo's Nest",
    Description: "",
    Genre: {
      Name: "Drama",
      Description:
        "The drama genre features stories with high stakes and a lot of conflicts. They’re plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters.",
    },
    Director: {
      Name: "Milos Forman",
      Bio: "Milos Forman was born Jan Tomas Forman in Caslav, Czechoslovakia, to Anna (Svabova), who ran a summer hotel, and Rudolf Forman, a professor. During World War II, his parents were taken away by the Nazis, after being accused of participating in the underground resistance. His father died in Buchenwald and his mother died in Auschwitz, and Milos became an orphan very early on. He studied screen-writing at the Prague Film Academy (F.A.M.U.). In his Czechoslovakian films, Der schwarze Peter (1964), Die Liebe einer Blondine (1965), and Der Feuerwehrball (1967), he created his own style of comedy. During the invasion of his country by the troops of the Warsaw pact in the summer of 1968 to stop the Prague spring, he left Europe for the United States. In spite of difficulties, he filmed Taking Off (1971) there and achieved his fame later with Einer flog über das Kuckucksnest (1975) adapted from the novel of Ken Kesey, which won five Oscars including one for direction. Other important films of Milos Forman were the musical Hair (1979) and his biography of Wolfgang Amadeus Mozart, Amadeus (1984), which won eight Oscars.",
      Birth: "1932",
    },
    imgURL: "",
    featured: false,
  },

  {
    Title: "Talk to her",
    Description:
      "After a chance encounter at a theater, two men, Benigno and Marco, meet at a private clinic where Benigno works. Lydia, Marco's girlfriend and a bullfighter by profession, has been gored and is in a coma. It so happens that Benigno is looking after another woman in a coma, Alicia, a young ballet student. The lives of the four characters will flow in all directions, past, present and future, dragging all of them towards an unsuspected destiny.",
    Genre: {
      Name: "Drama",
      Description:
        "The drama genre features stories with high stakes and a lot of conflicts. They’re plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters.",
    },
    Director: {
      Name: "Pedro Almodovar",
      Bio: "The most internationally acclaimed Spanish filmmaker since Luis Buñuel was born in a small town (Calzada de Calatrava) in the impoverished Spanish region of La Mancha. He arrived in Madrid in 1968, and survived by selling used items in the flea-market called El Rastro. Almodóvar couldn't study filmmaking because he didn't have the money to afford it. Besides, the filmmaking schools were closed in early 70s by Franco's government. Instead, he found a job in the Spanish phone company and saved his salary to buy a Super 8 camera. From 1972 to 1978, he devoted himself to make short films with the help of of his friends. The 'premieres' of those early films were famous in the rapidly growing world of the Spanish counter-culture. In few years, Almodóvar became a star of 'La Movida', the pop cultural movement of late 70s Madrid. His first feature film, Pepi, Luci, Bom und der Rest der Bande (1980), was made in 16 mm and blown-up to 35 mm for public release. In 1987, he and his brother Agustín Almodóvar established their own production company: El Deseo, S. A. The 'Almodóvar phenomenon' has reached all over the world, making his films very popular in many countries.",
      Birth: "1949",
    },
    imgURL: "",
    featured: false,
  },

  {
    Title: "Donnie Darko",
    Description:
      "Donnie Darko doesn't get along too well with his family, his teachers, and his classmates; but he does manage to find a sympathetic friend in Gretchen, who agrees to date him. He has a compassionate psychiatrist, who discovers hypnosis is the means to unlock hidden secrets. His other companion may not be a true ally. Donnie has a friend named Frank, a large bunny which only Donnie can see. When an engine falls off a plane and destroys his bedroom, Donnie is not there. Both the event, and Donnie's escape, seem to have been caused by supernatural events",
    Genre: {
      Name: "Miystery",
      Description:
        "Mystery films are all about the puzzle, and often feature a detective or amateur sleuth who is trying to solve it. Mystery films are full of suspense, and the protagonist searches for clues or evidence throughout the movie, piecing together events and interviewing suspects to solve the central question. Hardboiled noirs and police procedurals are two subcategories that often fall under the mystery genre.",
    },
    Director: {
      Name: "Richard Kelly",
      Bio: "James Richard Kelly better known as Richard Kelly, is an American film director and writer, known for writing and directing the cult classic Donnie Darko in 2001. Kelly was born James Richard Kelly in Newport News, Virginia, the son of Lane and Ennis Kelly. He grew up in Midlothian, Virginia, where he attended Midlothian High School and graduated in 1993. When he was a child, his father worked for NASA on the Mars Viking Lander program. He won a scholarship to the University of Southern California to study at the USC School of Cinema-Television where he was a member of the Phi Delta Theta fraternity. He made two short films at USC, The Goodbye Place and Visceral Matter, before graduating in 1997.",
      Birth: "1975",
    },
    imgURL: "",
    featured: false,
  },

  {
    Title: "Nightcrawler",
    Description:
      "NIGHTCRAWLER is a thriller set in the nocturnal underbelly of contemporary Los Angeles. Jake Gyllenhaal stars as Lou Bloom, a driven young man desperate for work who discovers the high-speed world of L.A. crime journalism. Finding a group of freelance camera crews who film crashes, fires, murder and other mayhem, Lou muscles into the cut-throat, dangerous realm of nightcrawling - where each police siren wail equals a possible windfall and victims are converted into dollars and cents. Aided by Rene Russo as Nina, a veteran of the blood-sport that is local TV news, Lou blurs the line between observer and participant to become the star of his own story.",
    Genre: {
      Name: "Drama",
      Description:
        "The drama genre features stories with high stakes and a lot of conflicts. They’re plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters.",
    },
    Director: {
      Name: "Pedro Almodóvar",
      Bio: "Dan Gilroy was born in Santa Monica, California, the son of Pulitzer Prize-winning playwright Frank D. Gilroy, and sculptor and writer Ruth Dorothy. His brother Tony Gilroy is a screenwriter and director; and his fraternal twin brother, John Gilroy, is a film editor. Through his father, he is of Italian, Irish and German descent.",
      Birth: "1949",
    },
    imgURL: "",
    featured: false,
  },

  { Title: "Nightcrawler", year: "2014", director: "Dan Gilroy" },
  { Title: "Audition", year: "2011", director: "Takashi Miike" },
  { Title: "Mulholland Dr.", year: "2001", director: "David Lynch" },
  { Title: "Parasite", year: "2019", director: "Bong Joon Ho" },
  { Title: "The Hunt", year: "2012", director: "Thomas Vinterberg" },
  { Title: "Rear Window", year: "1954", director: "Alfred Hitchcock" },
  {
    Title: "The Lord of the Rings: The Return of the King",
    year: "2003",
    director: "Peter Jackson",
  },
];


//POST route to add new User
app.post("/users", (req, res) =>{
  const newUser = req.body;
  
  if(newUser.name) {
newUser.id = uuid.v4();
users.push(newUser)
res.status(201).json(newUser)
  } else {
    res.status(400).send("users need names")
  }
})


//PUT route to update User
app.put("/users/:id", (req, res) =>{
  const { id } = req.params;
  const updatedUser = req.body;

 let user = users.find(user => user.id == id)

 if(user) {
   user.name = updatedUser.name;
   res.status(200).json(user);
 } else {
   res.status(400).send("no such user")
 }

})


//POST route to add movie to favorite
app.post("/users/:id/:movieTitle", (req, res) =>{
  const { id, movieTitle } = req.params;
  const updatedUser = req.body;

 let user = users.find(user => user.id == id)

 if(user) {
   user.favoriteMovies.push(movieTitle) 
   res.status(200).send(movieTitle + "has been added to the user" + id + " ´s array");
 } else {
   res.status(400).send("no such user")
 }

})

//DELETE route to delete favorite movie from list
app.delete("/users/:id/:movieTitle", (req, res) =>{
  const { id, movieTitle } = req.params;
  const updatedUser = req.body;

 let user = users.find(user => user.id == id)

 if(user) {
   user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle)
   res.status(200).send(movieTitle + " has been removed from the user " + id + " ´s array");
 } else {
   res.status(400).send("no such user")
 }

})

//DELETE route to delete user 
app.delete("/users/:id", (req, res) =>{
  const { id } = req.params;

 let user = users.find(user => user.id == id)

 if(user) {
   users = users.filter(user => user.id != id)
   res.status(200).send("user " + id + " has been deleted");
 } else {
   res.status(400).send("no such user")
 }

})



//GET route located at the endpoint "/movies" which returns a json object in form of a  list of top 10 movies with the status 200 "ok"
app.get("/movies", (req, res) => {
  res.status(200).json(topMovies);
});

//GET route located at the endpoint "/movies/title" which returns a json object with a single movie
app.get("/movies/:title", (req, res) => {
  const { title } = req.params; //object destructering, creatinga a variable assigning it to the url requested title
  const movie = topMovies.find((movie) => movie.Title === title); //find method that sits on an array which takes a function as a parameter

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(404).send("no such movie");
  }
});


//GET route located at the endpoint "/movies/title" which returns a json object with a single movie
app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params; //object destructering, creatinga a variable assigning it to the url requested title
  const genre = topMovies.find((movie) => movie.Genre.Name === genreName).Genre; //find method that sits on an array which takes a function as a parameter. Very important to add".Genre" at the end. It will only return us the Genre object

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(404).send("no such genre");
  }
});

//GET route located at the endpoint "/movies/title" which returns a json object with a single movie
app.get("/movies/directors/:directorName", (req, res) => {
  const { directorName } = req.params; //object destructering, creatinga a variable assigning it to the url requested title
  const director = topMovies.find((movie) => movie.Director.Name === directorName).Director; //find method that sits on an array which takes a function as a parameter. Very important to add".Genre" at the end. It will only return us the Genre object

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(404).send("no such director");
  }
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
let myLogger = (req, res, next) => {
  console.log(req.url);
  next();
};
app.use(myLogger);

//setting the error handler in express(always put it last in line)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error!");
});
