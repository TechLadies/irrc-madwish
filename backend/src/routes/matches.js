const express = require('express')
const router = express.Router()
const db = require('../models/index')
const statuses = require('../helpers/statuses')

/* GET matches listing. */
router.get('/', async (req, res) => {
    const matches = await db.Match.query().select('MatchID', 'StudentID', 'TeacherID', 'StudentStatusUpdateID', 'TeacherStatusUpdateID', 'LastEmailDate', 'MatchStatus', 'isDeleted', 'ConfirmedDate')
    res.json(matches)
  })


/* POST Delete matches from teacher profile by changing isDeleted to true */
const deleteMatches = async ({field, id, nextStatusString, res})=>{ 
    const statusDeleteMatch = ["UNMATCHED", "DROPPED OUT"]
    // TODO: Query and collect all matches for a given student/teacher 
    if (id == null || id == undefined) {
      return res.status(500).send({
        message: `${field} is undefined or null`,
        type: 'UnknownError'
      })
    }
    if (nextStatusString == "" || nextStatusString == null || nextStatusString == undefined) {
      return res.status(500).send({
        message: `nextStatusString is empty, undefined or null.`,
        type: 'UnknownError'
      })
    }
    const nextStatus = await statuses.getStatusByStatusString(nextStatusString)
    if (statusDeleteMatch.includes(nextStatus.Description)){
      await db.Match.query()
        .delete()
        .where(field, id)
  }
}
// Req body should include TeacherID 
router.post('/teacher', async (req, res) => {
    const body = req.body 
    // Change all students' statuses for a given teacher
    await deleteMatches({field: "TeacherID", id: body.TeacherID, nextStatusString: body.NextStatusString, res})
    return res.json(200, "successful")

    })

// Delete student-teacher (1:1) match when you cilck Unmatch/Dropped Out from a student profile
router.post('/student', async (req, res) => {
  // Check if student:teacher is 1:1. if teacher only has one student, then the teacher's status must also be changed.
  // If a student is not the teacher's only student, the teacher's status will not change.
  const body = req.body 
  await deleteMatches({field: "StudentID", id: body.StudentID, nextStatusString: body.NextStatusString, res})
  return res.json(200, "successful")

})

module.exports = router
