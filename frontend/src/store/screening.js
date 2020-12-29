const MUTATIONS = Object.freeze({
    SET_SUCCESS: 'SET_SUCCESS'
  })
export const screeningState = {screeningSuccess: false} 
export const screeningActions = {
    async patchScreeningStudents({commit}, data){
        const patchScreening = {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }
        const response = await fetch("/api/screening", patchScreening)
        const result = await response.json()
        if (response.status === 200){
            commit(MUTATIONS.SET_SUCCESS, true)  
        }
    }
} 
export const screeningMutations = {
    [MUTATIONS.SET_SUCCESS](state, data){
        state.screeningSuccess = data 
    }
} 
