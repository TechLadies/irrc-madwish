const db = require('../models/student')
//const debug = require('debug')('app:students')

exports.addStudent = async function (student) {
  try {
    const response = await db.Student.query().insert(student)
    return response
  } catch (err) {
    return { err }
  }
}

exports.patchStudent = async function (id, patchstudent) {
  // debug("test update notes")
  try {
    const response = await db.Student.query()
    // .patch(patchstudent)
    // .findById(id)
      .patchAndFetchById(id, patchstudent)
      .throwIfNotFound()
    return response
  } catch (err) {
    return { err }
  }
}
