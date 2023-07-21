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
    //  component: () => import('/src/components/Layouts/Layout.vue'),
      meta: {
        requiresLogin: false,
        role: '',
        breadcrumb: defaultMenu,
      },
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('/src/views/Homepage/Home.vue'),
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
          component: () => import('/src/views/Homepage/Artist.vue'),
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
          component: () => import('/src/views/Homepage/CreateSong.vue'),
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
          component: () => import('/src/views/Homepage/Event.vue'),
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
          component: () => import('/src/views/Homepage/Partner.vue'),
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
          component: () => import('/src/views/Homepage/Services.vue'),
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
          component: () => import('/src/views/Auth/Login.vue'),
          meta: {
            requiresLogin: false,
            title: 'Login',
            role: '',
          }
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('/src/views/Auth/Register.vue'),
          meta: {
            requiresLogin: false,
            title: 'Register',
            role: '',
          }
        },
        {
          path: '/phoneverification',
          name: 'phoneverification',
          component: () => import('/src/views/Auth/PhoneVerfication.vue'),
          meta: {
            requiresLogin: false,
            title: 'Phone Verification',
            role: '',
          }
        },
        {
          path: '/basicinformation',
          name: 'basicinformation',
          component: () => import('/src/views/BasicInformation/Index.vue'),
          meta: {
            requiresLogin: false,
            title: 'Create a Song step by step',
            role: '',
          }
        },
        {
          path: '/deliveryform',
          name: 'deliveryform',
          component: () => import('/src/views/BasicInformation/DeliveryForm.vue'),
          meta: {
            requiresLogin: false,
            title: 'Select delivery date',
            role: '',
          }
        },
        {
          path: '/ordersummary',
          name: 'ordersummary',
          component: () => import('/src/views/BasicInformation/OrderSummary.vue'),
          meta: {
            requiresLogin: false,
            title: 'Your Order Summary',
            role: '',
          }
        },
        {
          path: '/successfully-sent',
          name: 'successfully-sent',
          component: () => import('/src/views/BasicInformation/SuccessfullySent.vue'),
          meta: {
            requiresLogin: false,
            title: 'Successfully Sent!',
            role: '',
          }
        },
        {
          path: '/profile',
          // component: {
          //   template: '<div class="auth-component"></div>'
          // }
          component: () => import('/src/views/Customer/EditProfile.vue'),
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
          component: () => import('/src/views/Dashboard.vue'),
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
     // component: () => import('/src/components/Layouts/ArtistLayout.vue'),
      component: () => import('/src/components/Layouts/Layout.vue'),
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
          component: () => import('/src/views/Artist/Index.vue'),
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('/src/views/Artist/Profile.vue'),
        },
        {
          path: 'edit',
          name: 'edit',
          component: () => import('/src/views/Artist/EditProfile.vue'),
        },
      ]
    },
    {
      path: '/subscription',
      name: 'event',
      component: () => import('/src/components/Subscription/Index.vue'),
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
      component: () => import('/src/components/FullPage.vue'),
      children: [
      {
          path: 'error-404',
          name: 'page-error-404',
          component: () => import('/src/views/Pages/Error404.vue'),
          meta: {
            requiresLogin: false,            
            title: 'Error 404 | Not Found',
            role: '',
          }
        },
        {
          path: 'error-500',
          name: 'page-error-500',
          component: () => import('/src/views/Pages/Error500.vue'),
          meta: {
            requiresLogin: false,
            title: 'Error 500 | Server Error',
            role: '',
          }
        },
        {
          path: 'not-authorized',
          name: 'page-not-authorized',
          component: () => import('/src/views/Pages/NotAuthorized.vue'),
          meta: {
            requiresLogin: false,
            title: 'Error 403 | Not Authorized',
            role: '',
          }
        },
        {
          path: 'maintenance',
          name: 'page-maintenance',
          component: () => import('/src/views/Pages/Maintenance.vue'),
          meta: {
            requiresLogin: false,
            title: 'Maintenance',
            role: ''
          }
        }
      ]
    },
    {
      path: '/verify',
      name: 'verify',
      component: () => import('/src/views/Auth/Verify.vue'),
      meta: {
        requiresLogin: false,
        title: 'Verify',
        role: ''
      }
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