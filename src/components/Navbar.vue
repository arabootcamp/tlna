<template>
  <div class="p-2 p-sm-3">
    <div class="d-flex justify-content-between align-items-center">
      <strong class="ms-0">Categorías</strong>
      <a v-b-toggle.collapse-1>
        <BIconList class="fs-2" /></a>
    </div>
    <b-collapse id="collapse-1" class="mt-2">
      <ul v-for="el in getCategories" :key="'cat-'+el.id" class="mx-0 px-0 ">
        <li class="d-flex justify-content-between align-items-center">
          <router-link :to="{name:'features', params:{idCategory:el.id,nameCategory:el.name} }"
            class="custom-rl flex-grow-1 position-relative">
            <div class="active-box" v-show="el.name==selectedCategory"></div>
            <span>{{ el.name}}</span>
          </router-link>
          <BIconChevronRight v-show="el.name==selectedCategory" />
        </li>
      </ul>
    </b-collapse>
    <div class="box-cat"></div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';

  export default {
    name: 'Navbar',
    computed: {
      ...mapGetters(['getCategories']),
      selectedCategory() {
        return this.$route.params.nameCategory;
      }
    },
  }
</script>

<style scoped>
  a {
    text-decoration: none !important;
    color: black !important;
  }

  .active-box {
    display: inline-block;
    width: 10px;
    height: 16px;
    background-color: gray;
    position: absolute;
    top: calc(50% - 8px);
    left: -14px;
  }

  .custom-rl:hover {
    background-color: rgb(237, 251, 210) !important;
  }

</style>