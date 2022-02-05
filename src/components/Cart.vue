<template>
  <div>
    <b-container fluid class="mt-2 px-2">
      <!-- Stack the columns on mobile by making one full-width and the other half-width -->
      <div v-if="totalPurchase>0">
        <b-row v-for="el in cartProducts" :key="'cart'+el.id" class="g-1">
          <b-col cols="6" sm="5" class="mt-3">
            <p class="my-0">{{el.name}}</p>
            <p class="my-0">{{el.price | filterPriceFormat}}</p>
          </b-col>
          <b-col cols="6" sm="3" class="mt-3 d-flex justify-content-end align-items-center">
            <!--Escuchando evento emitido por el hijo boton-->
            <BtnSubtractAdd @btnSaysTheQuantityIs="setQuantityInCart" :id="el.id" :min="0" :max="el.stock"
              :quantity="el.quantity" />
          </b-col>
          <b-col cols="12" sm="4" class="mt-0 mt-sm-3 d-flex justify-content-end align-items-center">Sub-total:
            {{el.price*el.quantity | filterPriceFormat}}
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="7" class="mt-4 d-flex justify-content-end">
            <strong>Total</strong>
          </b-col>
          <b-col cols="5" class="mt-4 d-flex justify-content-end">
            <strong>
              {{totalPurchase | filterPriceFormat}}
            </strong>
          </b-col>
        </b-row>
      </div>
      <div v-else>
        <b-alert show variant="warning">No hay productos en el carro</b-alert>
      </div>
    </b-container>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import BtnSubtractAdd from '@/components/BtnSubtractAdd.vue'


  export default {
    name: 'Cart',
    components: {
      BtnSubtractAdd,
    },
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['getCart', 'getProducts', 'getResponseUpdateQuantity']),
      cartProducts() {
        let cartProducts = [];
        this.getCart.forEach((el) => {
          for (let i = 0; i < this.getProducts.length; i++)
            if (this.getProducts[i].id == el.id) {
              cartProducts.push({
                ...el,
                stock: this.getProducts[i].stock
              })
              break;
            }
        });
        return cartProducts;
      },
      totalPurchase() {
        let total = 0;
        this.getCart.forEach(el => {
          total += el.price * el.quantity;
        });
        return total;
      }
    },
    methods: {
      setQuantityInCart(dataBtn) {
        this.$store.dispatch('insertQuantityInCart', {
          id: dataBtn.id,
          quantity: dataBtn.num
        });
      }
    }
  }
</script>