const express = require("express");
const router = express.Router();
const statuses = require("../helpers/statuses");
const nativeLanguages = require("../helpers/nativeLanguages");
const teachers = require("../helpers/teachers");

const { UniqueViolationError, NotFoundError } = require("objection");
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
  if (Array.isArray(req.body)) {
    async function processLanguageStrings(array) {
      var languageSet = new Set(
        array.map((teacher) => {
          if (
            teacher.NativeLanguageString &&
            teacher.NativeLanguageString != undefined
          ) {
            return teacher.NativeLanguageString.toUpperCase();
          }
        })
      );
      array.forEach((teacher) => {
        if (
          teacher.SecondLanguageString &&
          teacher.SecondLanguageString != undefined
        ) {
          languageSet.add(teacher.SecondLanguageString.toUpperCase());
        }
      });

      languageSet = Array.from(languageSet);
      const result = Promise.all(
        await languageSet.map(async (nativeLanguageString) => {
          if (nativeLanguageString != undefined) {
            const nativeLanguage = await nativeLanguages.getNativeLanguagePromise(
              nativeLanguageString
            );
            console.log(nativeLanguage);

            array.map((teacher) => {
              if (teacher.NativeLanguageString) {
                if (
                  teacher.NativeLanguageString.toUpperCase() ===
                  nativeLanguage.NativeLanguage.toUpperCase()
                ) {
                  teacher.NativeLanguageID = nativeLanguage.NativeLanguageID;
                  delete teacher.NativeLanguageString;
                }
              }
              if (teacher.SecondLanguageString) {
                if (
                  teacher.SecondLanguageString.toUpperCase() ===
                  nativeLanguage.NativeLanguage.toUpperCase()
                ) {
                  teacher.SecondLanguageID = nativeLanguage.NativeLanguageID;
                  delete teacher.SecondLanguageString;
                }
              }
            });
          }
          return array;
        })
      );
      return result;
    }
    // Process all the NativeLanguageStrings and SecondLanguageStrings
    const processedArray = await processLanguageStrings(req.body);
    const result = await Promise.all(
      processedArray[0].map(async (teacher) => {
        Object.keys(teacher).forEach(
          (k) => !teacher[k] && teacher[k] !== undefined && delete teacher[k]
        );
        return await addSingleTeacher(teacher);
      })
    );
    console.log(result);

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
    const result = await addSingleTeacher(req.body);

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

  async function addSingleTeacher(teacher) {
    // If request does not contain StatusID
    if (teacher.StatusID == null) {
      let statusString = "UNMATCHED";
      // If request contains a statusString
      if (teacher.StatusString != null) {
        statusString = teacher.StatusString;
        delete teacher.StatusString;
      }
      const status = await statuses.getStatusPromise(statusString);
      teacher.StatusID = status.StatusID;
    }

    // If request does not contain NativeLanguageID
    try {
      if (teacher.NativeLanguageID == null) {
        let nativeLanguageString;
        // If request contains a NativeLanguageString
        if (teacher.NativeLanguageString != null) {
          nativeLanguageString = teacher.NativeLanguageString;
          delete teacher.NativeLanguageString;
        }
        const nativeLanguage = await nativeLanguages.getNativeLanguagePromise(
          nativeLanguageString
        );
        teacher.NativeLanguageID = nativeLanguage.NativeLanguageID;
      }
    } catch (err) {
      return res.status(400).send({
        message: err.message,
        type: "MissingParams",
        data: {},
      });
    }

    // second language
    try {
      if (teacher.SecondLanguageID == null) {
        let secondLanguageString;
        // If request contains a SecondLanguageString
        if (teacher.SecondLanguageString != null) {
          secondLanguageString = teacher.SecondLanguageString;
          delete teacher.SecondLanguageString;
          const secondLanguage = await nativeLanguages.getNativeLanguagePromise(
            secondLanguageString
          );
          teacher.SecondLanguageID = secondLanguage.NativeLanguageID;
        }
      }
    } catch (err) {
      return res.status(400).send({
        message: err.message,
        type: "MissingParams",
        data: {},
      });
    }

    const result = await teachers.addTeacher(teacher);
    return result;
  }
});

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

  if (req.body.SecondLanguageString) {
    try {
      const secondLanguage = await nativeLanguages.getNativeLanguagePromise(
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
