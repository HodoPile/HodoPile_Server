"use strict";

const { mongoose, Schema } = require("mongoose");

const  cardSchema = new Schema({
    card_id: { type: String, default:""},
    title: { type: String, required: true },
    img_url: { type: String, default: "lorem ipsum" },
    alt_description: { type: String, default: "lorem ipsum" },
    description: { type: String, default: "lorem ipsum" },
    tags: [{type: String}],
    users:[[{type: Schema.Types.ObjectId}]]
})

const Card = mongoose.model("Destination", cardSchema)

module.exports = { Card }