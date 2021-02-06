const express = require('express')
const router = express.Router()
const db = require('../models/index')

/* GET matches listing. */
router.get('/', async (req, res) => {
    const matches = await db.Match.query().select('MatchID', 'StudentID', 'TeacherID', 'StudentStatusUpdateID', 'TeacherStatusUpdateID', 'LastEmailDate', 'MatchStatus', 'ConfirmedDate')
    res.json(matches)
  })

module.exports = router
