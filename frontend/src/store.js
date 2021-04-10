import Vue from "vue";
import Vuex from "vuex";
import {
  nativeLanguageActions,
  nativeLanguageGetters,
  nativeLanguageMutations,
  nativeLanguageState,
} from "./store/nativeLanguages.js";
import {
  teacherActions,
  teacherMutations,
  teacherGetters,
  teacherState,
} from "./store/teachers.js";
import {
  screeningActions,
  screeningState,
  screeningMutations,
} from "./store/screening.js";
import {
  studentActions,
  studentGetters,
  studentMutations,
  studentState,
} from "./store/students.js";
import {
  matchingActions,
  matchingState,
  matchingMutations,
} from "./store/matching.js";
import {
  reasonActions,
  reasonGetters,
  reasonMutations,
  reasonState,
} from "./store/reasons.js";
import {
  matchesGetters,
  matchesActions,
  matchesMutations,
  matchesState,
} from "./store/matches.js";
import {
  authState,
  authActions,
  authGetters,
  authMutations,
} from "./store/auth.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ...studentState,
    ...nativeLanguageState,
    ...teacherState,
    ...screeningState,
    ...matchingState,
    ...reasonState,
    ...matchesState,
    ...authState,
  },
  mutations: {
    ...studentMutations,
    ...nativeLanguageMutations,
    ...teacherMutations,
    ...screeningMutations,
    ...matchingMutations,
    ...reasonMutations,
    ...matchesMutations,
    ...authMutations,
  },
  actions: {
    ...studentActions,
    ...nativeLanguageActions,
    ...teacherActions,
    ...screeningActions,
    ...matchingActions,
    ...reasonActions,
    ...matchesActions,
    ...authActions,
  },
  getters: {
    ...studentGetters,
    ...nativeLanguageGetters,
    ...teacherGetters,
    ...reasonGetters,
    ...matchesGetters,
    ...authGetters,
  },
});
