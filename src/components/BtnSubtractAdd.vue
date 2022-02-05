<template>
  <div class="d-inline-block">
    <div class="d-flex">
      <button class="box box--less"
        v-bind:class="[(min==1 && (max==0 || quantity==1)) ? 'bg-secondary' : 'bg-danger', '']"
        @click.stop="handleClick(id,-1)">-</button>
      <span class="box box--quantity">{{(min==1 && max==0)?0:quantity}}</span>
      <button class="box box--more" :class="[(max==quantity || max==0) ? 'bg-secondary' : 'bg-primary', '']"
        @click.stop="handleClick(id,1)">+</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BtnSustractAdd',
    data() {
      return {}
    },
    props: {
      id: {
        type: Number,
        required: true
      },
      min: {
        type: Number,
        required: true
      },
      max: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
    methods: {
      handleClick(id, num) {
        let newNum = this.quantity + num;
        if(this.max==0 && this.min==1){
          this.$swal.fire('No hay stock ...');
          return
        }
        if (newNum < this.min) {
          this.$swal.fire('La cantidad mínima debe ser ... ' + this.min);
          return
        }
        if (newNum > this.max  && this.min==1) {
          this.$swal.fire('La cantidad máxima debe ser ... ' + this.max);
          return
        }
        this.$emit('btnSaysTheQuantityIs', {
          id: this.id,
          num,
        })
      }
    }
  }
</script>

<style scoped>
  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    border: none;
    color: white;
    min-width: 36px;
    height: 36px;
  }

  .box--quantity {
    padding: 0 8px;
    background-color: rgb(240, 234, 234);
    color: #212529;
    border-top: 1px solid #6C757D;
    border-bottom: 1px solid #6C757D;
  }
</style>