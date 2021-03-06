const MUTATIONS = Object.freeze({
    SET_MATCHES: 'SET_MATCHES',
  })


export const matchesState = {matches: []} 
export const matchesActions = {
    async getAllMatches({commit}){
        const response = await fetch("/api/matches")
        const matchesData = await response.json()
        commit(MUTATIONS.SET_MATCHES, matchesData)        
    },
}

export const matchesMutations = {
    [MUTATIONS.SET_MATCHES](state, matches){
        state.matches = matches;
    },
}

export const matchesGetters = {
    matches(state) {
        return state.matches
    }
} 

