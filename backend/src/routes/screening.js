const express = require('express')
const router = express.Router()
// const debug = require('debug')('app:students')
const students = require("../helpers/students");
const statuses = require("../helpers/statuses.js")
const { NotFoundError } = require("objection");

// TODO: Handle errors

/* POST multiple students to screening endpoint */
// on Postman: http://localhost:3001/students/1
router.post('/', async (req, res) => {
  if (Array.isArray(req.body)) {
    // handle errors: Check if required fields are present

    // All students have Status set to UNMATCHED
    const status = await statuses.getStatusByStatusString('UNMATCHED')
    // process each item asynchronously
    const result = await Promise.all(req.body.map(async item => {
      item.StatusID = status.StatusID
      return students.patchStudent(item.StudentID, item)
    }
    ))
    // Error handling
    if (result.err) {
      const err = result.err
      if (err instanceof NotFoundError) {
        return res.status(404).send({
          message: err.message,
          type: 'NotFound'
        })
      } else {
        return res.status(500).send({
          message: err.message,
          type: 'UnknownError'
        })
      }
    }
    return res.status(200).json(result)
  }
  return res.status(500).send({
    message: 'Request should be an array',
    type: 'UnknownError'
  })
})

module.exports = router
