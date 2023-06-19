import { createRouter,createWebHashHistory } from 'vue-router';
console.log('R: ', import.meta.env)
const router = createRouter({
  mode: 'history',
  history: createWebHashHistory(),
  // base: import.meta.env.VITE_BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      // component
    }
  ]
});

export default router;