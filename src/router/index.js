import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShopCustomers from '../views/ShopCustomers.vue'
import ShopCustomersCreate from '../views/ShopCustomersCreate.vue'
import CustomerDetail from '../views/CustomerDetail.vue'
import ShopCustomersUpdate from '../views/ShopCustomersUpdate.vue'
import ShopBottles from '../views/ShopBottles.vue'
import ShopBottlesCreate from '../views/ShopBottlesCreate.vue'
import BottleDetail from '../views/BottleDetail.vue'
import ShopBottlesUpdate from '../views/ShopBottlesUpdate.vue'

const routes = [
  {
    path: '/shop',
    component: HomeView
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
