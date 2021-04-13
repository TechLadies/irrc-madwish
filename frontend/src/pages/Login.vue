<template>
  <div class="container">
    <b-notification
      v-if="reason"
      type="is-info"
      has-icon
      @close="handleLogoutReasonClose"
    >
      {{ reason }}
    </b-notification>
    <form class="login-form" method="POST" @submit.prevent="handleLogin">
      <b-field label="Username">
        <b-input v-model="username" name="Username" expanded></b-input>
      </b-field>
      <b-field label="Password">
        <b-input
          v-model="password"
          name="Password"
          type="password"
          expanded
        ></b-input>
      </b-field>
      <b-button
        expanded
        class="login-btn"
        @click="handleLogin"
        :loading="authLoadingStatus"
      >
        Login
      </b-button>
    </form>
    <b-notification v-if="hasError" type="is-danger" has-icon role="alert">
      {{ hasError }}
    </b-notification>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      username: "",
      password: "",
      reason: "",
    };
  },
  mounted() {
    if (this.isLoggedIn) {
      const defaultPath = "/students";
      const fromPath = this.$route.query.return;
      this.$router.push(fromPath || defaultPath);
      return;
    }
    const query = this.$route.query || {};
    const reason = query.reason;
    switch (reason) {
      case "expired":
        this.reason =
          "You were logged out because your session expired. Please login again";
        break;
      default:
      // no-op
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn", "authLoadingStatus", "hasError"]),
  },
  methods: {
    ...mapActions(["login"]),
    handleLogin() {
      this.login({
        username: this.username,
        password: this.password,
      });
    },
    handleLogoutReasonClose() {
      const { reason, ...queries } = this.$route.query;
      this.$router.replace({
        ...this.$router.currentRoute,
        query: queries,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
}

.login-form {
  margin-bottom: 24px;
  max-width: 80%;
  width: 300px;
}

.login-btn {
  background-color: #3c4f76;
  color: white;
  &:hover,
  &:active,
  &:focus {
    color: white;
  }
}
</style>
