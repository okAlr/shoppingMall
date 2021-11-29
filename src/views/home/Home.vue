<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <!--    用于 tab-control 的吸顶效果-->
    <tab-control
            ref="tabControl1"
            :titles="['流行','新款','精选']"
            @tabClick="tabClick"
            :class="{fixed:isTabFixed}"
            class="tab-control" v-show="isTabFixed"></tab-control>

    <scroll
            class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banner="banner" @swiperImgLoad="swiperImgLoad"></home-swiper>

      <home-recommend :recommend="recommend"></home-recommend>

      <feature-view></feature-view>

      <tab-control
              ref="tabControl2"
              :titles="['流行','新款','精选']"
              @tabClick="tabClick"></tab-control>

      <goods-list :goods="showGoods"></goods-list>

    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>


    <router-view></router-view>
  </div>
</template>

<script>
  import HomeSwiper from "./childComponents/HomeSwiper";
  import HomeRecommend from "./childComponents/HomeRecommend";
  import FeatureView from "./childComponents/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";

  import {getHomeMultidata, getHomeGoods} from "network/home";

  import {itemListenerMixin, backTopMixin} from "common/mixin";


  export default {
    name: "Home",
    components: {
      HomeSwiper,
      HomeRecommend,
      FeatureView,

      NavBar,
      TabControl,
      GoodsList,
      Scroll
    },
    data() {
      return {
        // result:null
        banner: [],
        recommend: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },

        currentType: 'pop',
        isShowBackTop: false,

        tabOffsetTop: 0,
        isTabFixed: false,

        saveY: 0,


      }
    },
    created() {
      //  1 请求多个数据
      this.getHomeMultidata();

      //  2 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },

    // 进入home页面，设置位置
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },

    // 离开home页面，记录位置
    deactivated() {
      // 1 保存位置
      this.saveY = this.$refs.scroll.getScrollY()

      //  2 取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.itemImageListener)
    },

    mixins: [itemListenerMixin, backTopMixin],
    mounted() {
      // 以下代码可在 mixins 里面混入，看看注释的逻辑含义
      // //  3 监听 goodslistItem 中图片加载完成
      // let refresh=debounce(this.$refs.scroll.refresh,200);
      // // 对监听的事件进行保存
      // this.itemImageListener=()=>{
      //   refresh()
      // }
      // this.$bus.$on('itemImageLoad',this.itemImageListener)

    },

    methods: {
      /*
      * 这是事件监听相关的方法：
      * */


      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },

      // 监听 滚动
      contentScroll(position) {
        // console.log(position)
        // 1 判断 backTop 是否显示
        this.listenShowBackTop(position)

        //  2 决定 tabControl 是否吸顶（position:fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },

      // 加载更多的数据
      loadMore() {
        this.getHomeGoods(this.currentType)
      },

      // 监听轮播图数据是否加载完成
      swiperImgLoad() {
        //  4 获取tabControl 的 offsetTop
        //  所有组件里面都有一个属性 $el:用于获取该组件里面的所有元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /*
      * 以下都是网络请求相关方法：
      * */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          // this.result=res;
          this.banner = res.data.banner.list;
          this.recommend = res.data.recommend.list;
        })
      },

      // 这个请求数据的处理方式非常重要
      getHomeGoods(type) {
        const page = this.goods[type].page + 1 // 因为数据库的 page 是从1开始
        getHomeGoods(type, page).then(res => {
          // console.log(res)
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          // 完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }

    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*下面的属性是：在使用浏览器原生滚动的时候，为了让导航不跟随一起滚动才设置的
    但是现在采用的是 better-scroll ，所以这些也不起效果
    */
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }


  /*.content {*/
  /*  overflow: hidden;*/

  /*  position: absolute;*/
  /*  top: 44px;*/
  /*  bottom: 49px;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*}*/

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    height: calc(100% - 93px);
    overflow: hidden;
    /*margin-top: 44px;*/
  }

</style>

