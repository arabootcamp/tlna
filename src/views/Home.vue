<template>
  <b-container fluid class="home p-0">
    <b-row class="g-0 border-bottom border-dark">
      <b-col cols="12">
        <Header />
      </b-col>
      <b-col cols="12" class="space-fixed">
      </b-col>
      <b-col cols="12" md="4" lg="3" class="height-custom border border-dark">
        <Navbar />
      </b-col>
      <b-col cols="12" md="8" lg="9" class="height-custom border border-dark">
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

<style>
  .home {
    min-height: 100vh;
  }

  .space-fixed {
    height: calc(90px + 128px);
  }

  @media (min-width: 576px) {
    .space-fixed {
      height: calc(90px + 90px);
    }
  }

    @media (min-width: 768px) {
    .space-fixed {
      height: 90px;
    }
    .height-custom {
      min-height: calc(100vh - 90px);
    }
  }
</style>