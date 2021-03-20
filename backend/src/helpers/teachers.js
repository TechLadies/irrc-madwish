const db = require("../models/teacher");
const statuses = require("./statuses");

exports.addTeacher = async function (teacher) {
  try {
    const response = await db.Teacher.query().insert(teacher);
    return response;
  } catch (err) {
    return { err };
  }
};

const defaultOptions = {
  filters: {},
};
exports.getAllTeachers = async function (options = defaultOptions) {
  const filterStatus = options.filters.status;

  let query = db.Teacher.query().withGraphJoined(
    "[nativeLanguage, secondLanguage, status, statusUpdates.nextStatus]"
  );

  if (filterStatus) {
    query = query.where("status.Description", "ilike", filterStatus);
  }

  try {
    const teachers = await query.select();
    return teachers;
  } catch (err) {
    return { err };
  }
};

exports.getTeacherById = async function (id) {
  try {
    const teacher = await db.Teacher.query()
      .findById(id)
      .withGraphFetched(
        "[nativeLanguage, status, statusUpdates.[nextStatus, reason]]"
      )
      .throwIfNotFound();
    return teacher;
  } catch (err) {
    return { err };
  }
};

exports.patchTeacher = async function (id, patchTeacher) {
  try {
    const response = await db.Teacher.query()
      .patchAndFetchById(id, patchTeacher)
      .throwIfNotFound();
    return response;
  } catch (err) {
    return { err };
  }
};

exports.getStatusByTeacherId = async function (teacherID) {
  try {
    // This is the only executed query in this example.
    const status = await db.Teacher.relatedQuery("status").for(teacherID);
    return status;
  } catch (err) {
    return { err };
  }
};
