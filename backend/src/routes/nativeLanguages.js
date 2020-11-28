
const express = require('express')
const router = express.Router()
// const debug = require('debug')('app:nativeLanguages')
const db = require('../models/index')
const nativeLanguages = require('../helpers/nativeLanguages')

const { UniqueViolationError } = require('objection')

/* GET nativeLanguages listing. */
router.get('/', async (req, res) => {
  const nativeLanguages = await db.NativeLanguage.query().select('NativeLanguageID', 'NativeLanguage')
  res.json(nativeLanguages)
})

/* POST nativeLanguages listing */
router.post('/', async (req, res) => {
  req.body.NativeLanguage = req.body.NativeLanguage.toUpperCase()
  const result = await nativeLanguages.addNativeLanguage(req.body)

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
