
const express = require('express')
const router = express.Router()
//const debug = require('debug')('app:students')
const db = require('../models/index')
const students = require('../helpers/students')

const { UniqueViolationError } = require('objection')
const { NotFoundError } = require('objection')

/* GET students listing. */
router.get('/', async (req, res) => {
  // debug('Hello World!')

  const students = await db.Student.query().select('FirstName', 'LastName', 'Notes')
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

/* PATCH student listing */
// on Postman: http://localhost:3001/students/1
router.patch('/:id', async (req, res) => {
  // debug('Hello World!')
  // console.log('hello world')
  // console.log(req.body)
  const result = await students.patchStudent(req.params.id, req.body)
  // handle error
  if (result.err) {
    const err = result.err
    if (err instanceof NotFoundError) {
      res.status(409).send({
        message: err.message,
        type: 'StudentNotFound',
        data: {}
      })
    } else {
      res.status(500).send({
        message: err.message,
        type: 'UnknownError. Database contraints may be violated',
        data: {}
      })
    }

    return
  }

  res.status(200).json(result)
})

module.exports = router

module.exports = router
