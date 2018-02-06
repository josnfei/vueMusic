<template>
    <div class="recommend" ref="recommend">
      <scroll ref='scroll' class="recommend-content" :data='discList'>  
        <!--:data='discList' 绑定这个,让scroll去监听,因为我数据是异步的
          为什么一开始不去用recommends,因为他也是异步加载的,没处理这个也正常,因为他在调用的时候,是在discList前面,但是也不能保证他数据先回来
          所以 在recommends的时候,可以用onload事件,去判断他,他是靠图片撑开的,所以 当他图片回来的时候,再次调用scroll初始化的方法
        -->
       <div>
          <!-- 轮播图 -->
          <div v-if="recommends.length" class="slider-wrapper">
            <slider :loop='false' :interval=1000>
              <div v-for='item in recommends'>
                <a :href="item.linkUrl">
                  <img  @load='loadImage' class="needsclick" :src="item.picUrl" alt="">
                </a>
              </div>
            </slider>
          </div>
          <!-- 热门歌单推荐  -->
          <div class="recommend-list">
            <h1 class="list-title">热门歌单推荐</h1>
            <ul>
              <li v-for="item in discList" class="item">
                <div class="icon">
                  <img width="60" height="60" v-lazy="item.imgurl">
                </div>
                <div class="text">
                  <h2 class="name" v-html="item.creator.name"></h2>
                  <p class="desc" v-html="item.dissname"></p>
                </div>
              </li>
            </ul>
          </div>
       </div>
      </scroll>
    </div>
  </template>
  
  <script>
    import Slider from 'base/slider/slider';
    import Scroll from 'base/scroll/scroll'
    import {getRecommend, getDiscList} from 'api/recommend';  
    import {ERR_OK} from 'api/config';

    export default{
      data(){
        return{
          recommends:[],
          discList:[]
        }
      },
      created(){
        this._getRecommend();
        this._getDiscList();
        console.log(this);
      },
      methods:{
        // 处理scroll正常
        loadImage(){
          if(!this.checkloaded){ //图片有很多,但是一张回来就够了,执行一次即可
            this.checkloaded=true;
            this.$refs.scroll.refresh(); //再次初始化scroll
          }
        },
        // 请求推荐歌曲列表
        _getDiscList(){
          getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
            // console.log(this.discList);
          }
          })
        },
        // 请求轮播图
        _getRecommend(){
          getRecommend().then(res=>{
            // console.log(res);
            if(res.code===ERR_OK){
              this.recommends=res.data.slider;
              // console.log(res.data);
            }
          })
        }
      },
      components:{
        Slider,
        Scroll
      }
    }
  </script>
  
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>