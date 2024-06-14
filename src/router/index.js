import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import weather from "../views/Weather.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "",
      name: "mainLayout",
      component: MainLayout,
      children: [
        {
          path: "",
          component: weather,
        },
      ],
    },
  ],
});

export default router;
