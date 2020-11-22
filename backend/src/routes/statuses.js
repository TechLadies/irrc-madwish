const express = require('express')
const router = express.Router()
const statuses = require('../helpers/statuses')

/* GET status by statusString. */
router.get('/:statusString', async (req, res) => {
  const status = await statuses.getStatusByStatusString(req.params.statusString)
  res.json(status)
})

module.exports = router
