<template>
  <Sidebar :menu="menu" @createNew="createNew">
    <router-view></router-view>
  </Sidebar>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import { mapActions } from "vuex";

const status = [
  { id: 1, label: "Screening", to: "/screening", active: false },
  { id: 2, label: "Matching", to: "/matching", active: false },
  { id: 3, label: "Matched", to: "/matched", active: false },
];
const profiles = [
  { id: 4, label: "Students", to: "/students", active: false },
  { id: 5, label: "Teachers", to: "/teachers", active: false },
];
export default {
  name: "App",
  components: {
    Sidebar,
  },
  data() {
    return {
      menu: { status, profiles },
    };
  },
  mounted() {
    this.getAllStudents();
  },
  mounted() {
    this.getAllStudents();
  },
  methods: {
    ...mapActions(["getAllStudents"]),
    createNew() {
      this.$router.push({ path: "new-student" });
    },
  },
};
</script>
