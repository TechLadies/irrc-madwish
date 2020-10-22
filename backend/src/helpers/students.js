const db = require('../models/student')

exports.addStudent = async function (student) {
  try {
    const response = await db.Student.query().insert(student)
    return response
  } catch (err) {
    return { err }
  }
}
