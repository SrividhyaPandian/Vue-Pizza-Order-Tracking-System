import Vue from 'vue'
import Router from 'vue-router'
import pizzaTrackList from '@/components/pizzaStatusTracker'
import form from '@/components/custom/orderForm'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'pizzaTrackList',
      component: pizzaTrackList
    }
  ]
})
