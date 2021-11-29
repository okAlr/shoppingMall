<template>
  <NavBar class="nav-bar">
    <div slot="center">购物车({{length}})</div>
  </NavBar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import {mapGetters} from 'vuex'

  export default {
    name: "CartNavBar",
    components:{
      NavBar
    },
    computed:{
      // 两种语法
      // ...mapGetters(['cartLength','cartList'])

      ...mapGetters({
        length:'cartLength'
      })
    }
  }
</script>

<style scoped>
.nav-bar{
  background: var(--color-tint);
  color: white;
}
</style>
