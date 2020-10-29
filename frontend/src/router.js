import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

<<<<<<< HEAD
const HelloWorld = () => import('./pages/HelloWorld.vue')
const Screening = () => import('./pages/Screening.vue')
const Matching = () => import('./pages/Matching.vue')
const NewStudent = () => import('./pages/NewStudent.vue')
const AllStudents = () => import('./pages/Students.vue')
=======
const HelloWorld = () => import("./pages/HelloWorld.vue");
const Screening = () => import("./pages/Screening.vue");
const Matching = () => import("./pages/Matching.vue");
const StudentProfile = () => import("./pages/StudentProfile.vue");
const EditStudent = () => import("./pages/EditStudent.vue")
>>>>>>> added route for EditStudent

const router = new VueRouter({
  mode: "history",
  hash: false,
  routes: [
<<<<<<< HEAD
    { path: '/', component: HelloWorld  },
    { path: '/screening', component: Screening  },
    { path: '/matching', component: Matching  },
    { path: '/new', component: NewStudent  },
    { path: '/students', component: AllStudents  }
  ]
})
=======
    //Path for testing. Swap paths for l17 and l21 when done.
    { path: "/", component: EditStudent},
    { path: "/screening", component: Screening },
    { path: "/matching", component: Matching },
    { path: "/student/:id", component: StudentProfile },
    { path: "/student/:id/edit", HelloWorld }
  ],
});
>>>>>>> added route for EditStudent

export default router;
