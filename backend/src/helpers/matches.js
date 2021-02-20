const db = require('../models/match')
// const debug = require('debug')('app:students')

exports.getAllMatches = async function () {
  let query = db.Match.query().withGraphJoined('[student, teacher, studentStatusUpdate]')
  
  try {
    const matches = await query.select()
    return matches
  } catch (err) {
    return { err }
  }
}
