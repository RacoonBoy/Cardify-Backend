const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Deck = require("../models/deck")


const CardSchema = new Schema({
    front:{
        type: String,
        required: true
    },back: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Card', CardSchema)