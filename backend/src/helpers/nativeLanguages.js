const db = require('../models/nativeLanguage')

exports.addNativeLanguage = async function (nativeLanguage) {
  try {
    const response = await db.NativeLanguage.query().insert(nativeLanguage)
    return response
  } catch (err) {
    return { err }
  }
}
