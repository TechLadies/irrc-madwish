require('dotenv').config()

const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const path = require('path')

const studentsRouter = require('./routes/students')
const nativeLanguagesRouter = require('./routes/nativeLanguages')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.static(path.resolve(__dirname, "../public")))

// Backend routes
app.use('/api/students', studentsRouter)
app.use('/api/nativeLanguages', nativeLanguagesRouter)

app.get("*", function(req, res) {
  res.sendFile(path.resolve(__dirname, "../public/index.html"))
})

module.exports = app
