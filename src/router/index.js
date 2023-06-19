import { createRouter,createWebHistory } from 'vue-router';

const router = createRouter({
  mode: 'history',
  hashbang: false,
  history: createWebHistory(),
  base: import.meta.env.VITE_BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '',
      //component: () => import('@/components/Layouts/Layout.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/Homepage/Home.vue'),
        },
        {
          path: '/artist',
          name: 'artist',
          component: () => import('@/views/Homepage/Artist.vue'),
        },
        {
          path: '/create-song',
          name: 'create-song',
          component: () => import('@/views/Homepage/CreateSong.vue'),
        },
        {
          path: '/events',
          name: 'event',
          component: () => import('@/views/Homepage/Event.vue'),
        },
        {
          path: '/partners',
          name: 'partners',
          component: () => import('@/views/Homepage/Partner.vue'),
        },
        {
          path: '/services',
          name: 'services',
          component: () => import('@/views/Homepage/Services.vue'),
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/Auth/Login.vue'),
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/views/Auth/Register.vue'),
        }

      ]
    }
  ]
});

export default router;