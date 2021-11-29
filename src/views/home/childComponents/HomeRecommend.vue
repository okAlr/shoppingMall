<template>
  <div class="recomend">
    <div v-for="item in recommend" class="recomend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommend",
    props:{
      recommend:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
.recomend{
  width: 100%;
  display: flex;
  overflow: hidden;
  padding: 6px 0 20px;
  border-bottom: 10px solid #eee;
}
  .recomend-item{
    flex: 1;
    text-align: center;
    font-size: 12px;
  }
.recomend-item img{
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>
