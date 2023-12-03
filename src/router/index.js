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
import ShopKeepedBottles from '../views/ShopKeepedBottles.vue'
import ShopKeepedBottlesCreate from '../views/ShopKeepedBottlesCreate.vue'
import KeepedBottleDetail from '../views/KeepedBottleDetail.vue'
import ShopKeepedBottlesUpdate from '../views/ShopKeepedBottlesUpdate.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
