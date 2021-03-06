const db = require("../models/nativeLanguage");

exports.addNativeLanguage = async function (nativeLanguage) {
  try {
    const response = await db.NativeLanguage.query().insert(nativeLanguage);
    return response;
  } catch (err) {
    return { err };
  }
};

exports.getNativeLanguageByString = async function (nativeLanguageString) {
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

exports.getNativeLanguagePromise = async function (nativeLanguageString) {
  if (nativeLanguageString != null) {
    const nativeLanguageResponse = await nativeLanguages.getNativeLanguageByString(
      nativeLanguageString
    );
    if (nativeLanguageResponse && !nativeLanguageResponse.err) {
      return nativeLanguageResponse;
    } else if (!nativeLanguageResponse) {
      const newNativeLanguage = await nativeLanguages.addNativeLanguage({
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
