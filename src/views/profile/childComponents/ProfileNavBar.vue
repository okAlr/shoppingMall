<template>
  <div class="ProfileNavBar">
    <NavBar>
      <div slot="center">我的档案</div>
    </NavBar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "ProfileNavBar",
    components:{
      NavBar
    }
  }
</script>

<style scoped>
.ProfileNavBar{
  background-color: var(--color-tint);
  color: #fff;
  font-size: 18px;
}
</style>
