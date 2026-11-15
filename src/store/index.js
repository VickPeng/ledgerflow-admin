import Vue from 'vue'
import Vuex from 'vuex'
import { orders as mockOrders, customers as mockCustomers } from '@/mock/db'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: 'Demo User',
      email: 'demo@ledgerflow.io'
    },
    kpis: {
      monthlyOrders: 328,
      pendingShipment: 47,
      totalCustomers: 26,
      monthlyRevenue: 48200
    },
    orders: [...mockOrders],
    customers: [...mockCustomers]
  },
  mutations: {
    SET_ORDERS(state, orders) {
      state.orders = orders
    },
    SET_CUSTOMERS(state, customers) {
      state.customers = customers
    }
  },
  actions: {
    updateOrderStatus({ commit, state }, { id, status }) {
      const orders = state.orders.map(item =>
        item.id === id ? { ...item, status } : item
      )
      commit('SET_ORDERS', orders)
    },
    addCustomer({ commit, state }, customer) {
      const customers = [...state.customers, customer]
      commit('SET_CUSTOMERS', customers)
    },
    updateCustomer({ commit, state }, customer) {
      const customers = state.customers.map(item =>
        item.id === customer.id ? customer : item
      )
      commit('SET_CUSTOMERS', customers)
    },
    removeCustomer({ commit, state }, id) {
      const customers = state.customers.filter(item => item.id !== id)
      commit('SET_CUSTOMERS', customers)
    }
  },
  getters: {
    customerOptions(state) {
      return state.customers.map(c => ({ value: c.id, label: c.company }))
    }
  }
})
