<template>
  <div>
    <ProfileNavBar></ProfileNavBar>
    <ProfileLogin></ProfileLogin>
    <ProfileInfo></ProfileInfo>
    <ProfileList></ProfileList>
  </div>
</template>

<script>
  import ProfileNavBar from "./childComponents/ProfileNavBar";
  import ProfileLogin from "./childComponents/ProfileLogin";
  import ProfileInfo from "./childComponents/ProfileInfo";
  import ProfileList from "./childComponents/ProfileList";

  export default {
    name: "Profile",
    components:{
      ProfileNavBar,
      ProfileLogin,
      ProfileInfo,
      ProfileList
    }
  }
</script>

<style scoped>

</style>
