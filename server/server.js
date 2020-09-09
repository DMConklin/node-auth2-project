const express = require('express')
const server = express()
const usersRouter = require('./users/users-router')
const cookieParser = require('cookie-parser')

server.use(express.json())
server.use(cookieParser())
server.use('/api', usersRouter)

module.exports = server