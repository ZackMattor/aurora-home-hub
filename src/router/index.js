import Vue from 'vue'
import Router from 'vue-router'
import Editor from '@/components/editor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Editor
    }
  ]
})
