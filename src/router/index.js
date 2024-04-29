import { createRouter, createWebHistory } from "vue-router";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import UsersView from "@/views/UsersView.vue";
import EditView from "@/views/EditView.vue";
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
      .then(() => {
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
    name: "login",
    component: LoginView,
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
    path: "/admin/users/edit/:id",
    name: "users-edit",
    component: EditView,
    beforeEnter: AdminAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
