<template>
  <div class="header">
    <b-container fluid class="p-0">
      <b-row class="g-0">
        <!--Logo-->
        <b-col cols="12" md="4" lg="3"
          class="header header__logo d-flex justify-content-center align-items-center border border-dark">
          <h2>LOGO</h2>
        </b-col>
        <!--Buscador y bolsa-->
        <b-col cols="12" md="8" lg="9" class="header header__search border border-dark">
          <div
            class="h-100 py-3 py-sm-0 d-flex flex-column align-items-center flex-sm-row justify-content-center justify-content-md-end">
            <div class="border border-secondary rounded-pill ps-1 pe-3">
              <BIconSearch />
              <input type="search" placeholder="Buscador de Producto y Categorías" size=32 class="border-0">
            </div>
            <div class="pt-3 pt-sm-0 d-flex flex-column align-items-center ms-md-3 me-md-4" @click="showCart=!showCart">
              <div class="position-relative">
                <BIconBagFill class="fs-2" />
                <span
                  class="d-block px-2 bg-danger text-light rounded-pill position-absolute  top-50 start-100 translate-middle">{{totalQuantity}}</span>
              </div>
              <i>bolsa</i>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <Cart v-if="showCart" class="position-custom" />
  </div>
</template>

<script>
  import Cart from '@/components/Cart.vue'
  import {
    mapGetters
  } from 'vuex';

  export default {
    name: 'Header2',
    components: {
      Cart,
    },
    data() {
      return {
        showCart: false,
      }
    },
    computed: {
      ...mapGetters(['getCategories', 'getSelectedCategory', 'getProducts', 'getCart']),
      totalQuantity() {
        let total = 0;
        this.getCart.forEach(el => {
          total += el.quantity;
        });
        return total;
      }
    }
  }
</script>

<style scoped>
  .header__logo,
  .header__search {
    min-height: 80px;
  }

  .position-custom {
    background-color: rgb(243, 243, 224);
    border: 1px solid gray;
    position: absolute;
    width: 300px;
    min-height: calc((100vh - 80px) / 2);
    top: 80px;
    right: 0;
    z-index: 5;
  }

  @media (min-width: 768px) {
    .position-custom {
      width: 500px;
    }

  }
</style>