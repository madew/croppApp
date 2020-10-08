import Vue from 'vue';
import VueRouter from 'vue-router';
import ProductList from '@/views/ProductList.vue';
import ProductEdit from '@/views/ProductEdit.vue';
import NProgress from 'nprogress';
import store from '@/store/index';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'prodcut-list',
    component: ProductList
  },
  {
    path: '/product/id/:id',
    name: 'product-edit',
    component: ProductEdit,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      store
        .dispatch('fetchProduct', routeTo.params.id)
        .then(product => {
          routeTo.params.product = product;
          next();
        })
        .catch(error => {
          console.log('hmm');
          if (error.response && error.response.status == 404) {
            next({ name: '404' });
          }
        });
    }
  },
  {
    path: '/404',
    name: '404',
    component: NotFound
  },
  {
    path: '*',
    redirect: { name: '404' }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
