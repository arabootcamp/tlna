import Vue from 'vue'
import Vuex from 'vuex'

/*
import VuexPersist from 'vuex-persist'
const vuexLocal = new VuexPersist({
  storage: window.sessionStorage
});
*/

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [],
    products: [],
    cart: [],
  },
  getters: {
    getCategories: state => state.categories,
    getProducts: state => state.products,
    getCart: state => state.cart,
  },
  mutations: {
    mutaCategories: (state, data) => state.categories = data,
    mutaProducts: (state, data) => state.products = data,
    mutaStockProduct: (state, data) => {
      for (let i = 0; i < state.products.length; i++)
        if (state.products[i].id == data.id) {
          state.products[i].stock += data.diff;
          break;
        }
    },
    mutaCart: (state, data) => {
      let productFoundCart = false;
      //añado al carrito
      for (let i = 0; i < state.cart.length; i++)
        if (state.cart[i].id == data.id) {
          productFoundCart = true;
          state.cart[i].quantity += parseInt(data.quantity);
          if(state.cart[i].quantity==0)
            state.cart.splice(i,1);
          break;
        }
      if (!productFoundCart)
        state.cart.unshift({
          id: data.id,
          name: data.name,
          price: data.price,
          quantity: data.quantity
        })
    },
  },
  actions: {
    //http://sva.talana.com:8000/api/product-category/
    async categories({
      commit
    }) {

      let response = await fetch('http://sva.talana.com:8000/api/product-category/');
      let data = await response.json();
      commit('mutaCategories', data);
    },
    //http://sva.talana.com:8000/api/product/
    async products({
      commit
    }) {

      let response = await fetch('http://sva.talana.com:8000/api/product/');
      let data = await response.json();
      commit('mutaProducts', data);
    },
    insertQuantityInCart({
      commit
    }, data) {
      //actualizo el carrito
      commit('mutaCart', data)
      //actualizo el stock de producto
      commit('mutaStockProduct', {
        id: data.id,
        diff: -data.quantity
      });
    }
  },
  modules: {}
})