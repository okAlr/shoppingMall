<template>
  <div class="wrapper">
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
  import {backTopMixin} from "common/mixin";
  export default {
    name: "Categroy",
    mixins:[backTopMixin]
  }
</script>

<style scoped>

</style>
