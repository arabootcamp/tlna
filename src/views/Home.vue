<template>
  <b-container fluid class="home p-0">
    <b-row class="g-0 border-bottom border-dark">
      <b-col cols="12">
        <Header />
      </b-col>
      <b-col cols="12" md="4" lg="3" class="border border-dark">
        <Navbar />
      </b-col>
      <b-col cols="12" md="8" lg="9" class="border border-dark">
        <router-view />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  // @ is an alias to /src
  import Navbar from '@/components/Navbar.vue'
  import Header from '@/components/Header.vue'

  export default {
    name: 'Home',
    components: {
      Navbar,
      Header,
    },
    created() {
      this.$store.dispatch('categories');
      this.$store.dispatch('products');
    },
  }
</script>