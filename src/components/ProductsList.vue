<template>
  <div class="py-4">
    <div v-if="productsToShow.length==0" class=" alert alert-warning" role="alert">
      No hay productos a mostrar
    </div>
    <div v-else>
      <b-container fluid class="bv-example-row my-3">
        <b-row class="g-3" id="my-container">
          <b-col cols="12" sm="6" lg="4" xl="3" v-for="el in productsPerPage" :key="'prod-'+el.id"
            class="position-relative">
            <b-card style="max-width: 20rem;" class="h-100 mx-auto">
              <div class="h-100 d-flex flex-column justify-content-between">
                <div class="position-relative">
                  <!-- img -->
                  <b-carousel id="carousel-1" :interval="4000" controls label-prev="" label-next="" background="#ababab"
                    style="text-shadow: 1px 1px 2px #333;" class="border border-secondary">
                    <b-carousel-slide v-for="item in el.attributes" :key="'attr'+item.id" class="box-img">
                      <template #img>
                        <img :src="item.icon" alt="img">
                      </template>
                    </b-carousel-slide>
                  </b-carousel>
                  <!-- -->
                  <div class="position-absolute bottom-0 start-0">
                    <p v-if="parseInt(el.stock)==0" class="bg-danger text-light px-2 my-0">No hay Stock</p>
                    <p v-else class=" bg-success text-light px-2 my-0">Disponible</p>
                  </div>
                </div>
                <b-card-body class="px-0">
                  <b-card-title>{{el.name}}</b-card-title>
                  <b-card-text>
                    {{el.price | filterPriceFormat}}<br>
                  </b-card-text>
                </b-card-body>
                <!--Botones añadir quitar-->
                <div class="bg-dark d-flex justify-content-between align-items-center">
                  <BtnSubtractAdd @btnSaysTheQuantityIs="setQuantity" :id="el.id" :min="1" :max="el.stock"
                    :quantity="quantityToInsert[el.id]" />
                  <BIconCartPlusFill class="flex-grow-1 fs-2 pe-2"
                    @click="insertQuantity(el.id,el.attributes[0].icon,el.name,el.code,el.price,el.description, el.stock)"
                    :class="[(el.stock==0) ? 'text-secondary' : 'text-light btn-add', '']" />
                </div>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
      <!--pagination -->
      <div class="mt-5">
        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" align="center">
        </b-pagination>
      </div>
    </div>

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
            <BtnSubtractAdd class="my-3" @btnSaysTheQuantityIs="setQuantity" :id="modal.id" :min="1" :max="modal.stock"
              :quantity="modal.quantity" />
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
        currentPage: 1,
        perPage: 4,
        quantityToInsert: {},
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
      ...mapGetters(['getProducts', 'getCart', 'getQuery', 'getFilteredProducts']),
      productsToShow() {
        if (this.idCategory == null && this.getQuery == "") {
          console.log('NO query listar todos los productos');
          return this.getProducts;
        }
        if (this.idCategory == null && this.getQuery != '') {
          console.log('SI query listar productos filtrados')
          return this.getFilteredProducts;
        }

        let productList = [];
        this.getProducts.forEach(el => {
          if (el.category.id == this.idCategory)
            productList.push(el);
        });
        return productList;
      },
      rows() {
        return this.productsToShow.length;
      },
      productsPerPage() {
        let start = this.perPage * (this.currentPage - 1);
        return this.productsToShow.slice(start, start + this.perPage);
      }
    },
    watch: {
      idCategory() {
        this.currentPage = 1;
      },
      productsToShow() {
        this.currentPage = 1;
      }
    },
    methods: {
      setQuantity(dataBtn) {
        this.quantityToInsert[dataBtn.id] = (!(this.quantityToInsert[dataBtn.id])) ? 1 + dataBtn.num : this
          .quantityToInsert[dataBtn.id] + dataBtn.num;
        this.modal.quantity += dataBtn.num;
      },
      insertQuantity(id, icon, name, code, price, description, stock) {
        //modal
        if (stock == 0) {
          this.$swal.fire("No hay stock ...");
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
        this.$bvModal.show('modal-prevent-closing')
      },
      resetModal() {
        this.id = 0;
        this.modal.icon = null;
        this.modal.name = null;
        this.modal.code = null;
        this.modal.price = null;
        this.modal.quantity = null;
        this.modal.description = null;
        this.modal.stock = 0;
      },
      handleOk() {
        this.$store.dispatch('insertQuantityInCart', {
          id: this.modal.id,
          name: this.modal.name,
          price: this.modal.price,
          quantity: this.modal.quantity
        });
        this.resetModal();
        this.quantityToInsert[this.modal.id] = 1; //se resetea a 1 luego de ingresar el producto
        this.$swal.fire(`Producto ingresado`);
      },
    }

  }
</script>

<style scoped>
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .box-img {
    width: 100%;
    height: 220px;
  }

  .btn-add:hover {
    color: #FFC107 !important;
  }
</style>