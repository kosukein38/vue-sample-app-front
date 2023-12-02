import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShopCustomers from '../views/ShopCustomers.vue'
import ShopCustomersNew from '../views/ShopCustomersNew.vue'
import CustomerDetail from '../views/CustomerDetail.vue'
import ShopCustomersEdit from '../views/ShopCustomersEdit.vue'

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
    component: ShopCustomersNew
  },
  {
    path: '/shop/customers/:id',
    name: 'customerDetail',
    component: CustomerDetail
  },
  {
    path: '/shop/customers/:id/edit',
    name: 'shopCustomersEdit',
    component: ShopCustomersEdit
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
