<template>
  <div>
    <div class="mb-3">
      <b-button v-b-toggle href="#example-sidebar" @click.prevent>Toggle Sidebar</b-button>
    </div>

    <b-sidebar id="example-sidebar" title="Sidebar" shadow>
      <div class="px-3 py-2">
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
        in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
      </div>
    </b-sidebar>
  </div>
</template>

<script>
  export default {
    name: 'Pruebas',
    components: {

    },

  }
</script>