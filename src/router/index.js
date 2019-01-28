import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld';
import Homepage from '@/components/Homepage'
import About from '@/components/About'
import UserDashboard from '@/components/UserDashboard'
import DetailPhone from '@/components/DetailPhone'
import AllPhones from '@/components/AllPhones'
import Login from '@/components/Login'
import Register from '@/components/Register'
import store from '../stores/store'
import VueJwtDecode from 'vue-jwt-decode'
import Basket from '@/components/Basket'
// const About = { template: '<p>about page</p>' }

Vue.use(Router)
let router = new Router({
  routes: [{
      path: '/about',
      // name: 'About',
      component: About
    },
    {
      path: '/',
      name: 'home',
      component: Homepage
    },
    {
      path: '/allPhones',
      name: 'AllPhone',
      component: AllPhones
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/basket',
      name: 'basket',
      component: Basket
    },
    {
      path: '/detailPhone/:mobileId',
      name: 'detailPhone',
      component: DetailPhone,
      props: true
    },
    {
      path: '/userDashboard',
      // name: 'HelloWorld',
      component: UserDashboard,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
const openRoutes = ['login', 'register', 'home', 'AllPhone','detailPhone'];

router.beforeEach((to, from, next) => {

  if (openRoutes.includes(to.name)) {
    console.log("its fine its only login")
    next()
  } else if (localStorage.getItem("token")!= null) {
    try {
      // { exp: 12903819203 }
      const expiration = VueJwtDecode.decode(localStorage.getItem("token"));
      console.log(expiration)
      console.log(expiration.exp)
      if (expiration.exp < new Date().getTime() / 1000) {
        console.log("expired")
        store.commit("change", false);

        // return false
        next('/login')
      }
      else{
        // return true
        console.log("not Expired");

        // store.state.isLogged = false;
        next();
      }
  
    } catch (e) {
      return false;
    }
    // console.log("User Logged in")
    // next()
  } else {
    console.log("User NOT Logged in")
    next('/login')
  }

})

export default router
