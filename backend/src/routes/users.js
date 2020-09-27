
const express = require('express')
const router = express.Router()
const debug = require('debug')('app:users')
const db = require('../models/index')

/* GET users listing. */
router.get('/', async (req, res) => {
  debug('Hello World!')

  const users = await db.User.query().select('email', 'firstName', 'lastName')
  res.json(users)
})

module.exports = router
