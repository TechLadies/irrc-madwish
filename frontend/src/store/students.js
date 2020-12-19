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
} 






export const studentMutations = {
    [MUTATIONS.SET_STUDENTS](state, students){
        state.students = students
    }
} 
export const studentGetters = {
    students: (state) => state.students
} 

