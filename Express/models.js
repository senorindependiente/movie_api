
//importing mongoose package 
const mongoose = require("mongoose");

//configuring the schema and models "the business logic layer" with mongoose

//defining the schema for the movies collection
let movieSchema = mongoose.Schema({
    Title:{type:String, required:true},
    Description: {type: String, required:true},
    Genre:{
        Name:String,
        Description:String
    },
    Director:{
        Name:String,
        Bio:String
    },
    ImagePath:String,
    Featured:Boolean
});

//defining the schema for the users collection

let userSchema = mongoose.Schema({
    Username:{type:String, required:true},
    Password:{type:String, requried:true},
    Email:{ type:String, required:true},
    Birthday:Date,
    //mongoose uses .populate method
    //the "FavoriteMovie" key contains an array of actual movies rather than the IDs for the movie documents
    FavoriteMovie:[{type:mongoose.Schema.Types.ObjectId, ref:"Movie"}] 
})

//creating the models that use the schemas
//this will create collections called db.movies and db.users in mongodb
let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

//exporting the models in order to import them in index.js

module.exports.Movie = Movie;
module.exports.User = User;
