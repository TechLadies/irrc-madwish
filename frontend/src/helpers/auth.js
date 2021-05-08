import store from "../store";

export function getAuthHeaders() {
  if (Boolean(IRRC_LOGIN_ENABLED)) {
    return {
      Authorization: `Bearer ${store.state.token}`,
    };
  } else {
    return {};
  }
}

export function handleResponse(response) {
  if (response.status === 401) {
    store.dispatch("logout", "expired");
  }
}
