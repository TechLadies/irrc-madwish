const db = require("../models/match");
// const debug = require('debug')('app:students')

exports.getAllMatches = async function () {
  let query = db.Match.query().withGraphJoined(
    "[student, teacher, studentStatusUpdate]"
  );

  try {
    const matches = await query.select();
    return matches;
  } catch (err) {
    return { err };
  }
};

exports.patchMatchStatus = async function (MatchID, MatchStatus) {
  // Find entries based on MatchID
  try {
    let query = await db.Match.query()
      .findById(MatchID)
      .patch(
        {
           MatchStatus: MatchStatus,
           ConfirmedDate: new Date()
        }
      );
    return query;
  } catch (err) {
    return { err };
  }
};
