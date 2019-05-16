const express = require('express')
const TweetController = require('./controllers/TweetController')
const LikeController = require('./controllers/LikeController')
const LoginController = require('./controllers/LoginController')

const routes = express.Router()

routes.get('/', TweetController.index)
routes.post('/tweet', TweetController.store)
routes.post('/tweet/likes', LikeController.store)
routes.post('/user', LoginController.store)
routes.post('/login', LoginController.login)

module.exports = routes