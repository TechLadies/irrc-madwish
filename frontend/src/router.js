import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const HelloWorld = () => import('./pages/HelloWorld.vue')
const Screening = () => import('./pages/Screening.vue')
const Matching = () => import('./pages/Matching.vue')
const NewStudent = () => import('./pages/NewStudent.vue')
const AllStudents = () => import('./pages/Students.vue')
<<<<<<< HEAD
=======
const EditStudent = () => import("./pages/EditStudent.vue")
const StudentProfile = () => import ("./pages/StudentProfile.vue")
>>>>>>> retrieve NativeLanguageID from Nativelanguage in frontend form input, PATCH to backend

const router = new VueRouter({
  mode: "history",
  hash: false,
  routes: [
    { path: '/', component: HelloWorld},
    { path: '/screening', component: Screening  },
    { path: '/matching', component: Matching  },
    { path: '/new', component: NewStudent  },
<<<<<<< HEAD
    { path: '/students', component: AllStudents  }
=======
    { path: '/students', component: AllStudents  },
    // To check how to resolve routes for /students/:id/edit, somehow isn't working
    { path: "/students/:id", component: StudentProfile},
    { path: "/edit", component: EditStudent}
>>>>>>> retrieve NativeLanguageID from Nativelanguage in frontend form input, PATCH to backend
  ]
})

export default router;
