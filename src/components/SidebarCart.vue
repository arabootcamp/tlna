<template>
  <b-sidebar id="sidebar-variant" title="Resumen de Compra" right shadow backdrop backdrop-variant="dark" width="500px"
    sidebar-class="custom-sidebar">
    <div class="px-3 py-2">
      <Cart />
    </div>
  </b-sidebar>
</template>

<script>
  import Cart from '@/components/Cart.vue'

  export default {
    name: 'SidebarCart',
    components: {
      Cart,
    },
  }
</script>

<style>
  .custom-sidebar {
    height: 100vh !important;
    top: 0 !important;
  }

  @media (min-width: 576px) {
    .custom-sidebar {
      top: calc(90px + 90px) !important;
      height: (100vh - 180px) !important;
    }
  }

  @media (min-width: 768px) {
    .custom-sidebar {
      top: 90px !important;
      height: 70vh !important;
    }
  }
</style>