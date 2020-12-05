const db = require('../models/nativeLanguage')

exports.addNativeLanguage = async function (nativeLanguage) {
  try {
    const response = await db.NativeLanguage.query().insert(nativeLanguage)
    return response
  } catch (err) {
    return { err }
  }
}

exports.getNativeLanguageByString = async function (nativeLanguageString) {
  try {
    const response = await db.NativeLanguage.query().findOne('NativeLanguage', 'ilike', nativeLanguageString)
    return response
  } catch (err) {
    return {err}
  }
}