const db = require('../models/teacher')

exports.addTeacher = async function (teacher) {
  try {
    const response = await db.Teacher.query().insert(teacher)
    return response
  } catch (err) {
    return { err }
  }
}
