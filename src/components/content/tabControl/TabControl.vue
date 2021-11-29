<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles"
         class="tab-control-item"
         :class="{active:index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    data() {
      return {
        currentIndex: 0
      }
    },
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },

    methods: {
      itemClick(index) {
        this.currentIndex = index

      //  因为要点击切换数据，所以需要将点击的结果返回给 home 组件
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    font-size: 15px;
    background: #fff;
    z-index: 9;
  }

  .tab-control-item {
    flex: 1;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-high-text);
  }
</style>
