const jwtSecret = "your_jwt_secret"; //has to be the same key used in the JWStrategy

const jwt = require("jsonwebtoken"),
  passport = require("passport");

require("./passport"); //the local passport file
//this code checks first if the username and password exist in the database by using LocalStrategy, if so it generates JWTToken
let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, //the username you are encoding in the JWT
    expiresIn: "7d", //specifies that the token will expire in 7 days
    algorithm: "HS256", //the algorithm used to sign or encode the values of the JWT
  });
};

//POST login
module.exports = (router) => {
  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, use, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: "Something is not right",
          user: user,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token }); // ES6 shorthand for res.json({ user: user, token: token }
      });
    })(req, res);
  });
};
