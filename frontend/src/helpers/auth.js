import store from "../store";
import router from "../router";

export function getAuthHeaders() {
  if (Boolean(window.IRRC_LOGIN_ENABLED)) {
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
