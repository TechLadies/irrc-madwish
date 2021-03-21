const db = require("../models/statusUpdate");
const dbStudent = require("../models/student");
const dbTeacher = require("../models/teacher");
const dbMatch = require("../models/match");
const students = require("../helpers/students");
const teachers = require("../helpers/teachers");

exports.addStatusUpdate = async function (statusUpdate) {
  const isTeacher = statusUpdate.TeacherID;

  try {
    // Validate statusUpdate
    if (statusUpdate.PreviousStatusID === statusUpdate.NextStatusID) {
      throw Object.assign(
        new Error("Previous status must not be the same as next status."),
        {
          code: 409,
          type: "StatusMismatch",
          data: {
            previousStatus: statusUpdate.PreviousStatusID,
            nextStatus: statusUpdate.NextStatusID,
          },
        }
      );
    }

    if (!statusUpdate.UpdatedBy) {
      throw Object.assign(new Error("Missing status change UpdatedBy field."), {
        code: 422,
        type: "MissingUpdatedBy",
        data: {
          error: "Missing status change UpdatedBy field",
        },
      });
    }

    const stdOrTeacher = isTeacher
      ? await teachers.getTeacherById(statusUpdate.TeacherID)
      : await students.getStudentById(statusUpdate.StudentID);
    // const student = await students.getStudentById(statusUpdate.StudentID)

    if (stdOrTeacher.StatusID !== statusUpdate.PreviousStatusID) {
      throw Object.assign(
        new Error("Previous status must match current student/teacher status."),
        {
          code: 422,
          type: "StatusMismatch",
          data: {
            submittedStatus: statusUpdate.PreviousStatusID,
            actualStatus: stdOrTeacher.StatusID,
          },
        }
      );
    }

    // Execute transaction to update `statusUpdates` table and then update student status
    const response = await db.StatusUpdate.transaction(async (trx) => {
      await db.StatusUpdate.query().insert(statusUpdate);

      // Then patch teacher or student status ('status')
      const updateStdOrTeacher = isTeacher
        ? dbTeacher.Teacher.query(trx)
            .findById(statusUpdate.TeacherID)
            .patch({ StatusID: statusUpdate.NextStatusID })
        : dbStudent.Student.query(trx)
            .findById(statusUpdate.StudentID)
            .patch({ StatusID: statusUpdate.NextStatusID });
      return await updateStdOrTeacher;
    });
    return response;
  } catch (err) {
    return { err };
  }
};

exports.addMatchUpdate = async function (match) {
  try {
    // Validate statusUpdate (student)
    if (
      match.StudentStatusUpdate.PreviousStatusID ===
      match.StudentStatusUpdate.NextStatusID
    ) {
      throw Object.assign(
        new Error("Previous status must not be the same as next status."),
        {
          code: 409,
          type: "StatusMismatch",
          data: {
            previousStatus: match.StudentStatusUpdate.PreviousStatusID,
            nextStatus: match.StudentStatusUpdate.NextStatusID,
          },
        }
      );
    }

    const student = await students.getStudentById(
      match.StudentStatusUpdate.StudentID
    );

    if (student.StatusID !== match.StudentStatusUpdate.PreviousStatusID) {
      throw Object.assign(
        new Error("Previous status must match current student status."),
        {
          code: 422,
          type: "StatusMismatch",
          data: {
            submittedStatus: match.StudentStatusUpdate.PreviousStatusID,
            actualStatus: student.StatusID,
          },
        }
      );
    }

    // Validate statusUpdate (teacher)
    const teacher = await teachers.getTeacherById(
      match.TeacherStatusUpdate.TeacherID
    );

    if (teacher.StatusID !== match.TeacherStatusUpdate.PreviousStatusID) {
      throw Object.assign(
        new Error("Previous status must match current teacher status."),
        {
          code: 422,
          type: "StatusMismatch",
          data: {
            submittedStatus: match.TeacherStatusUpdate.PreviousStatusID,
            actualStatus: teacher.StatusID,
          },
        }
      );
    }

    // Execute transaction to update `statusUpdates` table and then update student status
    const response = await db.StatusUpdate.transaction(async (trx) => {
      // Add statusUpdate for student and teacher
      const studentStatusUpdateResponse = await db.StatusUpdate.query().insert(
        match.StudentStatusUpdate
      );

      let teacherStatusUpdateID;
      if (teacher.StatusID !== match.TeacherStatusUpdate.NextStatusID) {
        const teacherStatusUpdateResponse = await db.StatusUpdate.query().insert(
          match.TeacherStatusUpdate
        );
        teacherStatusUpdateID = teacherStatusUpdateResponse.StatusUpdateID;
      } else {
        teacherStatusUpdateID = studentStatusUpdateResponse.StatusUpdateID;
      }

      const matchItem = {
        StudentID: match.StudentStatusUpdate.StudentID,
        TeacherID: match.TeacherStatusUpdate.TeacherID,
        StudentStatusUpdateID: studentStatusUpdateResponse.StatusUpdateID,
        TeacherStatusUpdateID: teacherStatusUpdateID,
        LastEmailDate: new Date(match.LastEmailDate),
        MatchStatus: match.MatchStatus,
        ConfirmedDate: new Date(match.ConfirmedDate),
      };

      // TODO: Consider adding validations when inserting to matches table
      //Add new entry to matches table
      await dbMatch.Match.query(trx).insert(matchItem);

      // Then patch student status ('status')
      const updateStudent = await dbStudent.Student.query(trx)
        .findById(matchItem.StudentID)
        .patch({ StatusID: match.StudentStatusUpdate.NextStatusID });
      // Then patch teacher status ('status')
      if (teacher.StatusID !== match.TeacherStatusUpdate.NextStatusID) {
        await dbTeacher.Teacher.query(trx)
          .findById(matchItem.TeacherID)
          .patch({ StatusID: match.TeacherStatusUpdate.NextStatusID });
      }

      return updateStudent;
    });
    return response;
  } catch (err) {
    return { err };
  }
};
