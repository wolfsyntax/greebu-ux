import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const defaultMenu = [{ title: "", url: "" }];
const artistMenu = [
  { title: "Library", url: "/library" },
  { title: "Artist", url: "/artists" },
  { title: "Events", url: "/events" },
];

const customerMenu = [];

const organizerMenu = [];

const servicesMenu = [];

const router = createRouter({
  mode: "history",
  hashbang: false,
  history: createWebHistory(),
  base: import.meta.env.VITE_BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  linkActiveClass: "site-active-page",
  routes: [
    {
      path: "",
      //  component: () => import('/src/components/Layouts/Layout.vue'),
      meta: {
        requiresLogin: false,
        role: "",
        breadcrumb: defaultMenu,
      },
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("/src/views/Homepage/Home.vue"),
          meta: {
            requiresLogin: false,
            title: "Geebu Artists",
            role: "",
            parent: "home",
            breadcrumb: [{ title: "", url: "" }],
          },
        },
        {
          path: "/artists",
          name: "artists-list",
          component: () => import("/src/views/Homepage/Artist.vue"),
          meta: {
            requiresLogin: false,
            title: "Artists",
            role: "",
            parent: "artists",
            breadcrumb: [{ title: "", url: "" }],
            // showLoadingBar: true 
          },
        },
        {
          path: "/artists/:id",
          name: "artists-profile",
          component: () => import("/src/views/Artist/Details.vue"),
          meta: {
            requiresLogin: false,
            title: "Artists",
            role: "",
            parent: "artists",
            breadcrumb: [{ title: "", url: "" }],
          },
        },
        {
          path: "/artists/:id/booking",
          name: "artists-booking",
          component: () => import("/src/views/Artist/Booking.vue"),
          meta: {
            requiresLogin: false,
            title: "Artists - Booking",
            role: "",
            parent: "artists",
            breadcrumb: [{ title: "", url: "" }],
          },
        },
        {
          path: "/create-song",
          name: "create-song",
          component: () => import("/src/views/Homepage/CreateSong.vue"),
          meta: {
            requiresLogin: false,
            title: "Create a Song",
            role: "",
            parent: "create-song",
            breadcrumb: [{ title: "", url: "" }],
          },
        },
        {
          path: "/events",
          name: "events",
          component: () => import("/src/views/Homepage/Event.vue"),
          meta: {
            requiresLogin: false,
            title: "Events",
            role: "",
            parent: "event",
            breadcrumb: [{ title: "", url: "" }],
          },
        },
        {
          path: "/events/:id",
          name: "organizer-profile",
          component: () => import("/src/views/Organizer/Details.vue"),
          meta: {
            requiresLogin: false,
            title: "Organizer",
            role: "",
            parent: "events",
            breadcrumb: [{ title: "", url: "" }],
          },
        },
        {
          path: "/partners",
          name: "partners",
          component: () => import("/src/views/Homepage/Partner.vue"),
          meta: {
            requiresLogin: false,
            title: "Partners",
            role: "",
            parent: "partners",
            breadcrumb: [{ title: "", url: "" }],
          },
        },
        {
          path: "/services",
          name: "services",
          component: () => import("/src/views/Homepage/Services.vue"),
          meta: {
            requiresLogin: false,
            title: "Services",
            role: "",
            parent: "services",
            breadcrumb: [{ title: "", url: "" }],
          },
        },
        {
          path: "/login",
          name: "login",
          component: () => import("/src/views/Auth/Login.vue"),
          meta: {
            requiresLogin: false,
            title: "Login",
            role: "",
          },
        },
        {
          path: "/register",
          name: "register",
          component: () => import("/src/views/Auth/Register.vue"),
          meta: {
            requiresLogin: false,
            title: "Register",
            role: "",
          },
        },
        {
          path: "/phoneverification",
          name: "phoneverification",
          component: () => import("/src/views/Auth/PhoneVerfication.vue"),
          meta: {
            requiresLogin: false,
            title: "Phone Verification",
            role: "",
          },
        },
        {
          path: "/basicinformation",
          name: "basicinformation",
          component: () => import("/src/views/BasicInformation/Index.vue"),
          meta: {
            requiresLogin: true, // true
            title: "Create a Song step by step",
            role: "",
          },
        },
        {
          path: "/deliveryform",
          name: "deliveryform",
          component: () =>
            import("/src/views/BasicInformation/DeliveryForm.vue"),
          meta: {
            requiresLogin: true, // true
            title: "Select your delivery date",
            role: "",
          },
        },
        {
          path: "/ordersummary",
          name: "ordersummary",
          component: () =>
            import("/src/views/BasicInformation/OrderSummary.vue"),
          meta: {
            requiresLogin: true, // true
            title: "Your Order Summary",
            role: "",
          },
        },
        {
          path: "/successfully-sent",
          name: "successfully-sent",
          component: () =>
            import("/src/views/BasicInformation/SuccessfullySent.vue"),
          meta: {
            requiresLogin: true, // true
            title: "Successfully Sent!",
            role: "",
          },
        },
        {
          path: "/account", // src\components\Layouts\AccountLayout.vue
          component: () => import("/src/components/Layouts/AccountLayout.vue"),
          meta: {
            requiresLogin: true,
            title: "Profile",
            role: "",
            breadcrumb: [{ title: "", url: "" }],
          },
          children: [
            {
              path: "setting",
              name: "account-setting",
              component: () => import("/src/views/Auth/Account/Setting.vue"),
              meta: {
                requiresLogin: true,
                title: "Account Setting",
                role: "",
              },
            },
            {
              path: "profile",
              name: "account-profile",
              component: () => import("/src/views/Auth/Account/Profile.vue"),
              meta: {
                requiresLogin: true,
                title: "Account Profile",
                role: "",
              },
            },
          ],
        },
        {
          path: "/profile",
          // component: {
          //   template: '<div class="auth-component"></div>'
          // }
          component: () => import("/src/views/Customer/EditProfile.vue"),
          meta: {
            requiresLogin: true,
            title: "Profile",
            role: "customers",
            breadcrumb: [{ title: "", url: "" }],
          },
        },
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("/src/views/Dashboard.vue"),
          meta: {
            requiresLogin: true,
            title: "Dasboard",
            role: "",
            breadcrumb: [{ title: "", url: "" }],
          },
        },
        {
          path: "/proposal-to-artist",
          name: "proposal-to-artist",
          component: () =>
            import("/src/views/Organizer/Forms/ProposalForm.vue"),
          meta: {
            requiresLogin: true, // true
            title: "Proposal Form to Artist",
            role: "organizer",
            parent: "dashboard",
            breadcrumb: [{ title: "", url: "" }],
          },
        },
        {
          path: "/collaboration",
          name: "collaboration",
          component: () =>
            import("/src/views/Artist/Form/CollaborationForm.vue"),
          meta: {
            requiresLogin: true, // true
            title: "Collaboration to Artist",
            role: "artists",
            parent: "dashboard",
            breadcrumb: [{ title: "", url: "" }],
          },
        },
        {
          path: "/verify",
          name: "verify",
          component: () => import("/src/views/Auth/Verify.vue"),
          meta: {
            requiresLogin: false, // true
            title: "Verify",
            role: "",
          },
        },
        {
          path: "/forgot",
          name: "forgot",
          component: () => import("/src/views/Auth/Forgot.vue"),
          meta: {
            requiresLogin: false,
            title: "Forgot",
            role: "",
          },
        },
        {
          path: "/password/reset/:token", //:token
          name: "reset-token",
          component: () => import("/src/views/Auth/ResetPassword.vue"),
          meta: {
            requiresLogin: false,
            title: "Verify",
            role: "",
          },
        },
        {
          path: "/email/verify/verified",
          name: "verify-done",
          component: () => import("/src/views/Auth/Verification/Verified.vue"),
          meta: {
            requiresLogin: false, // true
            title: "Email Verification - Verified",
            role: "",
          },
        },
        {
          path: "/email/verify/success",
          name: "verify-success",
          component: () => import("/src/views/Auth/Verification/Success.vue"),
          meta: {
            requiresLogin: false, // true
            title: "Email Verification - Success",
            role: "",
          },
        },
        {
          path: "/email/resend",
          name: "verify-resend",
          component: () => import("/src/views/Auth/Verification/Resend.vue"),
          meta: {
            requiresLogin: true, // true
            title: "Email Verification - Resend",
            role: "",
          },
        },
        {
          path: "/email/verify/invalid",
          name: "verify-invalid",
          component: () => import("/src/views/Auth/Verification/Invalid.vue"),
          meta: {
            requiresLogin: false, // true
            title: "Email Verification - Invalid",
            role: "",
          },
        },
      ],
    },
    {
      path: "/artist",
      component: () => import("/src/components/Layouts/ArtistLayout.vue"),
      // component: () => import('/src/components/Layouts/Layout.vue'),
      meta: {
        requiresLogin: true, // true
        title: "Artist",
        role: "artists",
        parent: "artist",
        breadcrumb: [{ title: "", url: "" }],
      },
      children: [
        {
          path: "",
          redirect: "/dashboard",
          // name: 'index',
          // component: () => import('/src/views/Artist/Index.vue'),
        },
        // {
        //   path: 'profile',
        //   name: 'profile', // src\views\Artist\Profile_backup.vue
        //   component: () => import('/src/views/Artist/Profile.vue'),
        // },
        {
          path: "edit",
          name: "edit",
          component: () => import("/src/views/Artist/EditProfile.vue"),
        },
      ],
    },
    {
      path: "/library",
      name: "artist-library",
      component: () => import("/src/views/Artist/Library.vue"),
      meta: {
        requiresLogin: true, // true
        title: "Library",
        role: "artists",
        parent: "artist",
        breadcrumb: [{ title: "", url: "" }],
      },
    },
    {
      path: "/subscription",
      name: "event",
      component: () => import("/src/components/Subscription/Index.vue"),
      meta: {
        requiresLogin: false, // true
        title: "Billing information",
        role: "",
        parent: "event",
        breadcrumb: [{ title: "", url: "" }],
      },
    },
    {
      path: "/proposal/:eventId/apply",
      name: "proposal",
      component: () => import("/src/views/Artist/Form/ProposalForm.vue"),
      meta: {
        requiresLogin: true, // true
        title: "Proposal Form",
        role: "artists",
        parent: "artist",
        breadcrumb: [{ title: "", url: "" }],
      },
    },
    {
      path: "/test-module",
      name: "test",
      component: () => import("/src/views/Test.vue"),
      meta: {
        requiresLogin: false, // true
        title: "Test Module",
        role: "",
        parent: "",
        breadcrumb: [{ title: "", url: "" }],
      },
    },
    {
      path: "/terms",
      name: "Terms",
      component: () => import("/src/views/Terms.vue"),
      meta: {
        requiresLogin: false, // true
        title: "Terms",
        role: "",
        parent: "",
        breadcrumb: [{ title: "", url: "" }],
      },
    },
    {
      path: "/pages",
      component: () => import("/src/components/FullPage.vue"),
      children: [
        {
          path: "error-404",
          name: "page-error-404",
          component: () => import("/src/views/Pages/Error404.vue"), // Page not found
          meta: {
            requiresLogin: false,
            title: "Error 404 | Not Found",
            role: "",
          },
        },
        {
          path: "error-500",
          name: "page-error-500",
          component: () => import("/src/views/Pages/Error500.vue"), // Maintenance
          meta: {
            requiresLogin: false,
            title: "Error 500 | Server Error",
            role: "",
          },
        },
        {
          path: "not-authorized",
          name: "page-not-authorized",
          component: () => import("/src/views/Pages/NotAuthorized.vue"),
          meta: {
            requiresLogin: false,
            title: "Error 403 | Not Authorized",
            role: "",
          },
        },
        {
          path: "maintenance",
          name: "page-maintenance",
          component: () => import("/src/views/Pages/Maintenance.vue"),
          meta: {
            requiresLogin: false,
            title: "Maintenance",
            role: "",
          },
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/pages/error-404",
    },
  ],
});

