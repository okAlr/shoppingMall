<template>
  <div class="detail">
    <DetailNavBar @titleClick="titleClick" ref="detailBavbar"></DetailNavBar>
    <scroll
            class="content"
            ref="scroll"
            :probeType="3"
            @scroll="contentScroll">
      <DetailSwiper :top-images="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imgLoad"></DetailGoodsInfo>
      <DetailParamInfo ref="params" :param-info="paramInfo"></DetailParamInfo>
      <DetailCommentInfo ref="comment" :comment-info="commentInfo"></DetailCommentInfo>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <DetailBottomBar @addCart="addToCart"></DetailBottomBar>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
  import DetailNavBar from "./childComponents/DetailNavBar";
  import DetailSwiper from "./childComponents/DetailSwiper";
  import DetailBaseInfo from "./childComponents/DetailBaseInfo";
  import DetailShopInfo from "./childComponents/DetailShopInfo";
  import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
  import DetailParamInfo from "./childComponents/DetailParamInfo";
  import DetailCommentInfo from "../home/childComponents/DetailCommentInfo";
  import DetailBottomBar from "./childComponents/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";

  import {itemListenerMixin,backTopMixin} from "common/mixin";
  import {debounce} from "common/utils";

  import {mapActions} from 'vuex'


  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },

    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },

    mixins: [itemListenerMixin,backTopMixin],

    created() {
      // 1 保存传入的 iid
      this.iid = this.$route.params.iid

      //  2 根据 iid 请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res)
        //  1 获取顶部的轮播图数据
        const data = res.result
        this.topImages = data.itemInfo.topImages

        //  2 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)


        //  3 创建店铺信息
        this.shop = new Shop(data.shopInfo)

        //  4 保存商品的详情数据
        this.detailInfo = data.detailInfo

        //  5 获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //  6 取出评论信息(注意：不是所有的都有评论信息，所以要做一个判断）
        if (data.rate.cRate != 0) {
          this.commentInfo = data.rate.list[0]
        }


        // this.$nextTick(()=>{
        //   // 根据最新的数据，对应的DOM已经被渲染出来
        //   // 但是图片依然没有加载完（目前获取到的offsetTop不包含其中的图片）
        //   // offsetTop 值不对的时候，一般都是图片没加载完的问题
        //   this.themeTopYs.push(0);
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // })
      })

      //  3  请求推荐数据
      getRecommend().then(res => {
        // console.log(res)
        this.recommends = res.data.list
      })

      // 4 给 getThemeTopY 赋值（对给 this.getThemeTopY 赋值的操作进行防抖）
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs)
      }, 100)
    },

    mounted() {

    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImageListener)
    },
    methods: {

      ...mapActions(['addCart']),

      imgLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        // console.log(index)
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },

      contentScroll(position) {
        // console.log(position)
        //  1 获取 y 值
        const positionY = -position.y

        //  2 positionY 的值和主题值的值进行对比
        //  【0，7920，9120，9452】
        //   positionY 在 【0，7920】 之间，index=0
        //   positionY 在 【7920，9120】 之间，index=1
        //   positionY 在 【9120，9452】 之间，index=2
        //   positionY 在 大于 9452，index=3
        let length = this.themeTopYs.length
        for (let i in this.themeTopYs) {
          // console.log(i) // 注意是字符串类型
          i = parseInt(i)

          if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) ||
              (i === length - 1 && positionY >= this.themeTopYs[i]))) {

            this.currentIndex = i
            this.$refs.detailBavbar.currentIndex = this.currentIndex

            console.log(this.currentIndex)
          }
        }

      //  3 是否显示回到顶部
        this.listenShowBackTop(position)
      },

      // 4 添加购物车
      addToCart(){
      //  1.获取购物车需要展示的信息
        const product={}
        product.image=this.topImages[0];
        product.title=this.goods.title;
        product.desc=this.goods.desc;
        product.price=this.goods.realPrice;
        product.iid=this.iid;


      //  2. 将商品添加到购物车里面
      //  调用 mutations里面的方法
      //     this.$store.commit('addCart',product)

      //  调用 actions 里面的方法
        this.$store.dispatch('addCart',product).then(res=>{
          // 在添加购物车成功的时候，显示弹窗
          this.$toast.show(res,1500)

          console.log(res)
        })
      }
    }
  }
</script>

<style scoped>
  .detail {
    height: 100vh;
    background-color: #fff;
    /*为了在 detail 页面将 tabbar 盖住隐藏*/
    position: relative;
    z-index: 2;
  }

  .content {
    background-color: #fff;
    height: calc(100% - 44px);
  }

</style>
