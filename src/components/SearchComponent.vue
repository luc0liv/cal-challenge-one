<template>
  <div>
    <div class="search-wrapper">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Pesquisa"
        class="input-style"
      />
      <button @click="gettingProducts" class="button-style">Buscar</button>
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
<style lang="scss" scoped>
.search-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0px 10px;
  padding: 2rem;
  margin-bottom: 20px;

  .input-style {
    border: 0;
    border-radius: 4px;
    padding: 8px 10px;
    font-size: 0.9rem;
    background: #c5a2d370;
    width: 20%;
  }
  .input-style::placeholder {
    color: #a551d3;
  }
  .button-style {
    color: #a551d3;
    border: 1px solid #a551d3;
    border-radius: 4px;
    background-color: transparent;
    padding: 8px 20px;
  }

  .button-style:hover {
    -webkit-box-shadow: 5px 5px 20px -12px rgba(0, 0, 0, 0.25);
    box-shadow: 5px 5px 20px -12px rgba(0, 0, 0, 0.25);
  }
}

.products-list {
  background: #c5a2d3;
  background: -moz-linear-gradient(
    45deg,
    #c5a2d3 0%,
    #a47aa0 56%,
    #c56ebf 100%
  );
  background: -webkit-linear-gradient(
    45deg,
    #c5a2d3 0%,
    #a47aa0 56%,
    #c56ebf 100%
  );
  background: linear-gradient(45deg, #c5a2d3 0%, #a47aa0 56%, #c56ebf 100%);

  border-radius: 8px;
  margin: 0 auto;
  padding: 2rem;
  min-width: 30%;
  width: max-content;

  .product {
    background-color: #ffffff94;
    border-radius: 4px;
    color: #a551d3;
    margin-bottom: 8px;
    padding: 10px;
  }
}
</style>
