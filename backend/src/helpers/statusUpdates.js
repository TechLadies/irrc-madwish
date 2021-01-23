const db = require('../models/statusUpdate')
const dbStudent = require('../models/student')
const students = require('../helpers/students')

exports.addStatusUpdate = async function (statusUpdate) {
  try {
    // Validate statusUpdate
    if (statusUpdate.PreviousStatusID === statusUpdate.NextStatusID) {
      throw Object.assign(
        new Error('Previous status must not be the same as next status.'),
        {
          code: 409,
          type: 'StatusMismatch',
          data: {
            previousStatus: statusUpdate.PreviousStatusID,
            nextStatus: statusUpdate.NextStatusID
          }
        }
      )
    }

    const student = await students.getStudentById(statusUpdate.StudentID)

    if (student.StatusID !== statusUpdate.PreviousStatusID) {
      throw Object.assign(
        new Error('Previous status must match current student status.'),
        {
          code: 422,
          type: 'StatusMismatch',
          data: {
            submittedStatus: statusUpdate.PreviousStatusID,
            actualStatus: student.StatusID
          }
        }
      )
    }

    // Execute transaction to update `statusUpdates` table and then update student status
    const response = await db.StatusUpdate.transaction(async trx => {
      await db.StatusUpdate.query().insert(statusUpdate)

      // Then patch student status ('status')
      const updateStudent = await dbStudent.Student.query(trx).findById(statusUpdate.StudentID).patch(
        { StatusID: statusUpdate.NextStatusID }
      )
      return updateStudent
    })
    return response
  } catch (err) {
    return { err }
  }
}
