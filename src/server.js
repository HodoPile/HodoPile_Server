"use strict";

const cors = require('cors')
const express = require("express");
const { join } = require("path");
const app = express();
const async = require("async");
const { User } = require("../src/schema/user_schema")
const { Favorite } = require("./schema/favorite_schema")

// var corsOptions = {
//     origin: "http://localhost:8081"
// };

app.use( cors() );
app.use( express.json() ) 
app.use( express.static( './public' ) );

app.use( cors() );
app.use( express.json() ) 

// Endpoint to serve the configuration file
// app.get("/auth_config.json", (req, res) => {
//     res.sendFile( join(__dirname, "auth_config.json") );
// });

// Serve the index page for all other requests
// app.get("/*", (req, res) => {
//     res.sendFile( join(__dirname, 'index.html') );
// });

app.get("/", (req,res) => {
    res.send("NOT IMPLEMENTED, hodopile server")
})

// TODO: Use Async Library to Handle/Execute Multiple DB Queries
// Routes To Protect
app.get("/auth_config", (req,res)=>{
    res.sendFile( join(__dirname, "auth_config.json") );
})
app.get("/user", (req,res) => {
    User
        .find({})
        .then( result => {
            res.send( result )
        })

})
app.get("/user/:sub_id", (req,res) => {
    const { sub_id } = req.params
    User
        .find( sub_id )
        .populate( "card_id" ) // needs to be cards ObjectId not card_id
        .then( result => res.send(result))
        .catch( err => console.log(err) )
})
app.post("/user", (req,res) => res.send("NOT IMPLEMENTED"))
app.put("/user", (req,res)=>{
    const { card_id, sub_id } = req.body
    Favorite
        .findOne( { card_id:card_id } )
        .then( result => {
            console.log( result )
            User
                .updateOne( 
                    { sub_id },
                    { $addToSet: { favorited: result._id } }, 
                 )
                .then( result => res.send( result ))
                .catch( err => console.log( err ))
        })
        .catch( err => console.log( err ))
})
app.get("/favorites", (req,res) => {})
app.put("/favorites", ({body},res) => {
    // find a card and add a user id to its users array 
    // else create a new card and add the users
    const { card_id, sub_id, ...rest  } = body
    const filter = { card_id: card_id }
    const update = { ...rest }
    console.log(filter)
    console.log(update)
    Favorite
        .findOneAndUpdate( filter, update, { new: true, upsert: true })
        .then( result => {
            Favorite
                .updateOne(
                    { _id: result._id },
                    { $addToSet: { users: sub_id } } //needs to be users ObjectId not sub_id
                )
                .then( result => {
                    console.log(result)
                    res.send(result)
                })
                .catch( err => console.log(err) )
        })
        .catch( err => console.log(err) )
})

module.exports = {
    app:app,
    start: port => {
        if( !port ) throw new Error("ERR: no port detected");
        app.listen( port, () => console.log( `server listening port: ${ port }` ))
    }
}
