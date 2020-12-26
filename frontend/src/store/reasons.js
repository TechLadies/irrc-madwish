const MUTATIONS = Object.freeze({
    SET_DROPPED_REASONS: 'SET_DROPPED_REASONS',
    SET_UNMATCHED_REASONS: 'SET_UNMATCHED_REASONS'
  })
export const reasonState = {droppedReasons: [], unmatchedReasons: []} 
export const reasonActions = {
    async getDroppedReasons({commit}){
        const response = await fetch("/api/reasons/DROPPED")
        const reasonData = await response.json()
        const parsedReasonData = reasonData.map((reason) => {
            return {
                Reason: `${reason.Reason}`.replace("DROPPED_", ""),
                ReasonID: `${reason.ReasonID}`
            };
          });
        commit(MUTATIONS.SET_DROPPED_REASONS, parsedReasonData)        
    },
    async getUnmatchedReasons({commit}){
        const response = await fetch("/api/reasons/UNMATCHED")
        const reasonData = await response.json()
        const parsedReasonData = reasonData.map((reason) => {
            return {
                Reason: `${reason.Reason}`.replace("UNMATCHED_", ""),
                ReasonID: `${reason.ReasonID}`
            };
          });
        commit(MUTATIONS.SET_UNMATCHED_REASONS, parsedReasonData)        
    }

} 
export const reasonMutations = {
    [MUTATIONS.SET_DROPPED_REASONS](state, reasonData){
        state.droppedReasons = reasonData
    },
    [MUTATIONS.SET_UNMATCHED_REASONS](state, reasonData){
        state.unmatchedReasons = reasonData
    }
} 
export const reasonGetters = {
    API_droppedReason(state){
        return state.droppedReasons
    },
    API_unmatchedReason(state){
        return state.unmatchedReasons
    }
} 

