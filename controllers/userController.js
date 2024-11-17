const User = require('../models/user')
const mongoose = require("mongoose");

const getUser = (req,res) => {
    User.findById({_id: new mongoose.Types.ObjectId(req.params.id)})
        .then(user => res.json(user))
        .catch(err => res.status.send(err))
}
const login = (req,res) => {
    User.findOne({username: req.params.username})
        .then(user => {
            if(user==null||user.password!==req.body.password){
                res.status(401).send('User does not exist')
                return
            }
            let data = {id: user._id}
            res.json(data)
        })
}
const addUser = (req,res) => {
    const newUser = new User(req.body)
    newUser.save(newUser)
        .then(user => res.json({id:user._id}))
        .catch(err => res.status(500).send(err))
}

module.exports = {
    getUser,
    login,
    addUser,
}