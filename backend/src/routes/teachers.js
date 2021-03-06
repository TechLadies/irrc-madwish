const express = require("express");
const router = express.Router();

const statuses = require("../helpers/statuses");
const students = require("../helpers/students");
const teachers = require("../helpers/teachers");

const { UniqueViolationError } = require("objection");
const { NotFoundError } = require("objection");
const teacher = require("../models/teacher");

router.get("/", async (req, res) => {
  const status = req.query.status;
  const result = await teachers.getAllTeachers({
    filters: {
      status,
    },
  });

  // handle error
  if (result.err) {
    // console.log('entered result.err')
    const err = result.err;
    res.status(500).send({
      message: err.message,
      type: "UnknownError",
      data: {},
    });
    return;
  }

  res.json(result);
});

/* POST teachers listing */
router.post("/", async (req, res) => {
  // If request does not contain StatusID
  if (req.body.StatusID == null) {
    let statusString = "UNMATCHED";
    // If request contains a statusString
    if (req.body.StatusString != null) {
      statusString = req.body.StatusString;
      delete req.body.StatusString;
    }
    const status = await statuses.getStatusPromise(statusString);
    req.body.StatusID = status.StatusID;
  }

  // If request does not contain NativeLanguageID
  try {
    if (req.body.NativeLanguageID == null) {
      let nativeLanguageString;
      // If request contains a nativeLanguageString
      if (req.body.NativeLanguageString != null) {
        nativeLanguageString = req.body.NativeLanguageString;
        delete req.body.NativeLanguageString;
      }
      const nativeLanguage = await students.getNativeLanguagePromise(
        nativeLanguageString
      );
      req.body.NativeLanguageID = nativeLanguage.NativeLanguageID;
    }
  } catch (err) {
    res.status(400).send({
      message: err.message,
      type: "MissingParams",
      data: {},
    });
  }

  // second language
  try {
    if (req.body.SecondLanguageID == null) {
      let secondLanguageString;
      // If request contains a nativeLanguageString
      if (req.body.SecondLanguageString != null) {
        secondLanguageString = req.body.SecondLanguageString;
        delete req.body.SecondLanguageString;
        const secondLanguage = await students.getNativeLanguagePromise(
          secondLanguageString
        );
        req.body.SecondLanguageID = secondLanguage.NativeLanguageID;
      }
    }
  } catch (err) {
    res.status(400).send({
      message: err.message,
      type: "MissingParams",
      data: {},
    });
  }

  const result = await teachers.addTeacher(req.body);

  // handle error
  if (result.err) {
    const err = result.err;
    if (err instanceof UniqueViolationError) {
      res.status(409).send({
        message: err.message,
        type: "UniqueViolation",
        data: {
          columns: err.columns,
          table: err.table,
          constraint: err.constraint,
        },
      });
    } else {
      res.status(500).send({
        message: err.message,
        type: "UnknownError",
        data: {},
      });
    }

    return;
  }

  res.status(200).json(result);
});

router.patch("/:id", async (req, res) => {
  if (req.body.NativeLanguageString) {
    try {
      const nativeLanguage = await students.getNativeLanguagePromise(
        req.body.NativeLanguageString
      );
      req.body.NativeLanguageID = nativeLanguage.NativeLanguageID;
      delete req.body.NativeLanguageString;
    } catch (err) {
      return res.status(500).send({
        message: err.message,
        type: "UnknownError with NativeLanguage",
        data: {},
      });
    }
  }

  if (req.body.SecondLanguageString) {
    try {
      const secondLanguage = await students.getNativeLanguagePromise(
        req.body.SecondLanguageString
      );
      req.body.SecondLanguageID = secondLanguage.NativeLanguageID;
      delete req.body.SecondLanguageString;
    } catch (err) {
      return res.status(500).send({
        message: err.message,
        type: "UnknownError with SecondLanguage",
        data: {},
      });
    }
  }

  const result = await teachers.patchTeacher(req.params.id, req.body);

  // handle error
  if (result.err) {
    const err = result.err;
    if (err instanceof NotFoundError) {
      res.status(409).send({
        message: err.message,
        type: "TeacherNotFound",
        data: {},
      });
    } else {
      res.status(500).send({
        message: err.message,
        type: "UnknownError. Database contraints may be violated",
        data: {},
      });
    }

    return;
  }
  res.status(200).json(result);
});

module.exports = router;
