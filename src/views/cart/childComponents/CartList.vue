<template>
  <div class="cart-list">
    <Scroll class="content" ref="scroll">
      <CartListItem
              v-for="(item,index) in cartList"
              :item-info="item"
              :key="index"></CartListItem>
    </Scroll>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Scroll from "components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";

  export default {
    name: "CartList",
    computed:{
      ...mapGetters(['cartList'])
    },
    components:{
      Scroll,
      CartListItem
    },

    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
.cart-list{
  height: 100vh;
}

  .content{
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>
