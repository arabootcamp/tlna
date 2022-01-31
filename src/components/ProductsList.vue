<template>
  <div class="py-2">

    <b-container fluid class="bv-example-row my-3">
      <div v-if="productsToShow.length==0" class="alert alert-warning" role="alert">
        No hay productos a mostrar
      </div>
      <b-row class="g-3" v-else>
        <b-col cols="12" sm="6" lg="4" xl="3" v-for="el in productsToShow" :key="'prod-'+el.id"
          class="position-relative">
          <b-card style="max-width: 20rem;" class="h-100 mx-auto">
            <div class="position-relative">
              <img :src="el.attributes[0].icon" alt="imagen">
              <div class="position-absolute bottom-0 start-0">
                <p v-if="parseInt(el.stock)==0" class="bg-danger text-light px-2 my-0">No hay Stock</p>
                <p v-else class=" bg-success text-light px-2 my-0">Disponible</p>
              </div>
            </div>

            <b-card-body class="px-0">
              <b-card-title>{{el.attributes[0].name}}</b-card-title>
              <b-card-text>
                {{el.price | filterPriceFormat}}<br>
              </b-card-text>
              <!--Botones añadir quitar-->
              <div class="bg-dark d-flex justify-content-between align-items-center">
                <BtnSubtractAdd @btnSaysTheQuantityIs="setQuantityInCard" :id="el.id" :stock="el.stock" :initialQuantity="quantityToInsert[el.id]"/>
                <BIconCartPlusFill class="flex-grow-1 fs-2 pe-2"
                  @click="insertQuantity(el.id,el.attributes[0].icon,el.name,el.code,el.price,el.description, el.stock)"
                  :class="[(el.stock==0) ? 'text-secondary' : 'text-light btn-add', '']" />
              </div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <!--Modal -->
    <b-modal id="modal-prevent-closing" ref="modal" :title="modal.title" @hidden="resetModal" @ok="handleOk"
      cancel-title="Seguir Comprando" ok-title="Agregar al Carro">
      <b-container fluid class="mx-2">
        <b-row>
          <b-col cols="6">
            <img :src="modal.icon" alt="imagen">
          </b-col>
          <b-col cols="6">
            <span class="d-block"><strong>Nombre: </strong> {{modal.name}}</span>
            <span class="d-block"><strong>Código: </strong> {{modal.code}}</span>
            <span class="d-block"><strong>Precio: </strong> {{modal.price | filterPriceFormat}}</span>
            <BtnSubtractAdd class="my-3" @btnSaysTheQuantityIs="setQuantityInModal" :id="modal.id" :stock="modal.stock" :initialQuantity="modal.quantity"/>
            <span class="d-block"><strong>Sub-total: </strong> {{modal.price*modal.quantity | filterPriceFormat}}</span>
          </b-col>
          <b-col cols="12">{{modal.descripcion}}</b-col>
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  import BtnSubtractAdd from '@/components/BtnSubtractAdd.vue'

  export default {
    name: 'ProductsList',
    components: {
      BtnSubtractAdd,
    },
    data() {
      return {
        quantityToInsert: {
        },
        modal: {
          id: null,
          title: "Producto Agregado",
          icon: null,
          name: null,
          code: null,
          price: null,
          quantity: null,
          description: null,
          stock: null,
        },
      }
    },
    props: {
      idCategory: {
        type: Number,
        default: null
      },
    },
    computed: {
      ...mapGetters(['getProducts', 'getCart']),
      productsToShow() {
        if (this.idCategory == null) {
          return this.getProducts;
        }
        let productList = [];
        this.getProducts.forEach(el => {
          if (el.category.id == this.idCategory)
            productList.push(el);
        });
        return productList;
      },
    },
    methods: {
      setQuantityInCard(dataBtn) {
        this.quantityToInsert[dataBtn.id] = dataBtn.quantity;
      },
      setQuantityInModal(dataBtn) {
        this.modal.quantity = dataBtn.quantity;
      },
      insertQuantity(id, icon, name, code, price, description, stock) {
        //modal
        if (stock == 0) {
          this.$swal.fire("No hay stock");
          return;
        }

        //si no esta creado la key la creamos para insertar 1 cantidad al carro
        if (!(this.quantityToInsert[id]))
          this.quantityToInsert[id] = 1;

        //llamar al modal
        this.modal.id = id;
        this.modal.icon = icon;
        this.modal.name = name;
        this.modal.code = code;
        this.modal.price = price;
        this.modal.quantity = this.quantityToInsert[id];
        this.modal.description = description;
        this.modal.stock = stock;
        console.log('stock antes: '+stock)
        this.$bvModal.show('modal-prevent-closing')

      },
      resetModal() {
        this.id = null;
        this.modal.icon = null;
        this.modal.name = null;
        this.modal.code = null;
        this.modal.price = null;
        this.modal.quantity = null;
        this.modal.description = null;
        this.modal.stock = null;
      },
      handleOk() {
        this.$store.dispatch('insertModalQuantity', {
          id: this.modal.id,
          name: this.modal.name,
          price: this.modal.price,
          quantity: this.modal.quantity
        });
        this.resetModal();
        this.quantityToInsert[this.modal.id]=1;
        this.$swal.fire(`Producto ingresado`);
      },
    }

  }
</script>

<style scoped>
  img {
    width: 100%;
    height: 220px;
    object-fit: cover;
  }

  .btn-add:hover {
    color: #FFC107 !important;
  }
</style>