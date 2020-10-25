const db = require('../models/student')
// const debug = require('debug')('app:students')

exports.getAllStudents = async function () {
  try {
    const students = await db.Student.query().select()
    return students
  } catch (err) {
    return { err }
  }
}

exports.getStudentById = async function (id) {
  try {
    const student = await db.Student.query()
      .select()
      .where('StudentID', id)
    return student // return student[0] || 'Not found'
  } catch (err) {
    return { err }
  }
}

exports.addStudent = async function (student) {
  try {
    const response = await db.Student.query().insert(student)
    return response
  } catch (err) {
    return { err }
  }
}

exports.patchStudent = async function (id, patchStudent) {
  // debug("test update notes")
  try {
    const response = await db.Student.query()
    // .patch(patchstudent)
    // .findById(id)
      .patchAndFetchById(id, patchStudent)
      .throwIfNotFound()
    return response
  } catch (err) {
    return { err }
  }
}

exports.getStatusByStudentId = async function (studentID) {
  try {
    // Note that there is no `await` here. This query does not get executed.
    const studentSubQuery = db.Student.query().where('StudentID', studentID)

    // This is the only executed query in this example.
    const status = await db.Student.relatedQuery('status')
      .for(studentSubQuery)
    return status
  } catch (err) {
    return { err }
  }
}
