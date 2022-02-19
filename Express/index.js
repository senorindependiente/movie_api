//imports express ( a node.js)framework with middlware module packages  body parser, uuid and morgan
const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  //automatically creates and assigns unique ids to new users
  uuid = require("uuid");
const res = require("express/lib/response");

//sets  express’s functionality to a variable
const app = express();

//invokes the middleware module body-parser.
//it allows you to read the “body” of HTTP requests within your request handlers simply by using the code req.body.
app.use(bodyParser.json());

//invokes middle ware function with "common" parameters using the default format
app.use(morgan("common"));

//importing mongoose to be integrated with the REST API
// this will allow the REST API to perform CRUD operations on MongoDB
const mongoose = require("mongoose");
const { reset } = require("nodemon");
const Models = require("./models.js");
//importing mongoose models which were defined in models.js
const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

//allows mongoose to connect to the myFlixDB database to perform CRUD operations
mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//POST route to add new User
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username }).then((user) => {
    if (user) {
      return res.status(400).send(req.body.Username + "already exists");
    } else {
      Users.create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      })
        .then((user) => {
          res.status(201).json(user);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send("Error: " + error);
        });
    }
  });
});

//PUT route to update User
app.put("/users/:Username", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error; " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//POST route to add movie to favorite
app.post("/users/:Username/:MovieID", (req, res) => {
  Users.findByIdAndUpdate(
    { Username: req.params.Username },
    { $push: { favoriteMovies: req.params.MovieID } },
    { new: true }, //This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//DELETE route to delete favorite movie from list
app.delete("/users/:Username/:movieTitle", (req, res) => {
  Users.findByIdAndRemove(
    { Username: req.params.Username },
    { $pull: { favoriteMovies: req.params.MovieID } },
    { new: true }, //This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//DELETE route to delete user
app.delete("/users/:Username", (req, res) => {
  Users.findByIdAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + "was not found");
      } else {
        res.status(200).send(req.params.Username + "was deleted");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//GET route located at the endpoint "/movies" which returns a json object in form of a  list of top 10 movies with the status 200 "ok"
app.get("/movies", (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//GET route located a the endpoint"/users" to get a list of all users
app.get("/users", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//GET route located at the endpoint "/movies/title" which returns a json object with a single movie
app.get("/movies/:title", (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//GET route located at the endpoint "/movies/genre" which returns a json object with a single movie
app.get("/movies/genre/:genreName", (req, res) => {
  Genre.findOne({ Genre: req.params.Genre })
    .then((genre) => {
      res.json(genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//GET route located at the endpoint "/movies/director" which returns a json object with a single movie
app.get("/movies/directors/:directorName", (req, res) => {
  Directors.findOne({ Name: req.params.Name })
    .then((director) => {
      res.json(director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
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
