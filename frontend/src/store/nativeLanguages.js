import { getAuthHeaders, handleResponse } from "../helpers/auth";

const MUTATIONS = Object.freeze({
  SET_NATIVE_LANGUAGES: "SET_NATIVE_LANGUAGES",
});
export const nativeLanguageState = { nativeLanguages: [] };
export const nativeLanguageActions = {
  async getNativeLanguages({ commit }) {
    const response = await fetch("/api/nativeLanguages", {
      headers: {
        ...getAuthHeaders(),
      },
    });
    handleResponse(response);
    const languageData = await response.json();
    commit(MUTATIONS.SET_NATIVE_LANGUAGES, languageData);
  },
};
export const nativeLanguageMutations = {
  [MUTATIONS.SET_NATIVE_LANGUAGES](state, languageData) {
    state.nativeLanguages = languageData;
  },
};
export const nativeLanguageGetters = {
  API_nativeLanguage(state) {
    return state.nativeLanguages;
  },
};
