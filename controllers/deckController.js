const mongoose = require("mongoose")
const Deck = require("../models/deck")
const Card = require("../models/card")
const User = require("../models/user");

const addDeck = async (req, res) => {
    if (req.body.userId === undefined) {
        res.status(400).send("Require userId properties")
        return
    }
    const newDeck = await Deck.create({
        name: req.body.name
    })
    User.findById({_id: new mongoose.Types.ObjectId(req.body.userId)})
        .then(user => {
            user.decks.push(newDeck)
            user.save()
            res.json(newDeck._id)
        })
        .catch(err => res.status(500).send(err))
}
const addCard = (req, res) => {
    Deck.findById({_id: new mongoose.Types.ObjectId(req.params.deckId)})
        .then(async deck => {
            const newCard = await Card.create(req.body)
            deck.cards.push(newCard)
            deck.save()
            res.json(newCard)
        })
        .catch(err => res.status(500).send(err))
}
const getDecks = (req, res) => {
    User.findById({_id: req.params.userId})
        .populate("decks")
        .then(user => res.json(user.decks))
        .catch(err => res.status(500).send(err))
}
const getDeck = (req, res) => {
    Deck.findById({_id: new mongoose.Types.ObjectId(req.params.id)})
        .then(deck => res.json(deck))
        .catch(err => res.status(500).send(err))
}
const getCards = (req, res) => {
    Deck.findById({_id: new mongoose.Types.ObjectId(req.params.deckId)})
        .populate('cards')
        .then(deck => {
            res.json(deck.cards)
        })
        .catch(err => res.status(500).send(err))
}
const deleteCard = async (req, res) => {
    await Deck.updateOne({_id: req.params.deckId}, {$pull: {cards: req.params.cardId}})
    Card.deleteOne({_id: req.params.cardId})
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err))
}
module.exports = {
    addDeck,
    addCard,
    getDecks,
    getDeck,
    getCards,
    deleteCard
}