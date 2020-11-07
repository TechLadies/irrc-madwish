const db = require('../models/statusUpdate')

exports.addStatusUpdate = async function (statusUpdate) {
  try {
    const response = await db.StatusUpdate.query().insert(statusUpdate)
    return response
  } catch (err) {
    return { err }
  }
}
