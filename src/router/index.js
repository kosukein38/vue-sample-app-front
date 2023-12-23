import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '../views/WelcomeView.vue'
import HomeView from '../views/HomeView.vue'
import ShopUsers from '../views/ShopUsers.vue'
import ShopUsersCreate from '../views/ShopUsersCreate.vue'
import UserDetail from '../views/UserDetail.vue'
import ShopUsersUpdate from '../views/ShopUsersUpdate.vue'
import ShopCustomers from '../views/ShopCustomers.vue'
import ShopCustomersCreate from '../views/ShopCustomersCreate.vue'
import CustomerDetail from '../views/CustomerDetail.vue'
import ShopCustomersUpdate from '../views/ShopCustomersUpdate.vue'
import ShopBottles from '../views/ShopBottles.vue'
import ShopBottlesCreate from '../views/ShopBottlesCreate.vue'
import BottleDetail from '../views/BottleDetail.vue'
import ShopBottlesUpdate from '../views/ShopBottlesUpdate.vue'
import ShopKeepedBottles from '../views/ShopKeepedBottles.vue'
import ShopKeepedBottlesCreate from '../views/ShopKeepedBottlesCreate.vue'
import KeepedBottleDetail from '../views/KeepedBottleDetail.vue'
import ShopKeepedBottlesUpdate from '../views/ShopKeepedBottlesUpdate.vue'
import ShopDetail from '../views/ShopDetail.vue'
import ShopUpdate from '../views/ShopUpdate.vue'

const routes = [
  {
    path: '/',
    name: 'WelcomeView',
    component: WelcomeView
  },
  {
    path: '/shop',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/shop/users',
    name: 'userList',
    component: ShopUsers
  },
  {
    path: '/shop/users/new',
    component: ShopUsersCreate
  },
  {
    path: '/shop/users/:id',
    name: 'userDetail',
    component: UserDetail
  },
  {
    path: '/shop/users/:id/edit',
    name: 'ShopUsersUpdate',
    component: ShopUsersUpdate
  },
  {
    path: '/shop/customers',
    name: 'customerList',
    component: ShopCustomers
  },
  {
    path: '/shop/customers/new',
    component: ShopCustomersCreate
  },
  {
    path: '/shop/customers/:id',
    name: 'customerDetail',
    component: CustomerDetail
  },
  {
    path: '/shop/customers/:id/edit',
    name: 'ShopCustomersUpdate',
    component: ShopCustomersUpdate
  },
  {
    path: '/shop/bottles',
    name: 'bottleList',
    component: ShopBottles
  },
  {
    path: '/shop/bottles/new',
    component: ShopBottlesCreate
  },
  {
    path: '/shop/bottles/:id',
    name: 'BottleDetail',
    component: BottleDetail
  },
  {
    path: '/shop/bottles/:id/edit',
    name: 'ShopBottlesUpdate',
    component: ShopBottlesUpdate
  },
  {
    path: '/shop/keeped_bottles',
    name: 'shopKeepedBottles',
    component: ShopKeepedBottles
  },
  {
    path: '/shop/customers/:customer_id/keeped_bottles/new',
    name: 'ShopKeepedBottlesCreate',
    component: ShopKeepedBottlesCreate
  },
  {
    path: '/shop/customers/:customer_id/keeped_bottles/:id',
    name: 'KeepedBottleDetail',
    component: KeepedBottleDetail
  },
  {
    path: '/shop/customers/:customer_id/keeped_bottles/:id/edit',
    name: 'ShopKeepedBottlesUpdate',
    component: ShopKeepedBottlesUpdate
  },
  {
    path: '/shop/shop_info',
    name: 'ShopDetail',
    component: ShopDetail
  },
  {
    path: '/shop/edit',
    name: 'ShopUpdate',
    component: ShopUpdate
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
