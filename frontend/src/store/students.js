const MUTATIONS = Object.freeze({
    SET_STUDENTS: 'SET_STUDENTS',
    SET_UPDATE_STUDENT_SUCCESS: 'SET_UPDATE_STUDENT_SUCCESS'
  })


export const studentState = {students: [], updateStudentSuccess: false} 
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
    async patchStudent({dispatch, commit}, studentData){
        const patchStudent = {
            method: "PATCH",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              studentData 
            )
          }
        const response = await fetch(`/api/students/${studentData.StudentID}`, patchStudent)
        if(response.status === 200){
            dispatch("getAllStudents")
            commit('SET_UPDATE_STUDENT_SUCCESS', true)
        }
    

    }
   
} 
export const studentMutations = {
    [MUTATIONS.SET_STUDENTS](state, students){
        state.students = students
    },
    [MUTATIONS.SET_UPDATE_STUDENT_SUCCESS](state, value){
        // sets updateStudentSuccess to true
        state.updateStudentSuccess = value
        console.log(state.updateStudentSuccess)
    }
} 
export const studentGetters = {
    students: (state) => state.students

} 

