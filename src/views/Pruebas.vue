<template>
  <div>
    Pruebas ...
    <br><br><br><br><br>
    <div v-for="el in getProducts" :key="el.id">
      <BtnSubtractAdd :id="el.id" :stock="el.stock" :initialQuantity="valor"/>
      <br><br>
    </div>
    <button @click="clickme">click</button>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import BtnSubtractAdd from '@/components/BtnSubtractAdd.vue'

  export default {
    name: 'Pruebas',
    components: {
      BtnSubtractAdd
    },
    data() {
      return {
        valor:0,
      }
    },
    computed: {
      ...mapGetters(['getProducts']),
    },
     created() {
      this.$store.dispatch('products');
    },
    methods: {
      test(){
        console.log('agregar')
      },
      clickme(){
        console.log('antes de cambiar valor en prueba '+this.valor)
        this.valor+=1;
         console.log('despues de cambiar valor en prueba '+this.valor)
      }
    }
  }
</script>