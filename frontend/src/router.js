import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const HelloWorld = () => import("./pages/HelloWorld.vue");
const Screening = () => import("./pages/Screening.vue");
const Matching = () => import("./pages/Matching.vue");
const NewStudent = () => import("./pages/NewStudent.vue");
const AllStudents = () => import("./pages/Students.vue");
const StudentProfile = () => import("./pages/StudentProfile.vue");

const router = new VueRouter({
  mode: "history",
  hash: false,
  routes: [
    { path: "/", component: HelloWorld },
    { path: "/screening", component: Screening },
    { path: "/matching", component: Matching },
    { path: "/new", component: NewStudent },
    { path: "/students", component: AllStudents },
    { path: "/students/:id", component: StudentProfile },
  ],
});

export default router;
