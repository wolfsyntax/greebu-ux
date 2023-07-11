import { createRouter,createWebHistory } from 'vue-router';
import store from '../store';

const defaultMenu = [
  { title: '', url: '', },
];
const artistMenu = [

]

const customerMenu = [

]

const organizerMenu = [

]

const servicesMenu = [

]

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
    //  component: () => import('@/components/Layouts/Layout.vue'),
      meta: {
        requiresLogin: false,
        role: '',
        breadcrumb: defaultMenu,
      },
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/Homepage/Home.vue'),
          meta: {
            requiresLogin: false,
            title: 'Home',
            role: '',
            parent: 'home',
            breadcrumb: [
              {title: '', url: '',},
            ],
          },
        },
        {
          path: '/artists',
          name: 'artists',
          component: () => import('@/views/Homepage/Artist.vue'),
          meta: {
            requiresLogin: false,
            title: 'Artists',
            role: '',
            parent: 'artists',
            breadcrumb: [
              {title: '', url: '',},
            ],
          },          
        },
        {
          path: '/create-song',
          name: 'create-song',
          component: () => import('@/views/Homepage/CreateSong.vue'),
          meta: {
            requiresLogin: false,
            title: 'Create a Song',
            role: '',
            parent: 'create-song',
            breadcrumb: [
              {title: '', url: '',},
            ],
          },          
        },
        {
          path: '/events',
          name: 'events',
          component: () => import('@/views/Homepage/Event.vue'),
          meta: {
            requiresLogin: false,
            title: '',
            role: '',
            parent: 'event',
            breadcrumb: [
              {title: '', url: '',},
            ],
          },
        },
        {
          path: '/partners',
          name: 'partners',
          component: () => import('@/views/Homepage/Partner.vue'),
          meta: {
            requiresLogin: false,
            title: 'Partners',
            role: '',
            parent: 'partners',
            breadcrumb: [
              {title: '', url: '',},
            ],
          },
        },
        {
          path: '/services',
          name: 'services',
          component: () => import('@/views/Homepage/Services.vue'),
          meta: {
            requiresLogin: false,
            title: 'Services',
            role: '',
            parent: 'services',
            breadcrumb: [
              {title: '', url: '',},
            ],
          },
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/Auth/Login.vue'),
          meta: {
            requiresLogin: false,
            title: 'Login',
            role: '',
          }
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/views/Auth/Register.vue'),
          meta: {
            requiresLogin: false,
            title: 'Register',
            role: '',
          }
        },
        {
          path: '/basicinformation',
          name: 'basicinformation',
          component: () => import('@/views/BasicInformation/Index.vue'),
        },
        {
          path: '/profile',
          // component: {
          //   template: '<div class="auth-component"></div>'
          // }
          component: () => import('@/views/Customer/EditProfile.vue'),
          meta: {
            requiresLogin: true,
            title: 'Profile',
            role: 'customers',
            breadcrumb: [
              {title: '', url: '',},
            ],
          },
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/Dashboard.vue'),
          meta: {
            requiresLogin: true,
            title: 'Dasboard',
            role: '',
            breadcrumb: [
              {title: '', url: '',},
            ],
          },
        }
      ]
    },
    {
      path: '/artist',
     // component: () => import('@/components/Layouts/ArtistLayout.vue'),
      component: () => import('@/components/Layouts/Layout.vue'),
      meta: {
        requiresLogin: true,
        title: 'Artist',
        role: 'artists',
        parent: 'artist',
        breadcrumb: [
          {title: '', url: '',},
        ],
      },
      children: [
        {
          path: '',
          name: 'index',
          component: () => import('@/views/Artist/Index.vue'),
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/Artist/Profile.vue'),
        },
        {
          path: 'edit',
          name: 'edit',
          component: () => import('@/views/Artist/EditProfile.vue'),
        },
      ]
    },
    {
      path: '/subscription',
      name: 'event',
      component: () => import('@/components/Subscription/Index.vue'),
      meta: {
        requiresLogin: false,
        title: 'Subscription',
        role: '',
        parent: 'event',
        breadcrumb: [
          {title: '', url: '',},
        ],
      },
    },    
    {
      path: '/pages',
      component: () => import('@/components/FullPage.vue'),
      children: [
      {
          path: 'error-404',
          name: 'page-error-404',
          component: () => import('@/views/Pages/Error404.vue'),
          meta: {
            requiresLogin: false,            
            title: 'Error 404 | Not Found',
            role: '',
          }
        },
        {
          path: 'error-500',
          name: 'page-error-500',
          component: () => import('@/views/Pages/Error500.vue'),
          meta: {
            requiresLogin: false,
            title: 'Error 500 | Server Error',
            role: '',
          }
        },
        {
          path: 'not-authorized',
          name: 'page-not-authorized',
          component: () => import('@/views/Pages/NotAuthorized.vue'),
          meta: {
            requiresLogin: false,
            title: 'Error 403 | Not Authorized',
            role: '',
          }
        },
        {
          path: 'maintenance',
          name: 'page-maintenance',
          component: () => import('@/views/Pages/Maintenance.vue'),
          meta: {
            requiresLogin: false,
            title: 'Maintenance',
            role: ''
          }
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/pages/error-404'
    }
  ]
});

router.afterEach(() => {
  // Remove initial loading
  // const appLoading = document.getElementById('loading-bg')
  // if (appLoading) {
  //   appLoading.style.display = 'none'
  // }
})

router.beforeEach((to, from, next) => {
  
  const {role} = to.meta
  const {path} = to.fullPath
  
  const reqSession = to.matched.some(route => route.meta.requiresLogin)
  const isAuth = store.getters.isLoggedIn;
  
  if (!reqSession) {
    next()
  } else if (isAuth) {
    if (role === store.getters.userRole) next()
    else next({name: 'page-not-authorized'})
  } else {

    if (reqSession) {
      next({name: 'login'})
    } else {
      next()
    }
  }

  document.title = to.meta.title;

})

export default router;