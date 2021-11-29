<template>
  <div class="ProfileLogin">
    <div class="left-part">
      <img src="~assets/img/profile/avatar.svg" alt="">
    </div>

    <div class="center_part">
      <div class="login">{{title}}</div>
      <div class="phone">
        <img src="~assets/img/profile/phone.svg" alt="">
        <div>{{sec_title}}</div>
      </div>
    </div>

    <div class="right_part">
      <img src="~assets/img/profile/right.svg" alt="">
    </div>

  </div>
</template>

<script>
  export default {
    name: "ProfileLogin",
    data(){
      return{
        title:'登录 / 注册',
        sec_title:'暂无绑定手机号'
      }
    }
  }
</script>

<style scoped>
.ProfileLogin{
  width: 100%;
  background-color: var(--color-tint);
  display: flex;
  color: #fff;
  padding: 0 15px 15px 15px;
}

  .left-part{
    width: 75px;
    height: 75px;

  }

  .left-part img{
    width: 75px;
    height: 75px;
  }

  .center_part{
    padding-left: 10px;
    flex: 1;
  }

  .center_part img{
    width: 25px;
    height: 25px;
  }

  .login{
    padding: 10px;
    font-size: 18px;
  }

  .phone{
    display: flex;
    padding-left: 6px;
    font-size: 14px;
    text-align: center;
  }

  .phone>div{
    padding-top: 5px;
  }

  .right_part{
    width: 25px;
    height: 25px;
    margin-top: 20px;
  }

.right_part img{
  width: 25px;
  height: 25px;
}

</style>
