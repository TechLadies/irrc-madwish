const express = require('express')
const router = express.Router()
const db = require('../models/index')
const statuses = require('../helpers/statuses')
const statusUpdates = require('../helpers/statusUpdates.js')


/* GET matches listing. */
router.get('/', async (req, res) => {
    const matches = await db.Match.query().select('MatchID', 'StudentID', 'TeacherID', 'StudentStatusUpdateID', 'TeacherStatusUpdateID', 'LastEmailDate', 'MatchStatus', 'ConfirmedDate')
    res.json(matches)
  })

/* POST Delete matches from teacher profile */
const deleteMatches = async ({field, id, nextStatusString, res})=>{ 
  // Check if id or nextStatusString are null/undefined/empty
    if (id == null || id == undefined) {
      return res.status(500).send({
        message: `${field} is undefined or null`,
        type: 'UnknownError'
      })
    }
    if (nextStatusString == "" || nextStatusString == null || nextStatusString == undefined) {
      // console.log(nextStatusString)
      return res.status(500).send({
        message: `nextStatusString is empty, undefined or null.`,
        type: 'UnknownError'
      })
    }
/* Check if field is TeacherID */ 
    if (field === "TeacherID") {
      // Query for studentIDs linked to the TeacherID
      const studentsMatched = await db.Match.query().select("StudentID").where(field, id)
      // Update status of all students linked to the TeacherID 
      // Asynchronously get current status in any order 
      const [currentStatus, nextStatus] = await Promise.all([
        statuses.getStatusByStatusString('MATCHED'),
        statuses.getStatusByStatusString('UNMATCHED')
      ])
      // TODO: Implement status updates for students as a transaction to avoid cases where status is changed only for some 
      await Promise.all(studentsMatched.map(async student => {
        // Construct statusUpdate
        const statusUpdate = {
          StudentID: student.StudentID,
          PreviousStatusID: currentStatus.StatusID,
          NextStatusID: nextStatus.StatusID,
          UpdatedBy: "IRRCAdmin"
        }
        await statusUpdates.addStatusUpdate(statusUpdate)
      }))
    }
    const statusDeleteMatch = ["UNMATCHED", "DROPPED OUT"]
    
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
