import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const HelloWorld = () => import("./pages/HelloWorld.vue");
const Screening = () => import("./pages/Screening.vue");
const Matching = () => import("./pages/Matching.vue");
const StudentProfile = () => import("./pages/StudentProfile.vue");
const NewStudent = () => import("./pages/NewStudent.vue");

const router = new VueRouter({
  mode: "history",
  hash: false,
  routes: [
    { path: "/", component: HelloWorld },
    { path: "/screening", component: Screening },
    { path: "/matching", component: Matching },
    { path: "/student/:id", component: StudentProfile },
    { path: "/new", component: NewStudent },
  ],
});

export default router;
