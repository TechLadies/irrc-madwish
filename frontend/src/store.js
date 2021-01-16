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
  screeningMutations
} from "./store/screening.js";
import {
  studentActions,
  studentGetters,
  studentMutations,
  studentState
} from "./store/students.js";
import {
  reasonActions,
  reasonGetters,
  reasonMutations,
  reasonState
} from "./store/reasons.js";

Vue.use(Vuex);

// Create enum style variables (to reduce typo errors)
const MUTATIONS = Object.freeze({
  SET_STUDENTS: "SET_STUDENTS",
});

export default new Vuex.Store({
  state: {
    ...studentState,
    ...nativeLanguageState,
    ...teacherState,
    ...screeningState,
    ...reasonState
  },
  mutations: {
    ...studentMutations,
    ...nativeLanguageMutations,
    ...teacherMutations,
    ...screeningMutations,
    ...reasonMutations
  },
  actions: {
    ...studentActions,
    ...nativeLanguageActions,
    ...teacherActions,
    ...screeningActions,
    ...reasonActions
  },
  getters: {
    ...studentGetters,
    ...nativeLanguageGetters,
    ...teacherGetters,
    ...reasonGetters,
    screeningStudents: (state) => state.students.filter((student) => student.status.Description === "SCREENING"),
    getStudentByStudentId: (state) => (id) => state.students.find(student => student.StudentID == id)
  },
});
