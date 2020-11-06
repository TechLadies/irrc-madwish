
const express = require('express')
const router = express.Router()
const statusUpdates = require('../helpers/statusUpdates')

/* POST statusUpdates listing */
router.post('/', async (req, res) => {
  const result = await statusUpdates.addStatusUpdate(req.body)

  // handle error
  if (result.err) {
    const err = result.err
    res.status(500).send({
      message: err.message,
      type: 'UnknownError',
      data: {}
    })
    return
  }

  res.status(200).json(result)
})

module.exports = router
