<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton
              :is-checked="isSelectAll"
              class="check-button" @click.native="checkClick"></CheckButton>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div @click="calcClick" class="calculate">去计算 ({{checkedLength}})</div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },

    computed: {
      totalPrice() {
        return '¥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },

      checkedLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },

      isSelectAll() {
        // 方法1
        // if (this.$store.state.cartList.length===0) return false
        // return !(this.$store.state.cartList.filter(item => !item.checked).length)

        //  方法2：提高性能
        if (this.$store.state.cartList.length === 0) return false
        return !this.$store.state.cartList.find(item => !item.checked)

        //  方法3：普通遍历
        //   for(let item of this.$store.state.cartList){
        //     if (!item.checked){
        //       return false
        //     }
        //   }
        //   return true

      }
    },

    methods: {
      checkClick() {
        if (this.isSelectAll) { // 全部选中
          this.$store.state.cartList.forEach(item => item.checked = false)
        } else { // 部分或全不选中
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      },

      calcClick(){
        if (!this.isSelectAll){
          this.$toast.show('请选择购买的商品',2000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    /*background-color: var(--color-tint);*/
    background-color: #eee;
    /*position: relative;*/
    position: fixed;
    bottom: 49px;
    left: 0;
    right: 0;

    line-height: 40px;
    display: flex;
    font-size: 14px;
  }

  .check-content {
    display: flex;
    align-items: center;
    width: 70px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-left: 10px;
    margin-right: 5px;
  }

  .price {
    margin-left: 30px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background-color: red;
    text-align: center;
    color: #fff;
  }
</style>
