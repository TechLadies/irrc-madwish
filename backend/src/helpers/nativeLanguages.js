const db = require("../models/nativeLanguage");
const { get } = require("../routes/teachers");

const addNativeLanguage = async function (nativeLanguage) {
  try {
    const response = await db.NativeLanguage.query().insert(nativeLanguage);
    return response;
  } catch (err) {
    return { err };
  }
};
exports.addNativeLanguage = addNativeLanguage;

const getNativeLanguageByString = async function (nativeLanguageString) {
  try {
    const response = await db.NativeLanguage.query().findOne(
      "NativeLanguage",
      "ilike",
      nativeLanguageString
    );
    return response;
  } catch (err) {
    return { err };
  }
};
exports.getNativeLanguageByString = getNativeLanguageByString;

exports.getNativeLanguagePromise = async function (nativeLanguageString) {
  if (nativeLanguageString != null) {
    const nativeLanguageResponse = await getNativeLanguageByString(
      nativeLanguageString
    );
    if (nativeLanguageResponse && !nativeLanguageResponse.err) {
      return nativeLanguageResponse;
    } else if (!nativeLanguageResponse) {
      const newNativeLanguage = await addNativeLanguage({
        NativeLanguage: nativeLanguageString.toUpperCase(),
      });
      return newNativeLanguage;
    } else {
      throw nativeLanguageResponse.err;
    }
  } else {
    // If NativeLanguage is empty, will throw an error
    throw new Error("NativeLanguageString or NativeLanguageID is required");
  }
};
