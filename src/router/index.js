import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import LogIn from "../views/LogIn.vue";
import SignUp from "../views/SignUp.vue";
import Admin from "../views/Admin.vue";
import Welcome from "../views/Welcome.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "LogIn",
    component: LogIn
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin
  },
  {
    path: "/welcome",
    name: "Welcome",
    component: Welcome
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
