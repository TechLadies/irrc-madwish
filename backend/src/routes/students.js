
const express = require('express')
const router = express.Router()
// const debug = require('debug')('app:students')
const db = require('../models/index')
const students = require('../helpers/students')

const { UniqueViolationError } = require('objection')

/* GET students listing. */
router.get('/', async (req, res) => {
  // debug('Hello World!')
  const students = await db.Student.query().select('FirstName', 'LastName')
  res.json(students)
})

/* POST students listing */
router.post('/', async (req, res) => {
  const result = await students.addStudent(req.body)

  // handle error
  if (result.err) {
    const err = result.err
    if (err instanceof UniqueViolationError) {
      res.status(409).send({
        message: err.message,
        type: 'UniqueViolation',
        data: {
          columns: err.columns,
          table: err.table,
          constraint: err.constraint
        }
      })
    } else {
      res.status(500).send({
        message: err.message,
        type: 'UnknownError',
        data: {}
      })
    }

    return
  }

  res.status(200).json(result)
})

module.exports = router

module.exports = router
