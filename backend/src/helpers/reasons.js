const db = require('../models/reason')

exports.addReason = async function (reason) {
  try {
    const response = await db.Reason.query().insert(reason)
    return response
  } catch (err) {
    return { err }
  }
}

exports.getReasonByString = async function (reasonString) {
  try {
    const response = await db.Reason.query().findOne('Reason', 'ilike', reasonString)
    return response
  } catch (err) {
    return { err }
  }
}

exports.getReasonPromise = async function (reasonString) {
  if (reasonString != null) {
    const reasonResponse = await exports.getReasonByString(
      reasonString
    )
    if (reasonResponse && !reasonResponse.err) {
      return reasonResponse
    } else if (!reasonResponse) {
      const newReason = await exports.addReason({
        Reason: reasonString.toUpperCase()
      })
      return newReason
    } else {
      throw reasonResponse.err
    }
  } else {
    // If Reason is empty, will throw an error
    throw new Error('ReasonString or ReasonID is required')
  }
}
