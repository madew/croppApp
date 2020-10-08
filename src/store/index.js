import Vue from 'vue';
import Vuex from 'vuex';
import ProductsService from '@/services/ProductsService';

Vue.use(Vuex);

let nextNotificationId = 1;

const store = new Vuex.Store({
  state: {
    products: [],
    notifications: []
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_PRODUCT(state, product) {
      state.products = [product];
    },
    PUSH_NOTIFICATION(state, notification) {
      state.notifications.push({
        ...notification,
        id: nextNotificationId++
      });
    },
    DELETE_NOTIFICATION(state, notificationToRemove) {
      state.notifications = state.notifications.filter(
        notification => notification.id !== notificationToRemove.id
      );
    }
  },
  actions: {
    fetchProducts({ commit }, payload) {
      return ProductsService.searchProduct(
        payload.searchBy,
        payload.inputSearch
      ).then(response => {
        commit('SET_PRODUCTS', response.data);
      });
    },
    fetchProduct({ commit }, id) {
      const product = store.getters.getProductById(id);

      if (product) {
        commit('SET_PRODUCT', product);
        return product;
      } else {
        return ProductsService.getProduct(id).then(response => {
          commit('SET_PRODUCT', response.data);
          return response.data;
        });
      }
    },
    addNotification({ commit }, notification) {
      commit('PUSH_NOTIFICATION', notification);
    },
    removeNotification({ commit }, notificationToRemove) {
      commit('DELETE_NOTIFICATION', notificationToRemove);
    }
  },
  getters: {
    getProductById: state => id => {
      return state.products.find(product => product.id === id);
    }
  }
});

export default store;
