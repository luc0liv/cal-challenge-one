<template>
  <div class="home">
    <SearchComponent />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SearchComponent from "@/components/SearchComponent.vue"; // @ is an alias to /src

@Options({
  components: {
    SearchComponent,
  },
})
export default class HomeView extends Vue {}
</script>
