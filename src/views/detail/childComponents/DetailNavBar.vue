<template>
  <div>
      <NavBar class="nav-bar">
        <div slot="left" class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot="center" class="title">
          <div class="title-item"
               v-for="(item,index) in titles"
               :class="{active:index===currentIndex}"
               @click="titleClick(index)">{{item}}</div>
        </div>
      </NavBar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    components:{
      NavBar
    },
    data(){
      return{
        titles:['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },

    methods:{
      titleClick(index){
        this.currentIndex=index
        this.$emit('titleClick',index)
      },

      //点击返回按钮，进行返回
      backClick(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .nav-bar{
    background: #fff;
    position: relative;
    z-index: 9;
  }
.title{
  display: flex;
  font-size: 13px;
}

  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }

  .back img{
    margin-top: 10px;
  }
</style>
