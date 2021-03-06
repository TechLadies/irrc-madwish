const db = require("../models/status");

exports.getStatusByStatusString = async function (statusString) {
  try {
    const response = await db.Status.query().findOne(
      "Description",
      "ilike",
      statusString
    );
    return response;
  } catch (err) {
    return { err };
  }
};

exports.getStatusPromise = async function (statusString) {
  if (statusString != null) {
    // If request contains StatusString, return corresponding StatusID
    return statuses.getStatusByStatusString(statusString);
  } else {
    // If StatusID and StatusString are both not provided, default to 'SCREENING' StatusID
    return statuses.getStatusByStatusString("SCREENING");
  }
};
