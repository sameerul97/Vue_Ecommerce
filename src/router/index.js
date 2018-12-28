import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import About from '@/components/About'
const About = { template: '<p>about page</p>' }

Vue.use(Router)

export default new Router({
  routes: [
    
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
