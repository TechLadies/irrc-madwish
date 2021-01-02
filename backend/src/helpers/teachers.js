const db = require('../models/teacher')

exports.addTeacher = async function (teacher) {
  try {
    const response = await db.Teacher.query().insert(teacher)
    return response
  } catch (err) {
    return { err }
  }
}

const defaultOptions = {
  filters: {}
}
exports.getAllTeachers = async function (options = defaultOptions) {
  const filterStatus = options.filters.status

  let query = db.Teacher.query().withGraphJoined('[nativeLanguage, secondLanguage, status, statusUpdates.nextStatus]')

  if (filterStatus) {
    query = query
      .where('status.Description', 'ilike', filterStatus)
  }

  try {
    const teachers = await query.select()
    return teachers
  } catch (err) {
    return { err }
  }
}