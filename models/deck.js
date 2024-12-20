const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DeckSchema = new Schema({
    name:{
        type: String,
        required: true
    },cards:{
        type: [Schema.Types.ObjectId],
        ref: 'Card'
    }
})

module.exports = mongoose.model('Deck', DeckSchema)