const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const deckController = require('../controllers/deckController')

router.post('/login/:username',userController.login)
router.post('/signup',userController.addUser)
router.get('/id/:id',userController.getUser)
router.get("/:userId/decks",deckController.getDecks)

module.exports = router