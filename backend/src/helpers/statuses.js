const db = require('../models/status')

exports.getStatusByStatusString = async function (statusString) {
  try {
    const response = await db.Status.query()
      .select()
      .where('Description', 'ilike', statusString)
    return response
  } catch (err) {
    return { err }
  }
}
