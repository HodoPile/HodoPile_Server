"use strict"

require('dotenv').config()
const { createAuth0Client } = require("@auth0/auth0-spa-js")
const { runApp } = require('./src/config/mongoose')

runApp()
