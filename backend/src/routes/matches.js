const express = require("express");
const router = express.Router();
const db = require("../models/index");
const statuses = require("../helpers/statuses");
const statusUpdates = require("../helpers/statusUpdates.js");
const matches = require("../helpers/matches");

/* GET matches listing. */
router.get("/", async (req, res) => {
  const my_matches = await matches.getAllMatches();

  // handle error
  if (my_matches.err) {
    // console.log('entered result.err')
    const err = my_matches.err;
    res.status(500).send({
      message: err.message,
      type: "UnknownError",
      data: {},
    });
    return;
  }

  res.json(my_matches);
});

/* POST Delete matches from teacher profile */
const deleteMatches = async ({ field, id, nextStatusString, res }) => {
  // ERROR HANDLING
  // nextStatusString must be UNMATCHED/DROPPED OUT, or else request will not be accepted.
  const statusDeleteMatch = ["UNMATCHED", "DROPPED OUT"];
  if (!statusDeleteMatch.includes(nextStatusString)) {
    return res.status(200).send({
      message: `${nextStatusString} must be "UNMATCHED" or "DROPPED OUT"`,
    });
  }
  // Check if id or nextStatusString are null/undefined/empty
  if (id == null || id == undefined) {
    return res.status(500).send({
      message: `${field} is undefined or null`,
      type: "UnknownError",
    });
  }
  if (
    nextStatusString == "" ||
    nextStatusString == null ||
    nextStatusString == undefined
  ) {
    // console.log(nextStatusString)
    return res.status(500).send({
      message: `nextStatusString is empty, undefined or null.`,
      type: "UnknownError",
    });
  }
  // Asynchronously get current status in any order - used for both TeacherID and StudentID scenarios
  const [currentStatus, nextStatus] = await Promise.all([
    statuses.getStatusByStatusString("MATCHED"),
    statuses.getStatusByStatusString("UNMATCHED"),
  ]);
  if (field === "StudentID") {
    // select(1) returns an object instead of an array. Only one result is expected as one student has one teacher
    // Note: teacherMatched returns an array
    const teacherMatched = await db.Match.query()
      .select("TeacherID")
      .where(field, id);
    const teacherMatchedID = teacherMatched[0].TeacherID;
    console.log(teacherMatched[0]);
    // Count number of students the teacher has
    const studentsCount = await db.Match.query()
      .select("StudentID")
      .where("TeacherID", teacherMatchedID);

    // Change teacher's status only if this student is their only student.
    if (studentsCount.length == 1) {
      const teacherStatusUpdate = {
        TeacherID: teacherMatchedID,
        PreviousStatusID: currentStatus.StatusID,
        NextStatusID: nextStatus.StatusID,
        UpdatedBy: "IRRCAdmin",
      };
      await statusUpdates.addStatusUpdate(teacherStatusUpdate);
    }
  }
  /* Check if field is TeacherID */
  if (field === "TeacherID") {
    // Query for studentIDs linked to the TeacherID
    const studentsMatched = await db.Match.query()
      .select("StudentID")
      .where(field, id);
    // Update status of all students linked to the TeacherID

    // TODO: Implement status updates for students as a transaction to avoid cases where status is changed only for some
    await Promise.all(
      studentsMatched.map(async (student) => {
        // Construct statusUpdate
        const statusUpdate = {
          StudentID: student.StudentID,
          PreviousStatusID: currentStatus.StatusID,
          NextStatusID: nextStatus.StatusID,
          UpdatedBy: "IRRCAdmin",
        };
        await statusUpdates.addStatusUpdate(statusUpdate);
      })
    );
  }
  // Delete match
  await db.Match.query().delete().where(field, id);
};

// Req body should include TeacherID
router.post("/unmatch-teacher", async (req, res) => {
  const body = req.body;
  // Change all students' statuses for a given teacher
  await deleteMatches({
    field: "TeacherID",
    id: body.TeacherID,
    nextStatusString: body.NextStatusString,
    res,
  });
  return res.status(200).json("successful");
});

// Delete student-teacher (1:1) match when you cilck Unmatch/Dropped Out from a student profile
router.post("/unmatch-student", async (req, res) => {
  // Check if student:teacher is 1:1. if teacher only has one student, then the teacher's status must also be changed.
  // If a student is not the teacher's only student, the teacher's status will not change.
  const body = req.body;
  await deleteMatches({
    field: "StudentID",
    id: body.StudentID,
    nextStatusString: body.NextStatusString,
    res,
  });
  return res.json(200, "successful");
});

// Patch status: Pass Match ID and MatchStatus.
router.patch("/:id/:status?", async (req, res) => {
  // e.g. status/2/. full api URL is api/matches/2
  // If no status passed, status will be active. Status is optional.
  const status = req.params.status || "Active";
  const id = req.params.id;
  await matches.patchMatchStatus(id, status);
  return res.json(200, "successful");
});

module.exports = router;
