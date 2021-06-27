import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainerPemilih = () => import('@/containers/pemilih/TheContainer')
const TheContainerAdmin = () => import('@/containers/admin/TheContainer')

// Admin Views
const AdminLogin = () => import('@/views/admin/LoginForm')
const AdminDashboard = () => import('@/views/admin/Dashboard')
const DataPemilih = () => import('@/views/admin/Pemilih/DataPemilih')
const DetailPemilih = () => import('@/views/admin/Pemilih/DetailPemilih')
const PendaftaranPemilih = () => import('@/views/admin/Pemilih/PendaftaranPemilih')
const DataKandidat = () => import('@/views/admin/Kandidat/DataKandidat')
const PendaftaranKandidat = () => import('@/views/admin/Kandidat/PendaftaranKandidat')

// Pemilih Views
const PemilihLogin = () => import('@/views/pemilih/LoginForm')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    //Route login untuk pemilih
    {
      path:'/',
      redirect:'/login',
      component:{
        render (c) { return c('router-view') }
      },
      children:[
        {
          path:'login',
          redirect:'/login/user',
          component:{
            render (c) { return c('router-view') }
          },
          children:[
            {
              path:'user',
              component:PemilihLogin
            },
            {
              path:'administrator',
              component:AdminLogin
            }
          ]
        }
      ]
    },
    // Handle admin route
    {
      path:'/admin',
      redirect:'/admin/dashboard',
      name:'Home',
      component:TheContainerAdmin,
      children:[
        {
          path:'dashboard',
          name:'Dashboard',
          component:AdminDashboard
        },
        {
          path:'pemilih',
          redirect:'/admin/pemilih/data',
          name:'Pemilih',
          component:{
            render(c) {return c('router-view')}
          },
          children:[
            {
              path:'data',
              name:'Data',
              component:DataPemilih
            },
            {
              path:'detail/:id',
              name:'Detail',
              component:DetailPemilih
            },
            {
              path:'daftar',
              name:'Pendaftaran',
              component:PendaftaranPemilih
            }
          ]
        },
        {
          path:'kandidat',
          redirect:'/admin/kandidat/data',
          name:'Kandidat',
          component:{
            render(c) {return c('router-view')}
          },
          children:[
            {
              path:'data',
              name:'Data',
              component:DataKandidat
            },
            {
              path:'pendaftaran',
              name:'Pendaftaran',
              component:PendaftaranKandidat
            }
          ]
        }
      ]
    }
  ]
}

