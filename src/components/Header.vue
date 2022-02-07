<template>
  <div class="header fixed-top bg-white">
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
            class="h-100 d-flex flex-column align-items-center justify-content-evenly flex-sm-row justify-content-center justify-content-md-end">
            <div class="border border-secondary rounded-pill ps-1 pe-3">
              <BIconSearch />
              <input type="search" placeholder="Buscador de Producto y Categorías" size=32 class="border-0" v-model="search" @keyup.enter="clickSearch">
            </div>
            <b-button class="d-flex flex-column align-items-center ms-md-3 me-md-4 border border-0 bg-white text-dark"
              v-b-toggle.sidebar-variant>
              <div class="position-relative">
                <BIconBagFill class="fs-2" />
                <span
                  class="d-block px-2 bg-danger text-light rounded-pill position-absolute  top-50 start-100 translate-middle">{{totalQuantity}}</span>
              </div>
              <i>bolsa</i>
            </b-button>
          </div>
        </b-col>
      </b-row>
      <!--Sidebar-->
      <SidebarCart />
    </b-container>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import SidebarCart from '@/components/SidebarCart.vue'

  export default {
    name: 'Header',
    components: {
      SidebarCart
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters(['getCategories', 'getSelectedCategory', 'getProducts', 'getCart','getQuery']),
      totalQuantity() {
        let total = 0;
        this.getCart.forEach(el => {
          total += el.quantity;
        });
        return total;
      },
      //search
      search:{
        get(){
          return this.getQuery;
        },
        set(val){
          this.$store.commit('mutaSetQuery',val);
          this.$router.push('/home/products');
        }
      }
    },
    methods:{
      clickSearch(){
        this.$router.push('/home/products');
      }
    }
  }
</script>

<style scoped>
  .header__logo {
    height: 90px;
  }

  .header__search {
    height: 128px;
  }

  @media (min-width: 576px) {
    .header__search {
      height: 90px;
    }
  }
</style>