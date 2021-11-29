// mixins 是解决 vue 中的重复代码的
import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";

//使用 debounce 防抖函数进行滚动监听，一旦触底，就触发下拉加载更多事件，加载更多图片
export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null,
      refresh: null
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 200);
    this.itemImageListener = () => {
      this.refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImageListener)
  }
}


//点击回到最顶部
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = (-position.y) > 1000
    }

  }
}
