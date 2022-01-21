<!-- 推薦页面 -->
<template>
  <div class="recommend">
    rec
  </div>
  <!-- <div class="recommend" ref="recommend">
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
  </div> -->
</template>

<script>
// import { createRecommendSong } from 'common/js/song'
// import { reqBanner, reqRecommendList, getRecommendMusic } from 'api/recommend'
// import Scroll from 'components/Scroll'
// import Slider from '@/components/base/slider/slider'
// import { mapMutations, mapActions } from 'vuex'

export default {
  // data () {
  //   return {
  //     banners: [],
  //     discList: [],
  //     musicList: []
  //   }
  // },
  // created () {
  //   this.getBanner()
  //   this.getDiscList()
  //   this.getMusicList()
  // },
  // methods: {
  //   async getBanner () {
  //     const banners = await reqBanner(2)
  //     this.banners = banners.banners
  //   },
  //   async getDiscList () {
  //     const discList = await reqRecommendList(30)
  //     this.discList = discList.result
  //   },
  //   async getMusicList () {
  //     const musicList = await getRecommendMusic()
  //     const list = musicList.result.map(item => {
  //       return createRecommendSong(item)
  //     })
  //     list.splice(9)
  //     this.musicList = list
  //   },
  //   selectList (item) {
  //     this.$router.push({
  //       path: `/recommend/${item.id}`
  //     })
  //     this.setMuiscList(item)
  //     console.log(item)
  //   },
  //   ...mapMutations({
  //     setMuiscList: 'SET_MUSIC_LIST',
  //     setFullScreen: 'SET_FULL_SCREEN'
  //   }),
  //   selectSong (item) {
  //     this.insertSong(item)
  //   },
  //   ...mapActions([
  //     'insertSong'
  //   ])
  // },
  components: {
    // Slider
    // Scroll
  }
}

</script>
<style lang='scss' scoped>
</style>
