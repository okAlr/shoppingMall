<template>
  <div class="ProfileList">
    <div class="center">
      <div class="mix">
        <div><img src="~assets/img/profile/message.svg" alt=""></div>
        <div class="desc">{{info}}</div>
      </div>
      <div class="mix">
        <div><img src="~assets/img/profile/pointer.svg" alt=""></div>
        <div class="desc">{{shoppingMall}}</div>
      </div>
      <div class="mix">
        <div><img src="~assets/img/profile/vip.svg" alt=""></div>
        <div class="desc">{{card}}</div>
      </div>
    </div>

    <div class="bottom">
      <div class="mix">
        <div><img src="~assets/img/profile/cart.svg" alt=""></div>
        <div class="desc">{{shopping_cart}}</div>
      </div>
      <div class="mix">
        <div><img src="~assets/img/profile/shopping.svg" alt=""></div>
        <div class="desc">{{downLoadApp}}</div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "ProfileList",
    data(){
      return{
        info:'我的消息',
        shoppingMall:'积分商城',
        card:'会员卡',
        shopping_cart:'我的购物车',
        downLoadApp:'下载购物App'
      }
    }
  }
</script>

<style scoped>


  .center{
    border-bottom:20px solid rgba(244,244,243,.5);
  }
  .mix{
    display: flex;
    padding: 15px;
    border-bottom: 1px solid rgba(210,210,210,.3);
    font-size: 18px;
  }
  .mix img{
    width: 25px;
    height: 25px;
    vertical-align: middle;
  }

  .desc{
    padding: 3px 5px;
  }

</style>
