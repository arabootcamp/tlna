<template>
  <div>
    <b-container fluid class="mt-2 px-2">
      <!-- Stack the columns on mobile by making one full-width and the other half-width -->
      <b-row v-for="el in cartProducts" :key="'cart'+el.id" class="g-1">
        <b-col cols="5" class="mt-2" v-if="el.quantity!=0">
          <p class="my-0">{{el.name}}</p>
          <p class="my-0">{{el.price | filterPriceFormat}}</p>
        </b-col>
        <b-col cols="3" class="mt-2" v-if="el.quantity!=0">
          <!--Escuchando evento emitido por el hijo boton-->
          <BtnSubtractAdd class="my-3" @btnSaysTheQuantityIs="setQuantityInCart" :id="el.id" :stock="el.stock"
            :initialQuantity="el.quantity" :zeroQuantityIsToDelete="true"/>
        </b-col>
        <b-col cols="4" class="mt-2 d-flex justify-content-end" v-if="el.quantity!=0">Sub-total:
          {{el.price*el.quantity | filterPriceFormat}}
        </b-col>
      </b-row>
      <b-row v-if="totalPurchase>0">
        <b-col cols="7" class="mt-4 d-flex justify-content-end">
          <strong>Total</strong>
        </b-col>
        <b-col cols="5" class="mt-4 d-flex justify-content-end">
          <strong>
            {{totalPurchase | filterPriceFormat}}
          </strong>
        </b-col>
      </b-row>
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