let shouldShowLoadingBar = false;

router.beforeEach((to, from, next) => {
  shouldShowLoadingBar = to.meta.showLoadingBar !== false;

  if (shouldShowLoadingBar) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  if (shouldShowLoadingBar) {
    NProgress.done();
  }
});

router.afterEach(() => {
  // Remove initial loading
  // const appLoading = document.getElementById('loading-bg')
  // if (appLoading) {
  //   appLoading.style.display = 'none'
  // }
});

router.beforeEach((to, from, next) => {
  const { role } = to.meta;
  // const { path: toPath } = to.fullPath;
  // const { path: fromPath } = from.fullPath;
  console.log("Route before enter [To]: ", to);

  const reqSession = to.matched.some((route) => route.meta.requiresLogin);
  const isAuth = store.getters.isLoggedIn;

  if (isAuth) {
    if (["home", "register", "login", "forgot"].includes(to?.name || "home"))
      if (
        !to.query.hasOwnProperty("onboarding") ||
        (to.query.hasOwnProperty("onboarding") &&
          to.query.onboarding !== "true")
      )
        next({ name: "dashboard" });
  } else if (!isAuth && to?.name === "artists-profile") {
    next({ name: "page-not-authorized" });
  }

  if (to?.name === "artists-profile") {
    setTimeout(() => {
      const regexExp =
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

      if (regexExp.test(to.params?.id)) {
        store.dispatch("fetchArtistById", to.params?.id).then((res) => next());
      } else {
        store
          .dispatch("fetchArtistBySlug", to.params?.id)
          .then((res) => next());
      }
    }, 100);
  }

  if (!reqSession) {
    next();
  } else if (isAuth) {
    if (role === store.getters.userRole || role === "") next();
    else next({ name: "page-not-authorized" });
  } else {
    if (reqSession) {
      next({ name: "login" });
    } else {
      next();
    }
  }

  document.title = to.meta.title;
});


export default router;
