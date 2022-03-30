<template>
  <div>
    <input type="text" v-model="searchTerm" placeholder="Pesquisa" />
    <button @click="gettingProducts">Buscar</button>
    <div v-for="(product, index) in products" :key="index">{{ product }}</div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { getProducts } from "../api/products";
import { Product } from "../interfaces/products";

export default class SearchComponent extends Vue {
  searchTerm = "";
  products: Product[] = [];
  loading = false;

  async gettingProducts() {
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
