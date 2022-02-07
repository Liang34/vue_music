<template>
  <div class="rank" ref="rank">
    <scroll class="toplist" ref="scroll">
      <ul class="warp">
        <li class="item"  v-for="item in yunTopList" :key="item.id" @click="selectItem(item)">
          <div class="icon">
            <img :src="item.coverImgUrl" width="100" height="100">
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, index) in item.top" :key="index">
              <span>{{index + 1}}.</span>
              <span>{{song.name}} - {{song.ar[0].name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div v-show="showLoading" class="loading-content">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import { getTop } from 'service/rank'
import { onMounted, ref } from 'vue'
// import Scroll from 'components/Scroll'
// import Loading from 'components/loading/loading'
// import { playlistMixin } from 'common/js/mixin'
// import { mapMutations } from 'vuex'

const YUNMUSIC_TOP = [0, 1, 2, 3, 4, 22, 23]

export default {
  setup () {
    const yunTopList = ref([]) // 排行榜列表
    const getTopList = async () => {
      for (let i = 0; i < YUNMUSIC_TOP.length; i++) {
        const res = await getTop(YUNMUSIC_TOP[i])
        if (res.code === 200) {
          const list = res.playlist
          list.top = res.playlist.tracks.slice(0, 3)
          yunTopList.value.push(list)
          if (i === YUNMUSIC_TOP.length - 1) {
            // this.showLoading = false
          }
        }
      }
    }
    onMounted(() => {
      getTopList()
    })
    return {
      yunTopList
    }
  }
  // data () {
  //   return {
  //     yunTopList: [],
  //     showLoading: true
  //   }
  // },
  // created () {
  //   this._getTopList()
  // },
  // methods: {
  //   selectItem (item) {
  //     this.$router.push({
  //       path: `/rank/${item.id}`
  //     })
  //     this.setTopList(item)
  //   },
  //   handlePlaylist (playlist) {
  //     const bottom = playlist.length > 0 ? '60px' : ''
  //     this.$refs.rank.style.bottom = bottom
  //     this.$refs.scroll.refresh()
  //   },
  //   async _getTopList () {
  //     for (let i = 0; i < YUNMUSIC_TOP.length; i++) {
  //       const res = await getTop(YUNMUSIC_TOP[i])
  //       // console.log(res)
  //       if (res.code === 200) {
  //         const list = res.playlist
  //         list.top = res.playlist.tracks.slice(0, 3)
  //         this.yunTopList.push(list)
  //         if (i === YUNMUSIC_TOP.length - 1) {
  //           this.showLoading = false
  //         }
  //       }
  //     }
  //   },
  //   ...mapMutations({
  //     setTopList: 'SET_TOP_LIST'
  //   })
  // },
  // components: {
  //   Scroll,
  //   Loading
  // }
}
</script>

<style scoped lang="scss" >
@import "common/style/variable";

.rank {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .toplist {
    .warp{
      position: relative;
      width: 96%;
      margin: 0 auto;
      border-radius: 5px;
      overflow: hidden;
    }
    height: 100%;
    overflow: hidden;
    padding-top: 5px;
    .item {
      display: flex;
      margin: 0 10px;
      padding: 3px 0;
      height: 100px;
      border-bottom: 1px solid rgb(228, 228, 228);
      &:last-child {
        padding-bottom: 20px;
      }
      .icon {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
        img {
          border-radius: 3px;
        }
      }
      .songlist {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
        color: $color-text;
        font-size: $font-size-small-x;
        .song {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 30px;
        }
      }
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .loading-content {
    position: fixed;
    width: 100%;
    top: 70%;
    transform: translateY(-50%);
  }
}
</style>
