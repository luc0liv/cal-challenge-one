<template>
  <div>
    <loading
      v-model:active="loading"
      :can-cancel="true"
      :is-full-page="true"
      :color="spinnerColor"
      :background-color="spinnerOverlayColor"
    />
    <div class="search-wrapper">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Pesquisa"
        class="input-style"
      />
      <button @click="searchProducts" class="button-style">Buscar</button>
    </div>
    <div v-if="products && products.length" class="products-list">
      <div v-for="(product, index) in products" :key="index" class="product">
        {{ product }}
      </div>
    </div>
    <div v-else>Não há produtos para exibir</div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { getProducts } from "../api/products";
import { Product } from "../interfaces/products";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

@Options({ components: { loading: Loading } })
export default class SearchComponent extends Vue {
  searchTerm = "";
  products: Product[] = [];
  loading = false;
  spinnerColor = "#a551d3";
  spinnerOverlayColor = "#c5a2d370";

  mounted() {
    this.searchTerm = "camisa";
    this.searchProducts();
  }

  async searchProducts() {
    if (this.searchTerm === "") {
      alert("Preencha o campo de pesquisa");
      return;
    }
    this.loading = true;
    try {
      const response = await getProducts(this.searchTerm);
      this.products = response;
      this.searchTerm = "";
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/search.scss";
</style>
