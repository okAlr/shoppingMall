<template>
  <div>
<!--    导航-->
    <CartNavBar></CartNavBar>

<!--    商品列表-->
    <CartList></CartList>

<!--    底部汇总-->
    <CartBottomBar></CartBottomBar>

  </div>
</template>

<script>
  import CartNavBar from "./childComponents/CartNavBar";
  import CartList from "./childComponents/CartList";
  import Scroll from "components/common/scroll/Scroll";
  import CartBottomBar from "./childComponents/CartBottomBar";

  export default {
    name: "Cart",
    components:{
      Scroll,
      CartNavBar,
      CartList,
      CartBottomBar
    }
  }
</script>

<style scoped>

</style>
