import Vue from 'vue'
import Router from 'vue-router'
import test from '@/pages/test'
import index from '@/pages/index'
import configLamp from '@/pages/configLamp'
import configSensor from '@/pages/configSensor'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path:'/',
      name:'index',
      component:index
    },
    {
      path:'/configLamp/:id',
      component:configLamp,
      props:true
    },
    {
      path:'/configSensor/:id',
      component:configSensor,
      props:true
    }
  ]
})
