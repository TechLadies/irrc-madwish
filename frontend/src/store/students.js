const MUTATIONS = Object.freeze({
    SET_STUDENTS: 'SET_STUDENTS'
  })



export const studentState = {students: []} 
export const studentActions = {
    async getAllStudents({commit}){
        const response = await fetch("/api/students")
        const studentData = await response.json()
        commit(MUTATIONS.SET_STUDENTS, studentData)        
    },

    async createStudent({dispatch}, studentData){
        const payload = {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
        }
        const response = await fetch("/api/students", payload)
        dispatch("getAllStudents")
        return response     
    },

    // Update student status
    async updateStudentStatus({ commit, dispatch }, { studentID, previousStatusString, nextStatusString, updatedBy, reason }) {
        // POST statusUpdate. Note that the POST statusUpdate endpoint also patches the student status
        // behind-the-scenes.
        const statusUpdateRequestOptions = {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            StudentID: studentID,
            PreviousStatusString: previousStatusString,
            NextStatusString: nextStatusString,
            UpdatedBy: updatedBy,
            ReasonString: reason
            })
        }

        fetch("/api/statusUpdates", statusUpdateRequestOptions)
        .then((response) => {
            if(response.status !== 200) {
                throw new Error(response);
            }
        })
        .then(() => {
            dispatch('getAllStudents')
        })
        .catch((err) => {
            console.error(err);
        });
    },

    // Update student English proficiency
    async updateStudentEnglishProficiency({ commit, dispatch }, { studentID, englishProficiency }) {

    if (!englishProficiency) return;

    // PATCH student
    const studentRequestOptions = {
        method: "PATCH",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({StudentID: studentID, EnglishProficiency: englishProficiency})
    }

    fetch("/api/students/" + studentID, studentRequestOptions)
        .then(response => {
            // If PATCH fails, return
            if(response.status !== 200) {
            console.log(response);
            return;
            }
            dispatch('getAllStudents')
        }
        )
    },
}

export const studentMutations = {
    [MUTATIONS.SET_STUDENTS](state, students){
        state.students = students
    }
} 
export const studentGetters = {
    students: (state) => state.students
} 

