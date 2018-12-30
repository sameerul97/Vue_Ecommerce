import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld';
import Homepage from '@/components/Homepage'
import About from '@/components/About'
import UserDashboard from '@/components/UserDashboard'
import DetailPhone from '@/components/DetailPhone'
import AllPhones from '@/components/AllPhones'
// const About = { template: '<p>about page</p>' }

Vue.use(Router)

export default new Router({
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
