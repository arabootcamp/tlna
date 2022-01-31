<template>
  <section>
    <b-container fluid class="mt-2 px-2">
      <!-- Stack the columns on mobile by making one full-width and the other half-width -->
      <b-row v-for="el in getCart" :key="'cart'+el.id" class="g-1">
        <b-col cols="5" class="mt-2" v-if="el.quantity!=0">
          <p class="my-0">{{el.name}}</p>
          <p class="my-0">{{el.price | filterPriceFormat}}</p>
        </b-col>
        <b-col cols="3" class="mt-2" v-if="el.quantity!=0">
          <!--Escuchando evento emitido por el hijo boton-->
          <!--<BtnChangeQuantity @clickQuantityBtn="updateProductQuantity" :id="el.id" :quantity="el.quantity" />-->
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
  </section>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';

  export default {
    name: 'Cart',
    components: {
   
    },
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['getCart', 'getResponseUpdateQuantity']),
      totalPurchase() {
        let total = 0;
        this.getCart.forEach(el => {
          total += el.price * el.quantity;
        });
        return total;
      }
    },
    methods: {
      updateProductQuantity(cartProduct) {
        this.$store.commit('mutaUpdateQuantity', {
          id: cartProduct.id,
          num: cartProduct.num
        });
        if (this.getResponseUpdateQuantity == false) {
          if (cartProduct.num < 0)
            this.$swal.fire('La cantidad no puede ser negativa');
          else
            this.$swal.fire('No se puede añadir porque no hay stock');
        }
      },
    }
  }
</script>