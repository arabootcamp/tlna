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
          break;
        }
      if (!productFoundCart)
        state.cart.push({
          id: data.id,
          name: data.name,
          price: data.price,
          quantity: data.quantity
        })
    },
    /*
    mutaUpdateQuantity: (state, data) => {

      for (let i = 0; i < state.cart.length; i++)
        if (state.cart[i].id == data.id) {
          let newQuantity = state.cart[i].quantity + data.num;
          let newStock = state.cart[i].stock - data.num;
          console.log(newQuantity, newStock)
          if (newQuantity >= 0 && newStock >= 0) {
            console.log("actualizo ....", newStock, newQuantity)
            state.cart[i].stock = newStock;
            state.cart[i].quantity = newQuantity;
            //actualizo el stock de producto 
            for (let i = 0; i < state.products.length; i++)
              if (state.products[i].id == data.id) {
                state.products[i].stock = newStock;
                break;
              }
            state.responseUpdateQuantity = true;
            if (newQuantity == 0)
              state.cart.splice(i, 1);
          } else {
            console.log("no actualizo...")
            state.responseUpdateQuantity = false;
          }
        }
    }*/
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
    insertModalQuantity({
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