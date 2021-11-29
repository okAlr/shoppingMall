<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>

    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",

    methods:{
      addToCart(){
        this.$emit('addCart')
      }
    }
  }
</script>

<style scoped>

  .bottom-bar {
    height: 49px;
    background-color: #fff;
    display: flex;
    /*或者用这种方法,这里的 position: relative; 指的是相对于自己本身之前的位置上移49px*/
    position: relative;
    bottom: 49px;
  }

  .bar-item {
    flex: 1;
    display: flex;
  }

  .bar-item > div {
    flex: 1;
    text-align: center;
  }

  .bar-left .text {
    font-size: 13px;
  }

  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 5px auto 3px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }

  .bar-left .service {
    background-position: 0 -54px;
  }

  .bar-left .shop {
    background-position: 0 -98px;
  }

  .bar-right {
    font-size: 15px;
    color: #fff;
    line-height: 58px;
  }

  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
  }

  .bar-right .buy {
    background-color: #f69;
  }


</style>
