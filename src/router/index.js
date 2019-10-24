import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/honorIndex',
      // component: Layout,
      // children:[{

      // }]

    },
    // {
    //   path: '/index',
    //   name: 'index',
    //   component: () => import('@/views/index/index'),
    //   meta: { keepAlive: true }
    // },
    // {
    //   path: '/past',
    //   name: 'past',
    //   component: () => import('@/views/past/past')
    // },
    // {
    //   path: '/pastMag',
    //   name: 'pastMag',
    //   component: () => import('@/views/past/pastMag/pastMag')
    // },
    // {
    //   path: '/me',
    //   name: 'me',
    //   component: () => import('@/views/me/me')
    // },
    // {
    //   path: '/avatar',
    //   name: 'avatar',
    //   component: () => import('@/views/me/avatar/avatar')
    // },
    // {
    //   path: '/name',
    //   name: 'name',
    //   component: () => import('@/views/me/name/name')
    // },
    // {
    //   path: '/info',
    //   name: 'news',
    //   component: () => import('@/views/news/news')
    // },
    // {
    //   path:'/complaintIndex',
    //   name:'complaintIndex',
    //   component: () => import('@/views/complaintIndex/complaintIndex')
    // },
    // {
    //   path:'/complaintsNotice',
    //   name:'complaintsNotice',
    //   component: () => import('@/views/complaintsNotice/complaintsNotice')
    // },
    // {
    //   path:'/complaintsEdit',
    //   name:'complaintsEdit',
    //   component: () => import('@/views/complaintsEdit/complaintsEdit')
    // },
    // {
    //   path:'/complaintCase',
    //   name:'complaintCase',
    //   component: () => import('@/views/complaintCase/complaintCase')
    // },
    // {
    //   path:'/complaintsEmail',
    //   name:'complaintsEmail',
    //   component: () => import('@/views/complaintsEmail/complaintsEmail')
    // },
    // {
    //   path:'/caseInfo',
    //   name:'caseInfo',
    //   component: () => import('@/views/complaintCase/caseInfo')
    // },

    //名人堂部分
    {
      path:'/honorIndex',
      name:'honorIndex',
      component: () => import('@/views/honorIndex/honorIndex'),
    },
    {
      path:'/honorPrize',
      name:'honorPrize',
      component: () => import('@/views/honorPrize/honorPrize'),
    },
    {
      path:'/honorPc',
      name:'honorPc',
      component: () => import('@/views/honorPc/honorPc'),
    },
    {
      path:'/demo',
      name:'demo',
      component: () => import('@/views/demo/demo'),
    },
    {
      path:'/honorpRizeDetail',
      name:'honorpRizeDetail',
      component: () => import('@/views/honorpRizeDetail/honorpRizeDetail'),
    },
    {
      path:'/honorDetail',
      name:'honorDetail',
      component: () => import('@/views/honorDetail/honorDetail'),
    },

    // 人才池部分路由
    // {
    //   path:'/personnelHome',
    //   name:'personnelHome',
    //   component: () => import('@/views/personnelHome/personnelHome'),
    // },
    // {
    //   path:'/personnelIndex',
    //   name:'personnelIndex',
    //   component: () => import('@/views/personnelIndex/personnelIndex'),
    // },
    // {
    //   path:'/personnelDetail',
    //   name:'personnelDetail',
    //   component: () => import('@/views/personnelDetail/personnelDetail'),
    // },
    // {
    //   path:'/personnelCreate',
    //   name:'personnelCreate',
    //   component: () => import('@/views/personnelCreate/personnelCreate'),
    // },
    // {
    //   path:'/personnelApply',
    //   name:'personnelApply',
    //   component: () => import('@/views/personnelApply/personnelApply'),
    // },
    // {
    //   path:'/personnelTop',
    //   name:'personnelTop',
    //   component: () => import('@/views/personnelTop/personnelTop'),
    // },
  ]
})