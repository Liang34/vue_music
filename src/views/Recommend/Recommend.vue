<!-- 推薦页面 -->
<template>
  <div class="recommend" ref="recommend">
    <scroll class="recommend-content" ref="scroll" :data="discList">
      <div>
        <div class="slider-wrapper" v-if="banners.length>0">
          <slider>
            <div v-for="(item, index) in banners" :key="index">
              <a :href="item.url">
                <img :src="item.pic" alt="">
              </a>
            </div>
          </slider>
        </div>
        <!-- <FourCircles></FourCircles> -->
        <div class="recommend-list" ref="recommendList">
          <h1 class="title">推荐歌单</h1>
          <ul>
            <li class="item" v-for="item in discList" :key="item.id">
              <div class="icon" @click="selectList(item)">
                <div class="gradients"></div>
                <img v-lazy="item.picUrl">
              </div>
              <p class="play-count">
                <i class="fa iconfont icon-erji"></i>
                {{Math.floor(item.playCount / 10000) }}万
              </p>
              <div class="text">
                <p class="name">{{item.name}}</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="recommend-song" ref="recommendSong">
          <h1 class="title">推荐歌曲</h1>
          <ul>
            <li class="item" v-for="item in musicList" :key="item.id" @click="selectSong(item)">
              <div class="icon">
                <img v-lazy="item.image">
              </div>
              <p class="text">{{item.name}}</p>
              <p class="singer">{{item.singer}}</p>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import { createRecommendSong } from 'common/js/song'
import { reqBanner, reqRecommendList, getRecommendMusic } from 'api/recommend'
import Scroll from 'components/Scroll'
import Slider from 'components/Slider'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      banners: [],
      discList: [],
      musicList: []
    }
  },
  created () {
    this.getBanner()
    this.getDiscList()
    this.getMusicList()
  },
  methods: {
    async getBanner () {
      const banners = await reqBanner(2)
      this.banners = banners.banners
    },
    async getDiscList () {
      const discList = await reqRecommendList(30)
      this.discList = discList.result
    },
    async getMusicList () {
      const musicList = await getRecommendMusic()
      const list = musicList.result.map(item => {
        return createRecommendSong(item)
      })
      list.splice(9)
      this.musicList = list
    },
    selectList (item) {
      this.$router.push({
        path: `/recommend/${item.id}`
      })
      this.setMuiscList(item)
      console.log(item)
    },
    ...mapMutations({
      setMuiscList: 'SET_MUSIC_LIST',
      setFullScreen: 'SET_FULL_SCREEN'
    })
  },
  components: {
    Slider,
    Scroll
  }
}

</script>
<style lang='less' scoped>
@import "common/style/variable.less";
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  z-index: 100;
  .recommend-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      position: relative;
      width: 96%;
      margin: 0 auto;
      border-radius: 5px;
      overflow: hidden;
    }
.recommend-list {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  .title {
    height: 65px;
    line-height: 65px;
    padding-left: 1.5%;
    text-align: left;
    font-size: @font-size-medium;
    font-weight: bold;
    color: @color-text;
  }
  .item {
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    width: 33%;
    padding: 0 1%;
    .icon {
      position: relative;
      display: inline-block;
      width: 100%;
      margin-bottom: 5px;
      .gradients {
        position: absolute;
        top: 0;
        width: 100%;
        height: 35px;
        border-radius: 3px;
        background: linear-gradient(rgba(109, 109, 109, 0.4),rgba(255, 255, 255, 0));
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 3px;
      }
    }
    .play-count {
      position: absolute;
      top: 5px;
      right: 8px;
      font-size: @font-size-small-s;
      color: @color-text-l
    }
    .text {
      float: left;
      line-height: 16px;
      text-align: left;
      height: 40px;
      line-height: 16px;
      overflow: hidden;
      margin-bottom: 10px;
      font-size: @font-size-small;
    }
  }
}
.recommend-song {
  margin-top: -20px;
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  .title {
    height: 65px;
    line-height: 65px;
    padding-left: 1.5%;
    text-align: left;
    font-size: @font-size-medium;
    font-weight: bold;
    color: @color-text;
  }
  .item {
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    width: 33%;
    padding: 0 1%;
    .icon {
      position: relative;
      display: inline-block;
      width: 100%;
      margin-bottom: 5px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 3px;
      }
    }
    .text {
      line-height: 16px;
      text-align: left;
      height: 16px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: @font-size-small;
    }
    .singer {
      line-height: 16px;
      margin-bottom: 10px;
      text-align: left;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: @font-size-small;
      color: @color-text-g;
    }
  }
}
  }
}
</style>
