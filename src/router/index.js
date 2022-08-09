import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/classes',
    name: 'classes',
    component: () => import(/* webpackChunkName: "posts" */ '../views/ClassesView.vue')
  },
  {
    path: '/class/:id',
    name: 'get-class',
    component: () => import(/* webpackChunkName: "post" */ '../components/posts/ClassId.vue')
  },
  {
    path: '/edit-class/:id',
    name: 'edit-class',
    component: () => import(/* webpackChunkName: "post" */ '../components/posts/ClassEdit.vue')
  },
  {
    path: '/delete-class/:id',
    name: 'delete-class',
    component: () => import(/* webpackChunkName: "post" */ '../components/posts/ClassDelete.vue')
  },
  {
    path: '/create-class',
    name: 'create-class',
    component: () => import(/* webpackChunkName: "post" */ '../components/posts/ClassCreate.vue')
  },



  {
    path: '/teachers',
    name: 'teachers',
    component: () => import(/* webpackChunkName: "about" */ '../views/TeachersView.vue')
  },
  {
    path: '/create-teacher',
    name: 'create-teacher',
    component: () => import(/* webpackChunkName: "post" */ '../components/teachers/TeacherCreate.vue')
  },
  {
    path: '/delete-teacher/:id',
    name: 'delete-teacher',
    component: () => import(/* webpackChunkName: "post" */ '../components/teachers/TeacherDelete.vue')
  },
  {
    path: '/edit-teacher/:id',
    name: 'edit-teacher',
    component: () => import(/* webpackChunkName: "post" */ '../components/teachers/TeacherEdit.vue')
  },
  {
    path: '/teacher/:id',
    name: 'get-teacher',
    component: () => import(/* webpackChunkName: "post" */ '../components/teachers/TeacherId.vue')
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "post" */ '../views/NotFound.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
