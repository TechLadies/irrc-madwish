<template>
  <secure v-if="isLoggedIn && loginEnabled"></secure>
  <secure v-else-if="!loginEnabled"></secure>
  <public v-else></public>
</template>

<script>
import { mapGetters } from "vuex";
import Secure from "./layouts/Secure.vue";
import Public from "./layouts/Public.vue";

export default {
  name: "App",
  components: {
    Secure,
    Public,
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    loginEnabled() {
      return Boolean(IRRC_LOGIN_ENABLED);
    },
  },
};
</script>
