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
const deleteMatches = async ({field, id, nextStatusString})=>{ 
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
    await deleteMatches({field: "TeacherID", id: body.TeacherID, nextStatusString: body.NextStatusString})
    return res.json(200, "successful")

})

// Delete student-teacher (1:1) match when you cilck Unmatch/Dropped Out from a student profile
router.post('/student', async (req, res) => {
  const body = req.body 
  await deleteMatches({field: "StudentID", id: body.StudentID, nextStatusString: body.NextStatusString})
  return res.json(200, "successful")

})

module.exports = router
