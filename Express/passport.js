//integrating middleware passport + http method + jwt method
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  Models = require("./models.js"),
  passportJWT = require("passport-jwt");

let Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

//defining the two passport trategies

passport.use(
  // LocalStrategy defines the basic HTTP authentication for login requests
  new LocalStrategy(
    {
      usernameField: "Username",
      passwordField: "Password"
    },
    (username, password, callback) => {
      console.log(username + " " + password);
      Users.findOne({ Username: username }, (error, user) => {
        if (error) {
          console.log(error);
          return callback(error);
        }

        if (!user) {
          console.log("incorrect username");
          return callback(null, false, {
            message: "Incorrect username or password.",
          });
        }
//integrating bcrypt to validate password 
        if(!user.validatePassword(password)) {
          console.log("incorrect password");
          return callback(null, false, {messsage:"Incorrect password."});
        }

        console.log("finished");
        return callback(null, user);
      });
    }
  )
);

passport.use(
  //JWTStrategy allows to authenticate users based on the JWT submitted alongside their request.
  new JWTStrategy(
    {
      //the JWT is extracted from the header of the HTTP requet. The JWT is called the "bearer token"
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      //secret key to verify the signature of the JWT (verifies that the sender of the JWT is who it says it is)
      secretOrKey: "your_jwt_secret",
    },
    (jwtPayload, callback) => {
      return Users.findById(jwtPayload._id)
        .then((user) => {
          return callback(null, user);
        })
        .catch((error) => {
          return callback(error);
        });
    }
  )
);
