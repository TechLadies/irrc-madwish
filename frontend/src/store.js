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
  matchingActions, 
  matchingState, 
  matchingMutations
} from "./store/matching.js";
import {
  reasonActions,
  reasonGetters,
  reasonMutations,
  reasonState
} from "./store/reasons.js";
import {
  matchesGetters,
  matchesActions,
  matchesMutations,
  matchesState
} from "./store/matches.js";

Vue.use(Vuex);

// Create enum style variables (to reduce typo errors)
const MUTATIONS = Object.freeze({
  SET_STUDENTS: "SET_STUDENTS",
  SET_TEACHERS: "SET_TEACHERS",
  SET_MATCHES: "SET_MATCHES",
});

export default new Vuex.Store({
  state: {
    ...studentState,
    ...nativeLanguageState,
    ...teacherState,
    ...screeningState,
    ...matchingState,
    ...reasonState,
    ...matchesState,
  },
  mutations: {
    ...studentMutations,
    ...nativeLanguageMutations,
    ...teacherMutations,
    ...screeningMutations,
    ...matchingMutations,
    ...reasonMutations,
    ...matchesMutations,
  },
  actions: {
    ...studentActions,
    ...nativeLanguageActions,
    ...teacherActions,
    ...screeningActions,
    ...matchingActions,
    ...reasonActions,
    ...matchesActions
  },
  getters: {
    ...studentGetters,
    ...nativeLanguageGetters,
    ...teacherGetters,
    ...reasonGetters,
    ...matchesGetters,
    screeningStudents: (state) => state.students.filter((student) => student.status.Description === "SCREENING"),
    unmatchedStudents: (state) => state.students.filter((student) => student.status.Description === "UNMATCHED"),
    getStudentByStudentId: (state) => (id) => state.students.find(student => student.StudentID == id),
    getTeacherByTeacherId: (state) => (id) => state.teachers.find(teacher => teacher.TeacherID == id)
  },
});
