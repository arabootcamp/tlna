<template>
  <div class="d-inline-block">
    <div class="d-flex">
      <button class="box box--less" v-bind:class="[(stock==0) ? 'bg-secondary' : 'bg-danger', '']"
        @click.stop="handleClick(id,-1)">-</button>

      <span class="box box--quantity">{{(stock==0)?0:quantity}}</span>

      <button class="box box--more" :class="[(stock==0 || maxStockClass) ? 'bg-secondary' : 'bg-primary', '']"
        @click.stop="handleClick(id,1)">+</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BtnLessMore',
    data() {
      return {
        quantity:this.initialQuantity,
        maxStockClass: false,
      }
    },
    props: {
      id: {
        type: Number,
        default: null,
      },
      stock: {
        type: Number,
        default: 0,
      },
      initialQuantity: {
        type: Number,
        default: 1,
      },
      //
      zeroQuantityIsToDelete: {
        type: Boolean,
        default: false,
      },
    },
    watch:{
      initialQuantity(){
        this.quantity=this.initialQuantity;
      }
    },
    methods: {
      handleClick(id, num) {
        let newNum = this.quantity + num;

        if (this.stock == 0 || newNum > this.stock) {
          this.$swal.fire('El stock es ' + this.stock);
          return;
        }
        if (newNum < 1 && this.zeroQuantityIsToDelete==false) {
          this.$swal.fire('La cantidad minima debe ser 1');
          return;
        }
        this.maxStockClass = (newNum == this.stock) ? true : false;
        this.quantity = newNum;
        this.$emit('btnSaysTheQuantityIs', {
          id: this.id,
          quantity: this.quantity,
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