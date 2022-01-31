<template>
  <div>
    Pruebas
    <br><br><br><br><br>
    <div v-for="el in getProducts" :key="el.id">
      <BtnSubtractAdd />
      <br><br>
    </div>
    <b-button @click="test">Click</b-button>
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
      }
    }
  }
</script>