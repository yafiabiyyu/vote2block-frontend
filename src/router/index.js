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
const DetailKandidat = () => import('@/views/admin/Kandidat/DetailKandidat')
const VotingTime = () => import('@/views/admin/VotingTime')

// Pemilih Views
const PemilihLogin = () => import('@/views/pemilih/LoginForm')
const PemilihDashboard = () => import('@/views/pemilih/Dashboard');
const QuickCount = () => import ('@/views/pemilih/QuickCount');
const HasilPemilihan = () => import('@/views/pemilih/HasilPemilihan');
const PemilihData = () => import('@/views/pemilih/DataPemilih');
const UpdatePassword = () => import('@/views/pemilih/UpdatePassword')

Vue.use(Router)

const router = new Router({
  mode:'hash',
  linkActiveClass:'active',
  scrollBehavior: () => ({y:0}),
  routes:[
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
              path:'detail/:id',
              name:'Detail',
              component:DetailKandidat
            },
            {
              path:'pendaftaran',
              name:'Pendaftaran',
              component:PendaftaranKandidat
            }
          ]
        },
        {
          path:'voting',
          redirect:'/admin/voting/setup',
          name:'Voting',
          component:{
            render(c) {return c('router-view')}
          },
          children:[
            {
              path:'setup',
              name:'Setup',
              component:VotingTime
            }
          ]
        }
      ]
    },
    {
      path:'/pemilih',
      redirect:'/pemilih/dashboard',
      name:'Home',
      component:TheContainerPemilih,
      children:[
        {
          path:'dashboard',
          name:'Dashboard',
          component:PemilihDashboard
        },
        {
          path:'quick-count',
          name:'Quick Count',
          component:QuickCount
        },
        {
          path:'hasil-pemilihan',
          name:'Hasil Pemilihan',
          component:HasilPemilihan
        },
        {
          path:'data',
          name:'Data Pemilih',
          component:PemilihData
        },
        {
          path:'password',
          name:'Update Password',
          component:UpdatePassword
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login/user', '/login/administrator'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  if(authRequired && !loggedIn){
    next('/');
  }else{
    next();
  }
});

export default router;