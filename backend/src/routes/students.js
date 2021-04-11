const express = require("express");
const router = express.Router();
// const debug = require('debug')('app:students')
const nativeLanguages = require("../helpers/nativeLanguages");
const students = require("../helpers/students");
const statuses = require("../helpers/statuses");

const { UniqueViolationError } = require("objection");
const { NotFoundError } = require("objection");

/* GET students listing. */
router.get("/", async (req, res) => {
  const status = req.query.status;
  const result = await students.getAllStudents({
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

/* GET student by ID */
router.get("/:id", async (req, res) => {
  const result = await students.getStudentById(req.params.id);
  //  console.log(result.err)

  // handle error
  if (result.err) {
    const err = result.err;
    if (err instanceof NotFoundError) {
      res.status(409).send({
        message: err.message,
        type: "StudentNotFound",
        data: {},
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

  res.json(result);
});

/* POST students listing */
router.post("/", async (req, res) => {
  if (Array.isArray(req.body)) {
    // First process all the NativeLanguageStrings
    async function processNativeLanguageStrings(array) {
      var languageSet = new Set(
        array.map((student) => {
          if (student.NativeLanguageString != undefined) {
            return student.NativeLanguageString.toUpperCase();
          }
        })
      );
      languageSet = Array.from(languageSet);
      const result = Promise.all(
        await languageSet.map(async (nativeLanguageString) => {
          if (nativeLanguageString != undefined) {
            const nativeLanguage = await nativeLanguages.getNativeLanguagePromise(
              nativeLanguageString
            );

            array.map((student) => {
              if (student.NativeLanguageString) {
                if (
                  student.NativeLanguageString.toUpperCase() ===
                  nativeLanguage.NativeLanguage.toUpperCase()
                ) {
                  student.NativeLanguageID = nativeLanguage.NativeLanguageID;
                  delete student.NativeLanguageString;
                }
              }
            });
          }
          return array;
        })
      );
      return result;
    }

    const processedArray = await processNativeLanguageStrings(req.body);
    const result = await Promise.all(
      processedArray[0].map(async (student) => {
        console.log(student);
        return await addSingleStudent(student);
      })
    );

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
  } else {
    const result = await addSingleStudent(req.body);

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
  }

  async function addSingleStudent(student) {
    // If EnglishProficiency is empty
    if (!student.EnglishProficiency || student.EnglishProficiency === "") {
      delete student.EnglishProficiency;
    }

    try {
      // If request does not contain NativeLanguageID but contains a nativeLanguageString
      if (
        student.NativeLanguageID == null &&
        student.NativeLanguageString != null
      ) {
        const nativeLanguageString = student.NativeLanguageString;
        delete student.NativeLanguageString;
        const nativeLanguage = await nativeLanguages.getNativeLanguagePromise(
          nativeLanguageString
        );
        student.NativeLanguageID = nativeLanguage.NativeLanguageID;
      }
    } catch (err) {
      console.log("nativeLanguage err");
      res.status(400).send({
        message: err.message,
        type: "MissingParams",
        data: {},
      });
    }

    // If request does not contain StatusID
    if (student.StatusID == null) {
      // If request contains a statusString
      if (student.StatusString != null) {
        const statusString = student.StatusString;
        delete student.StatusString;
        const status = await statuses.getStatusPromise(statusString);
        student.StatusID = status.StatusID;
      } else {
        const status = await statuses.getStatusPromise(null);
        student.StatusID = status.StatusID;
      }
    }
    const result = await students.addStudent(student);
    return result;
  }
});

/* PATCH student listing */
// on Postman: http://localhost:3001/students/1
router.patch("/:id", async (req, res) => {
  if (req.body.NativeLanguageString) {
    try {
      const nativeLanguage = await nativeLanguages.getNativeLanguagePromise(
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
  // If EnglishProficiency is empty, delete it from the request body
  if (!req.body.EnglishProficiency || req.body.EnglishProficiency === "") {
    delete req.body.EnglishProficiency;
  }
  // If request does not contain StatusID and contains a StatusString
  if (req.body.StatusID == null && req.body.StatusString != null) {
    const statusString = req.body.StatusString;
    delete req.body.StatusString;
    const status = await statuses.getStatusByStatusString(statusString);
    req.body.StatusID = status.StatusID;
  }

  const result = await students.patchStudent(req.params.id, req.body);

  // handle error
  if (result.err) {
    const err = result.err;
    if (err instanceof NotFoundError) {
      res.status(409).send({
        message: err.message,
        type: "StudentNotFound",
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

/* GET status by StudentID */
router.get("/:id/status", async (req, res) => {
  const result = await students.getStatusByStudentId(req.params.id);
  // console.log(result.err)

  // if student not found
  if (result.length === 0) {
    res.status(409).send({
      message: "StudentNotFound",
      type: "StudentNotFound",
      data: {},
    });
    return;
  }

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

module.exports = router;
