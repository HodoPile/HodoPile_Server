"use strict";
const { start } = require("../server")
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4001
const connectionString = process.env.ATLAS_URI_MONGOOSE

module.exports = { 
    runApp: () => {
        mongoose.connect( connectionString, { useNewUrlParser: true })
        .then( ( { connections } ) => {

            const { name } = connections[0]
            start( PORT )
            console.log(`connected to: ${name}`)
        })  
        .catch( ( err ) => console.log( "ERR: ", err ))
    },
    stopApp: () => mongoose.disconnect()
}
