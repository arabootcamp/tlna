<template>
  <div>
    <b-container fluid class="home p-0 m-0">
      <b-row class="g-0 border-bottom border-dark">
        <b-col cols="12" class="space-fixed-header">
          <Header />
        </b-col>
        <b-col cols="12" md="4" lg="3" class="space-fixed-nav border border-dark">
          <Navbar class="custom-fixed" />
        </b-col>
        <b-col cols="12" md="8" lg="9" class="main-height border border-dark">
          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </div>
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
    min-height: 100vh; /*min-height manda desbordamiento en firefox*/ 
  }

  .space-fixed-header {
    height: calc(90px + 128px);
  }

  .space-fixed-nav {
    height: 60px;
  }

  .custom-fixed {
    position: fixed;
    width: calc(100% - 2px);
    top: calc(90px + 128px);
    height: 60px;
    z-index: 50;
  }

  .main-height {
    min-height: calc(100vh - 90px - 128px - 60px);
  }

  @media (min-width: 576px) {
    .space-fixed-header {
      height: calc(90px + 90px);
    }

    .custom-fixed {
      top: calc(90px + 90px);
    }

    .main-height {
      min-height: calc(100vh - 90px - 90px - 60px);
    }
  }

  @media (min-width: 768px) {
    .space-fixed-header {
      height: 90px;
    }

    .space-fixed-nav,
    .main-height {
      min-height: calc(100vh - 90px);
      height: auto;
    }

    .custom-fixed {
      top: calc(90px);
      width: 33.33%;
    }
  }

  @media (min-width: 992px) {
    .custom-fixed {
      left: 0px;
      width: 25%/*calc(3/12*(100vw - 17px)); resto el scroll*/
    }
  }
</style>