require('dotenv').config()

const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const indexRouter = require('./routes/index')
const studentsRouter = require('./routes/students')
const nativeLanguagesRouter = require('./routes/nativeLanguages')
const statusUpdatesRouter = require('./routes/statusUpdates')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

<<<<<<< HEAD
app.use('/api', indexRouter)
app.use('/api/students', studentsRouter)
app.use('/api/nativeLanguages', nativeLanguagesRouter)
=======
app.use('/', indexRouter)
app.use('/students', studentsRouter)
app.use('/nativeLanguages', nativeLanguagesRouter)
app.use('/statusUpdates', statusUpdatesRouter)
>>>>>>> xuanjane/status-integration

module.exports = app
