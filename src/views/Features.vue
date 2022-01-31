<template>
  <div class="p-2 p-sm-3">
    <h4 v-if="category.thereIsSelected">{{category.name}}</h4>
    <h4 v-else>Lista de Productos</h4>
    <div class="path d-inline-block">
      <div class="d-inline-block" v-for="(el, index) in path" :key="'path-'+index">
        <span v-show="index!=0">&nbsp;> </span>
        <router-link :to="el.path">{{el.text | filterFirstUpperCase}}</router-link>
      </div>
    </div>
    <span v-show="category.thereIsSelected">&nbsp;> Features</span>

    <!--Listar productos-->
    <ProductsList :idCategory="category.id"/>
  </div>
</template>

<script>
  import ProductsList from '@/components/ProductsList.vue'

  export default {
    name: 'Features',
    components:{
      ProductsList,
    },
    data() {
      return {}
    },
    computed: {
      path() {
        let response = [];
        let p = this.$route.path;
        p = p.slice(1, p.legth).split('/');
        let s = '';
        for (let i = 0; i < p.length; i++) {
          if (i == 2) {
            s = s.concat('/' + p[i]);
            continue;
          }
          s = s.concat('/' + p[i]);
          response.push({
            path: s,
            text: p[i]
          })
        }
        return response;
      },
      category() {
        if (!(this.$route.params.idCategory)) //no hay categoria
          return {thereIsSelected:false,id:null,name:null};
        else
          return {thereIsSelected:true,id:parseInt(this.$route.params.idCategory),name:this.$route.params.nameCategory};
      }
    },
  }
</script>