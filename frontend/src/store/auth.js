import router from "../router";

const MUTATIONS = Object.freeze({
  SET_TOKEN: "SET_TOKEN",
  SET_ERROR: "SET_ERROR",
  SET_LOADING: "SET_LOADING",
  SET_LOGOUT_REASON: "SET_LOGOUT_REASON",
});

export const authState = {
  token: "",
  authError: "",
  authLoading: false,
  logoutReason: "",
};

export const authActions = {
  async login({ commit }, credentials) {
    commit(MUTATIONS.SET_ERROR, "");
    commit(MUTATIONS.SET_LOADING, true);
    commit(MUTATIONS.SET_LOGOUT_REASON, "");
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Username: credentials.username,
        Password: credentials.password,
      }),
    };
    const response = await fetch("/api/users/login", config);
    if (response.status === 401) {
      commit(
        MUTATIONS.SET_ERROR,
        "Your credentials are incorrect, please try again."
      );
    } else if (response.status !== 200) {
      commit(MUTATIONS.SET_ERROR, "Something went wrong, please try again.");
    } else {
      const data = await response.json();
      const token = data.token;
      commit(MUTATIONS.SET_ERROR, "");
      commit(MUTATIONS.SET_TOKEN, token);
    }
    commit(MUTATIONS.SET_LOADING, false);
  },
  logout({ commit }, reason) {
    commit(MUTATIONS.SET_LOGOUT_REASON, reason);
    commit(MUTATIONS.SET_TOKEN, "");

    // Reload the route to trigger route guards
    if (reason) {
      router.replace({
        path: router.history.current.path,
        params: router.history.current.params,
        query: {
          ...router.history.current.query,
          reason,
        },
      });
    } else {
      router.go();
    }
  },
};

export const authMutations = {
  [MUTATIONS.SET_TOKEN](state, token) {
    state.token = token;
  },
  [MUTATIONS.SET_ERROR](state, error) {
    state.authError = error;
  },
  [MUTATIONS.SET_LOADING](state, isLoading) {
    state.authLoading = isLoading;
  },
  [MUTATIONS.SET_LOGOUT_REASON](state, reason) {
    state.logoutReason = reason;
  },
};

export const authGetters = {
  isLoggedIn(state) {
    return !!state.token;
  },
  authLoadingStatus(state) {
    return state.authLoading;
  },
  hasError(state) {
    return state.authError;
  },
};
