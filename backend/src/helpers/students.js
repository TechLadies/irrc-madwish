const db = require('../models/student')

exports.addStudent = async function (student) {
  try {
    const response = await db.Student.query().insert(student)
    return response
  } catch (err) {
    return { err }
  }
}

exports.updateNote = async function (note) {
  try {
    const response = await db.Student.query()
      .update(note)
      .where()
    return response
  } catch (err) {
    return { err }
  }
}

// Reach goal (more time) (Make sure to create a new branch)
// updateStudentStatus
// updateUnmatchedToMatched

// Commit 1
// Update individual student fields

// Commit 2
// getPreviousStudentStatusID
// getCurrentStudentStatusID
