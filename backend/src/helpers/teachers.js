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
  const filterSource = options.filters.source
  const filterName = options.filters.name

  let query = db.Teacher.query().withGraphJoined('[nativeLanguage, secondLanguage, status, statusUpdates.nextStatus]')

  if (filterStatus) {
    query = query
      .where('status.Description', 'ilike', `%${filterStatus}%`)
  }

  if (filterSource){
    query = query
      .where('Source', 'ilike', `%${filterSource}%`)
  }

  if (filterName){
    query = query
      .where('FullName', 'ilike', `%${filterName}%`)
  }
  try {
    const teachers = await query.select()
    return teachers
  } catch (err) {
    return { err }
  }
}

exports.patchTeacher = async function (id, patchTeacher) {
  try {
    const response = await db.Teacher.query()
      .patchAndFetchById(id, patchTeacher)
      .throwIfNotFound()
    return response
  } catch (err) {
    return { err }
  }
}