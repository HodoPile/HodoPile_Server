"use strict";

const cors = require('cors')
const express = require("express");
const app = express();

// var corsOptions = {
//     origin: "http://localhost:8081"
// };

app.use( cors() );
app.use( express.json() ) 

app.get('/', (req,res)=> {
    res.send("NOT IMPLEMENTED")
})

module.exports = {
    app:app,
    start: port => {
        if( !port ) throw new Error("ERR: no port detected");
        app.listen( port, () => console.log( `server listening port: ${ port }` ))
    }
}
