const express = require('express')
const router = express.Router()
const reasons = require('../helpers/reasons')
const statusUpdates = require('../helpers/statusUpdates')
const statuses = require('../helpers/statuses')
const students = require('../helpers/students')
const teachers = require('../helpers/teachers')

router.post('/', async (req, res) => {
  // If request does not contain PreviousStatusID and contains a PreviousStatusString
  if (req.body.PreviousStatusID == null && req.body.PreviousStatusString != null) {
    try {
      const prevStatus = await statuses.getStatusByStatusString(req.body.PreviousStatusString)
      req.body.PreviousStatusID = prevStatus.StatusID
      delete req.body.PreviousStatusString
    } catch (err) {
      return res.status(500).send({
        message: err.message,
        type: 'UnknownError with Status',
        data: {}
      })
    }
  }

  // If request does not contain NextStatusID and contains a NextStatusString
  if (req.body.NextStatusID == null && req.body.NextStatusString != null) {
    const nextStatus = await statuses.getStatusByStatusString(req.body.NextStatusString)
    req.body.NextStatusID = nextStatus.StatusID
    delete req.body.NextStatusString
  }

  console.log(req.body)
  if (req.body.PreviousStatusID === req.body.NextStatusID) {
    return res.status(422).send({
      message: 'Previous Status and Next Status should not be the same.',
      type: 'StatusError',
      data: {
        previousStatus: req.body.PreviousStatusID,
        nextStatus: req.body.NextStatusID
      }
    })
  }

  const student = await students.getStudentById(req.body.StudentID)
  const teacher = await teachers.getTeacherById(req.body.TeacherID)
  console.log(teacher)
  
  if (!req.body.TeacherID && student.StatusID !== req.body.PreviousStatusID) {
    return res.status(409).send({
      message: 'Previous status must match current student status.',
      type: 'StatusMismatch',
      data: {
        submittedStatus: req.body.PreviousStatusID,
        actualStatus: student.StatusID
      }
    })
  }

  if (!req.body.StudentID && teacher.StatusID !== req.body.PreviousStatusID) {
    return res.status(409).send({
      message: 'Previous status must match current teacher status.',
      type: 'StatusMismatch',
      data: {
        submittedStatus: req.body.PreviousStatusID,
        actualStatus: teacher.StatusID
      }
    })
  }
  // If request does not contain ReasonID
  if (req.body.ReasonString) {
    try {
      const reason = await reasons.getReasonPromise(
        req.body.ReasonString
      )
      req.body.ReasonID = reason.ReasonID
      delete req.body.ReasonString
    } catch (err) {
      return res.status(500).send({
        message: err.message,
        type: 'UnknownError with Reason',
        data: {}
      })
    }
  }

  

  const result = await statusUpdates.addStatusUpdate(req.body)

  // handle error
  if (result.err) {
    const err = result.err
    res.status(err.code).send({
      message: err.message,
      type: err.type,
      data: err.data
    })
    return
  }

  res.status(200).json(result)
})

module.exports = router
