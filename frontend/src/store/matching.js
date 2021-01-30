const MUTATIONS = Object.freeze({
    SET_SUCCESS: 'SET_SUCCESS'
  })
export const matchingState = {matchingSuccess: false} 
export const matchingActions = {
    // Update student status from UNMATCHED to MATCHED
    async patchUnmatchedStudents({commit}, data){
        const patchUnmatched = {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }
        //TODO create matching endpoint
        const response = await fetch("/api/matching", patchUnmatched)
        const result = await response.json()
        if (response.status === 200){
            commit(MUTATIONS.SET_SUCCESS, true)  
        }
    }
} 
export const matchingMutations = {
    [MUTATIONS.SET_SUCCESS](state, data){
        state.matchingSuccess = data 
    }
} 
