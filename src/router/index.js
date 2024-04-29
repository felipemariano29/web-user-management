import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "@/views/RegisterView.vue";
import AboutView from "@/views/AboutView.vue";
import LoginView from "@/views/LoginView.vue";
import UsersView from "@/views/UsersView.vue";
import axios from "axios";

const AdminAuth = (to, from, next) => {
  const token = localStorage.getItem("token");

  if (token) {
    const req = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios
      .post("http://localhost:8686/validate", {}, req)
      .then((res) => {
        console.log(res.data);
        next();
      })
      .catch((err) => {
        console.log(err.response.data);
        next("/login");
      });
  } else {
    next("/login");
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/admin/users",
    name: "users",
    component: UsersView,
    beforeEnter: AdminAuth,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
