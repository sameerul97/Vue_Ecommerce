import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld';
import Homepage from '@/components/Homepage'
import About from '@/components/About'
import UserDashboard from '@/components/UserDashboard'
import DetailPhone from '@/components/DetailPhone'
import AllPhones from '@/components/AllPhones'
import Login from '@/components/Login'
import  store  from '../stores/store'

// const About = { template: '<p>about page</p>' }

Vue.use(Router)
let router  = new Router({
  routes: [
  {
    path: '/about',
    // name: 'About',
    component: About
  },
  {
    path: '/',
    // name: 'HelloWorld',
    component: Homepage
  },
  {
    path: '/allPhones',
    // name: 'HelloWorld',
    component: AllPhones
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/detailPhone/:mobileId',
    // name: 'HelloWorld',
    component: DetailPhone,
    props: true
  },
  {
    path: '/userDashboard',
    // name: 'HelloWorld',
    component: UserDashboard
  }
]
})
const openRoutes=['login'];

router.beforeEach((to, from, next) => {
    
    if(openRoutes.includes(to.name)  ){
      console.log("its fine its only login")
      next()
    } else if (store.state.isLogged){
      console.log("User Logged in")
      next()
    }else{
      console.log("User NOT Logged in")
      next('/login')
    }

})

export default router
