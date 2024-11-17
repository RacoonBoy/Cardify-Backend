const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    displayName:{
        type: String,
        required: true,
        minLength:[6, 'Display name must be at least 6 characters long.']
    },username:{
        type: String,
        required: true,
        minLength:[6, 'Username must be at least 6 characters long.']
    },password:{
        type: String,
        required: true,
        minLength:[6, 'Password must be at least 6 characters long.']
    },decks:{
        type: [Schema.Types.ObjectId],
        ref: 'Deck'
    }
})

module.exports = mongoose.model('User', UserSchema)