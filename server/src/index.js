const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

mongoose.connect('mongodb://rocketseat:sum41rox@ds227255.mlab.com:27255/rocketseat', {
  useNewUrlParser: true
})

app.use(cors())
app.use(express.json())
app.use(require('./routes'))

app.listen(3001)