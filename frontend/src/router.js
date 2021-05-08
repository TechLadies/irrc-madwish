import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";

Vue.use(VueRouter);

const HelloWorld = () => import("./pages/HelloWorld.vue");
const Screening = () => import("./pages/Screening.vue");
const Matching = () => import("./pages/Matching.vue");
const NewStudent = () => import("./pages/NewStudent.vue");
const AllStudents = () => import("./pages/Students.vue");
const StudentProfile = () => import("./pages/StudentProfile.vue");
const EditStudent = () => import("./pages/EditStudent.vue");
const NewTeacher = () => import("./pages/NewTeacher.vue");
const EditTeacher = () => import("./pages/EditTeacher.vue");
const AllTeachers = () => import("./pages/Teachers.vue");
const TeacherProfile = () => import("./pages/TeacherProfile.vue");
const Matched = () => import("./pages/Matched.vue");
const Login = () => import("./pages/Login.vue");

const authGuard = (to, _, next) => {
  if (store.state.token) {
    return next();
  } else {
    let loginPath = "/login?";
    if (to.path) {
      loginPath = `${loginPath}return=${to.path}&`;
    }
    if (store.state.logoutReason) {
      loginPath = `${loginPath}reason=${store.state.logoutReason}`;
    }
    return next(loginPath.replace(/\?$/, ""));
  }
};

export const secureRoutes = [
  { path: "/", component: HelloWorld },
  { path: "/screening", component: Screening },
  { path: "/matching", component: Matching },
  { path: "/new-student", component: NewStudent },
  { path: "/new-teacher", component: NewTeacher },
  { path: "/students", component: AllStudents },
  { path: "/teachers", component: AllTeachers },
  { path: "/students/:id", component: StudentProfile },
  { path: "/edit-student/:id", component: EditStudent },
  { path: "/edit-teacher/:id", component: EditTeacher },
  { path: "/teachers/:id", component: TeacherProfile },
  { path: "/matched", component: Matched },
].map((route) => {
  if (!IRRC_LOGIN_ENABLED) return route;
  return { ...route, beforeEnter: authGuard };
});

export const publicRoutes = [{ path: "/login", component: Login }];

const router = new VueRouter({
  mode: "history",
  hash: false,
  routes: [...secureRoutes, ...publicRoutes],
});

export default router;
