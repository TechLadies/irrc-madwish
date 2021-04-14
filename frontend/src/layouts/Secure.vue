<template>
  <Sidebar :menu="menu" @createNew="createNew">
    <router-view></router-view>
  </Sidebar>
</template>

<script>
import { mapActions } from "vuex";
import Sidebar from "../components/Sidebar.vue";
import CreateNew from "../components/CreateNew.vue";

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
  name: "Secure",
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
    this.getAllTeachers();
    this.getAllMatches();
  },
  methods: {
    ...mapActions(["getAllStudents", "getAllTeachers", "getAllMatches"]),
    createNew() {
      this.$buefy.modal.open({
        parent: this,
        component: CreateNew,
        canCancel: ["escape", "x"],
        hasModalCard: true,
      });
    },
  },
};
</script>
