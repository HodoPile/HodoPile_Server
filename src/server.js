"use strict";

const cors = require('cors')
const express = require("express");
const { join } = require("path");
const app = express();
const { User } = require("../src/schema/user_schema")

// var corsOptions = {
//     origin: "http://localhost:8081"
// };

app.use( cors() );
app.use( express.json() ) 
// Serve static assets from the /public folder
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

app.get("/auth_config", (req,res)=>{
    res.sendFile( join(__dirname, "auth_config.json") );
})

app.get("/user", (req,res) => {
    User
        .find({})
        .then( result => {
            console.log(result)
            res.send( result )
        })
})

module.exports = {
    app:app,
    start: port => {
        if( !port ) throw new Error("ERR: no port detected");
        app.listen( port, () => console.log( `server listening port: ${ port }` ))
    }
}
