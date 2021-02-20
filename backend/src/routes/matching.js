const express = require('express')
const router = express.Router()
// const debug = require('debug')('app:students')
const teachers = require('../helpers/teachers')
const statuses = require('../helpers/statuses')
const statusUpdates = require('../helpers/statusUpdates')
const { NotFoundError } = require('objection')

// TODO: Handle errors

/* POST multiple student-teacher pairs to matching endpoint */
// on Postman: http://localhost:3001/matching
router.post('/', async (req, res) => {
  if (Array.isArray(req.body)) {
    // TODO: handle errors: Check if required fields are present

    // All students have current status UNMATCHED and next status MATCHED
    const currentStatus = await statuses.getStatusByStatusString('UNMATCHED')
    const nextStatus = await statuses.getStatusByStatusString('MATCHED')

    const result = await Promise.all(req.body.map(async item => {
      // Check that item has UpdatedBy field
      if (item.UpdatedBy == null) {
        return res.status(400).send({
          message: 'UpdatedBy field is required'
        })
      }

      // Construct statusUpdate
      const studentStatusUpdate = {
        StudentID: parseInt(item.StudentID),
        PreviousStatusID: currentStatus.StatusID,
        NextStatusID: nextStatus.StatusID,
        UpdatedBy: item.UpdatedBy
      }

      const teacher = await teachers.getTeacherById(item.TeacherID)

      const teacherStatusUpdate = {
        TeacherID: parseInt(item.TeacherID),
        PreviousStatusID: teacher.StatusID,
        NextStatusID: nextStatus.StatusID,
        UpdatedBy: item.UpdatedBy
      }

      const match = {
        StudentStatusUpdate: studentStatusUpdate,
        TeacherStatusUpdate: teacherStatusUpdate,
        LastEmailDate: item.LastEmailDate,
        MatchStatus: item.MatchStatus,
        ConfirmedDate: item.ConfirmedDate
      }

      return statusUpdates.addMatchUpdate(match)
    }))

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
  return res.status(422).send({
    message: 'Request should be an array',
    type: 'UnknownError'
  })
})

module.exports = router
