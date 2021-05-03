import { getAuthHeaders, handleResponse } from "../helpers/auth";

const MUTATIONS = Object.freeze({
  SET_STUDENTS: "SET_STUDENTS",
  SET_UPDATE_STUDENT_SUCCESS: "SET_UPDATE_STUDENT_SUCCESS",
});

export const studentState = { students: [], updateStudentSuccess: undefined };
export const studentActions = {
  async getAllStudents({ commit }) {
    try {
      const response = await fetch("/api/students", {
        headers: {
          ...getAuthHeaders(),
        },
      });
      handleResponse(response);
      const studentData = await response.json();
      commit(MUTATIONS.SET_STUDENTS, studentData);
    } catch (e) {
      // no-op
    }
  },

  async createStudent({ dispatch }, studentData) {
    const payload = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(studentData),
    };
    const response = await fetch("/api/students", payload);
    handleResponse(response);
    dispatch("getAllStudents");
    dispatch("getNativeLanguages");
    if (response.status < 400) {
      return response;
    } else {
      throw new Error(response);
    }
  },

  // PATCH Student Data to backend
  async patchStudent({ dispatch, commit }, studentData) {
    const patchStudent = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(studentData),
    };
    const response = await fetch(
      `/api/students/${studentData.StudentID}`,
      patchStudent
    );
    handleResponse(response);
    if (response.status === 200) {
      dispatch("getAllStudents");
      commit("SET_UPDATE_STUDENT_SUCCESS", true);
    } else {
      commit("SET_UPDATE_STUDENT_SUCCESS", false);
    }
  },
  resetUpdateStudentSuccess({ commit }, value) {
    commit(MUTATIONS.SET_UPDATE_STUDENT_SUCCESS, value);
  },
  // Update student status
  updateStudentStatus(
    { dispatch },
    { studentID, previousStatusString, nextStatusString, updatedBy, reason }
  ) {
    // POST statusUpdate. Note that the POST statusUpdate endpoint also patches the student status
    // behind-the-scenes.
    const statusUpdateRequestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify({
        StudentID: parseInt(studentID),
        PreviousStatusString: previousStatusString,
        NextStatusString: nextStatusString,
        UpdatedBy: updatedBy,
        ReasonString: reason,
      }),
    };

    return fetch("/api/statusUpdates", statusUpdateRequestOptions)
      .then((response) => {
        handleResponse(response);
        if (response.status !== 200) {
          throw new Error(response);
        }
        dispatch("getAllStudents");

        if (
          previousStatusString === "MATCHED" &&
          (nextStatusString === "UNMATCHED" ||
            nextStatusString === "DROPPED OUT")
        ) {
          dispatch("unmatchStudent", {
            studentID: parseInt(studentID),
            nextStatusString,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },
  async unmatchStudent({ dispatch }, { studentID, nextStatusString }) {
    // Calls deletion API to delete matches if moving from MATCHED -> UNMATCHED/DROPPED OUT
    const response = await fetch("/api/matches/unmatch-student", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify({
        StudentID: studentID,
        NextStatusString: nextStatusString,
      }),
    });
    handleResponse(response);
    dispatch("getAllMatches");
  },

  // Update student English proficiency
  async updateStudentEnglishProficiency(
    { dispatch },
    { studentID, englishProficiency }
  ) {
    if (!englishProficiency) return;

    // PATCH student
    const studentRequestOptions = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify({
        StudentID: studentID,
        EnglishProficiency: englishProficiency,
      }),
    };

    fetch("/api/students/" + studentID, studentRequestOptions).then(
      (response) => {
        handleResponse(response);
        // If PATCH fails, return
        if (response.status !== 200) {
          console.log(response);
          return;
        }
        dispatch("getAllStudents");
      }
    );
  },
};
export const studentMutations = {
  [MUTATIONS.SET_STUDENTS](state, students) {
    state.students = students;
  },
  [MUTATIONS.SET_UPDATE_STUDENT_SUCCESS](state, value) {
    // sets updateStudentSuccess to true
    state.updateStudentSuccess = value;
  },
};
export const studentGetters = {
  students: (state) => state.students,
  getStudentByStudentId: (state) => (id) =>
    state.students.find((student) => student.StudentID == id),
  screeningStudents: (state) =>
    state.students.filter(
      (student) => student.status.Description === "SCREENING"
    ),
  unmatchedStudents: (state) =>
    state.students.filter(
      (student) => student.status.Description === "UNMATCHED"
    ),
};
