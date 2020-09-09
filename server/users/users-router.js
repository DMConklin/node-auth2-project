const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const Users = require("./users-model")
const restrict = require('../../middleware/middleware')

const router = express.Router()

router.post('/register', async (req,res,next) => {
    try {
        const { username, password, department } = req.body
        const user = await Users.add({
            username: username,
            password: await bcrypt.hash(password, 14),
            department: department
        })
    
        res.json(user)
    } catch(err) {
        next(err)
    }
})

router.post('/login', async (req,res,next) => {
    try {
        const { username, password } = req.body
        const user = await Users.findBy({ username }).first()

        if (!user) {
			return res.status(401).json({
				message: "You shall not pass!",
			})
        }
        
        const passwordValid = await bcrypt.compare(password, user.password)

		if (!passwordValid) {
			return res.status(401).json({
				message: "You shall not pass!",
			})
        }
        
        const token = jwt.sign({
			userID: user.id
        }, "secret string")
        
        res.cookie("token", token)

		res.json(token)
    } catch(err) {
        next(err)
    }
})

router.get('/users', restrict(), async (req,res,next) => {
    try {
        const users = await Users.find()
        res.json(users)
    } catch(err) {
        next(err)
    }
})

module.exports = router