import { createRouter, createWebHistory } from 'vue-router';
import auth from '../views/external/auth.vue';
import dashboard from '../views/external/dashboard.vue';
import contact from '../views/internal/contact.vue';
import main from '../views/external/main.vue';

const routes = [
  { path: '/', name: 'home', component: main },
  { path: '/login', name: 'auth', component: auth },
  { path: '/dash', name: 'dashboard', component: dashboard },
  { path: '/contact', name: 'contact', component: contact },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔐 Navigation Guard
router.beforeEach((to, from, next) => {
  // const isAuthenticated = localStorage.getItem('authenticated');
  const isAuthenticated = true;

  if (to.path === '/dash' && (!isAuthenticated || from.path !== '/login')) {
    next('/login');
  } else {
    next();
  }
});
// router.beforeEach((to, from, next) => {
//   if (to.path === '/') {
//     next('/home');
//   } else {
//     next();
//   }
// });

export default router;
