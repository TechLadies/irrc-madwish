const db = require("../models/student");
// const debug = require('debug')('app:students')
const statuses = require("./statuses");
const nativeLanguages = require("./nativeLanguages");

exports.getAllStudents = async function () {
  try {
    const students = await db.Student.query().select();
    return students;
  } catch (err) {
    return { err };
  }
};

exports.getStudentById = async function (id) {
  try {
    const student = await db.Student.query()
      .findById(id)
      .withGraphFetched("[nativeLanguage, status, statusUpdates.nextStatus]")
      .throwIfNotFound();
    return student; // return student[0] || 'Not found'
  } catch (err) {
    return { err };
  }
};

exports.addStudent = async function (student) {
  try {
    const response = await db.Student.query().insert(student);
    return response;
  } catch (err) {
    return { err };
  }
};

exports.patchStudent = async function (id, patchStudent) {
  // debug("test update notes")
  try {
    const response = await db.Student.query()
      .patchAndFetchById(id, patchStudent)
      .throwIfNotFound();
    return response;
  } catch (err) {
    return { err };
  }
};

exports.getStatusByStudentId = async function (studentID) {
  try {
    // This is the only executed query in this example.
    const status = await db.Student.relatedQuery("status").for(studentID);
    return status;
  } catch (err) {
    return { err };
  }
};

exports.getStatusPromise = async function (statusString) {
  if (statusString != null) {
    // If request contains StatusString, return corresponding StatusID
    return statuses.getStatusByStatusString(statusString);
  } else {
    // If StatusID and StatusString are both not provided, default to 'SCREENING' StatusID
    return statuses.getStatusByStatusString("SCREENING");
  }
};
exports.getNativeLanguagePromise = async function (nativeLanguageString) {
  if (nativeLanguageString != null) {
    const nativeLanguageResponse = await nativeLanguages.getNativeLanguageByString(
      nativeLanguageString
    );
    if (nativeLanguageResponse && !nativeLanguageResponse.err) {
      return nativeLanguageResponse;
    } else if (!nativeLanguageResponse) {
      const newNativeLanguage = await nativeLanguages.addNativeLanguage({
        NativeLanguage: nativeLanguageString,
      });
      return newNativeLanguage;
    } else {
      throw nativeLanguageResponse.err;
    }
  } else {
    // If NativeLanguage is empty, will throw an error
    throw new Error("NativeLanguageString or NativeLanguageID is required");
  }
};
