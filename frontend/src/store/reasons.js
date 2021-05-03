import { getAuthHeaders, handleResponse } from "../helpers/auth";

const MUTATIONS = Object.freeze({
  SET_DROPPED_REASONS: "SET_DROPPED_REASONS",
  SET_UNMATCHED_REASONS: "SET_UNMATCHED_REASONS",
});
export const reasonState = { droppedReasons: [], unmatchedReasons: [] };
export const reasonActions = {
  async getDroppedReasons({ commit }) {
    const response = await fetch("/api/reasons/DROPPED", {
      headers: {
        ...getAuthHeaders(),
      },
    });
    handleResponse(response);
    const reasonData = await response.json();
    const parsedReasonData = reasonData.map((reason) => {
      return {
        Reason: `${reason.Reason}`.replace("DROPPED_", ""),
        ReasonID: `${reason.ReasonID}`,
      };
    });
    commit(MUTATIONS.SET_DROPPED_REASONS, parsedReasonData);
  },
  async getUnmatchedReasons({ commit }) {
    const response = await fetch("/api/reasons/UNMATCHED", {
      headers: {
        ...getAuthHeaders(),
      },
    });
    handleResponse(response);
    const reasonData = await response.json();
    const parsedReasonData = reasonData.map((reason) => {
      return {
        Reason: `${reason.Reason}`.replace("UNMATCHED_", ""),
        ReasonID: `${reason.ReasonID}`,
      };
    });
    commit(MUTATIONS.SET_UNMATCHED_REASONS, parsedReasonData);
  },
  async addDroppedReason({ commit, dispatch }, reason) {
    // POST new DROPPED_ reason
    const reasonRequestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify({
        Reason: "DROPPED_".concat(reason.toString()),
      }),
    };

    fetch("/api/reasons/", reasonRequestOptions).then((response) => {
      handleResponse(response);
      // If PATCH fails, return
      if (response.status !== 200) {
        console.log(response);
        return;
      }
      dispatch("getDroppedReasons");
      dispatch("getAllStudents");
    });
  },
  async addUnmatchedReason({ commit, dispatch }, reason) {
    // POST new UNMATCHED_ reason
    const reasonRequestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify({
        Reason: "UNMATCHED_".concat(reason.toString()),
      }),
    };

    fetch("/api/reasons/", reasonRequestOptions).then((response) => {
      handleResponse(response);
      // If PATCH fails, return
      if (response.status !== 200) {
        console.log(response);
        return;
      }
      dispatch("getUnmatchedReasons");
    });
  },
};
export const reasonMutations = {
  [MUTATIONS.SET_DROPPED_REASONS](state, reasonData) {
    state.droppedReasons = reasonData;
  },
  [MUTATIONS.SET_UNMATCHED_REASONS](state, reasonData) {
    state.unmatchedReasons = reasonData;
  },
};
export const reasonGetters = {
  API_droppedReason(state) {
    return state.droppedReasons;
  },
  API_unmatchedReason(state) {
    return state.unmatchedReasons;
  },
};
