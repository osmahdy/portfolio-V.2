import { createRouter, createWebHistory } from 'vue-router';
import auth from '../views/external/auth.vue';
import main from '../views/external/main.vue';
import NotFound from '../views/NotFound.vue';
import { useSettings } from '../store/settings.store';
import AOS from 'aos';

const Dashboard = () => import('../views/external/dashboard.vue');

const routes = [
  { path: '/', name: 'home', component: main },
  { path: '/a-panel-login', name: 'auth', component: auth },
  {
    path: '/a-panel-dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useSettings();

  if (!store.authChecked) {
    const stop = store.$subscribe(() => {
      stop();

      if (to.meta.requiresAuth && !store.isAuthenticated) {
        next('/a-panel-login');
      } else {
        next();
      }
    });
    return; // ⛔ IMPORTANT
  }

  if (to.meta.requiresAuth && !store.isAuthenticated) {
    next('/a-panel-login');
  } else {
    next();
  }
});

router.afterEach((to) => {
  if (to.name === 'dashboard') {
    requestAnimationFrame(() => AOS.refresh());
  }
});

export default router;
