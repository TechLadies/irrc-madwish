const express = require('express')
const router = express.Router()

const students = require('../helpers/students')
const teachers = require('../helpers/teachers')

const { UniqueViolationError } = require('objection')

/* POST teachers listing */
router.post('/', async (req, res) => {
  // If request does not contain StatusID
  if (req.body.StatusID == null) {
    let statusString = 'UNMATCHED'
    // If request contains a statusString
    if (req.body.StatusString != null) {
      statusString = req.body.StatusString
      delete req.body.StatusString
    }
    const status = await students.getStatusPromise(statusString)
    req.body.StatusID = status.StatusID
  }

  // If request does not contain NativeLanguageID
  try {
    if (req.body.NativeLanguageID == null) {
      let nativeLanguageString
      // If request contains a nativeLanguageString
      if (req.body.NativeLanguageString != null) {
        nativeLanguageString = req.body.NativeLanguageString
        delete req.body.NativeLanguageString
      }
      const nativeLanguage = await students.getNativeLanguagePromise(
        nativeLanguageString
      )
      req.body.NativeLanguageID = nativeLanguage.NativeLanguageID
    }
  } catch (err) {
    res.status(400).send({
      message: err.message,
      type: 'MissingParams',
      data: {}
    })
  }

  // second language
  try {
    if (req.body.SecondLanguageID == null) {
      let secondLanguageString
      // If request contains a nativeLanguageString
      if (req.body.SecondLanguageString != null) {
        secondLanguageString = req.body.SecondLanguageString
        delete req.body.SecondLanguageString
        const secondLanguage = await students.getNativeLanguagePromise(
          secondLanguageString
        )
        req.body.SecondLanguageID = secondLanguage.NativeLanguageID
      }
    }
  } catch (err) {
    res.status(400).send({
      message: err.message,
      type: 'MissingParams',
      data: {}
    })
  }

  const result = await teachers.addTeacher(req.body)

  // handle error
  if (result.err) {
    const err = result.err
    if (err instanceof UniqueViolationError) {
      res.status(409).send({
        message: err.message,
        type: 'UniqueViolation',
        data: {
          columns: err.columns,
          table: err.table,
          constraint: err.constraint
        }
      })
    } else {
      res.status(500).send({
        message: err.message,
        type: 'UnknownError',
        data: {}
      })
    }

    return
  }

  res.status(200).json(result)
})

module.exports = router
