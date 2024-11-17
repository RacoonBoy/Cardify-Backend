const express = require('express')
const router = express.Router()
const deckController = require('../controllers/deckController')

router.post('/',deckController.addDeck)
router.post('/:deckId',deckController.addCard)
router.get('/:id',deckController.getDeck)
router.get('/:deckId/cards',deckController.getCards)
router.delete('/:deckId/:cardId',deckController.deleteCard)

module.exports = router