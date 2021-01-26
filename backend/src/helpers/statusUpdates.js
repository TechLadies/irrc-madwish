const db = require('../models/statusUpdate')
const dbStudent = require('../models/student')
const students = require('../helpers/students')
const dbTeacher = require('../models/teacher')
const teachers = require('../helpers/teachers')

exports.addStatusUpdate = async function (statusUpdate) {
  const isTeacher = statusUpdate.TeacherID;

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

    const stdOrTeacher = isTeacher ? await teachers.getTeacherById(statusUpdate.TeacherID) : await students.getStudentById(statusUpdate.StudentID)
    // const student = await students.getStudentById(statusUpdate.StudentID)

    if (stdOrTeacher.StatusID !== statusUpdate.PreviousStatusID) {
      throw Object.assign(
        new Error('Previous status must match current student/teacher status.'),
        {
          code: 422,
          type: 'StatusMismatch',
          data: {
            submittedStatus: statusUpdate.PreviousStatusID,
            actualStatus: stdOrTeacher.StatusID
          }
        }
      )
    }

    // Execute transaction to update `statusUpdates` table and then update student status
    const response = await db.StatusUpdate.transaction(async trx => {
      await db.StatusUpdate.query().insert(statusUpdate)

      // Then patch teacher or student status ('status')
      const updateStdOrTeacher = 
      isTeacher ? await dbTeacher.Teacher.query(trx).findById(statusUpdate.TeacherID).patch(
        { StatusID: statusUpdate.NextStatusID }
      )
      :
      await dbStudent.Student.query(trx).findById(statusUpdate.StudentID).patch(
        { StatusID: statusUpdate.NextStatusID }
      )
      return updateStdOrTeacher;
    })
    return response
  } catch (err) {
    return { err }
  }
}
