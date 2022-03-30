<template>
  <label for="">
    <input type="search" />
  </label>
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class CustomInput extends Vue {
  // @Prop({ default: ""}) !value: any;
}
</script>
