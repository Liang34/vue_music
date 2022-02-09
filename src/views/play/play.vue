<template>
  <div class="player" v-show="playlist.length">
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <div class="filter"></div>
          <img :src="currentSong.image" width="100%" height="100%" />
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="fa-angle-down iconfont icon-fanhui1"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle" @click="changeMiddle">
          <transition name="middleL">
            <div class="middle-l" v-show="currentShow === 'cd'">
              <div class="cd-wrapper">
                <div class="cd" :class="cdCls" >
                  <img :src="currentSong.image" class="image">
                </div>
              </div>
            </div>
          </transition>
          <transition name="middleR">
            <scroll
              class="middle-r"
              ref="lyricScrollRef"
              v-show="currentShow === 'lyric'"
            >
              <div class="lyric-wrapper">
                <div v-if="currentLyric" ref="lyricListRef" class="currentLyric">
                  <p
                    class="text"
                    :class="{'current': currentLineNum ===index}"
                    v-for="(line,index) in currentLyric.lines"
                    :key="line.num"
                  >
                    {{line.txt}}
                  </p>
                </div>
                <div class="no-lyric" v-show="pureMusicLyric">
                  <p>{{pureMusicLyric}}</p>
                </div>
              </div>
            </scroll>
          </transition>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChangeEnd="percentChangeEnd" @percentChange="percentChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left" >
              <i class="iconfont" :class="iconMode" @click="changeMode"></i>
            </div>
            <div class="icon i-left" >
              <i class="iconfont icon-shangyishoushangyige" @click="prev"></i>
            </div>
            <div class="icon i-center" >
              <i class="iconfont icon-tingzhi" @click="togglePlaying" :class="playIcon"></i>
            </div>
            <div class="icon i-right" >
              <i class="iconfont icon-xiayigexiayishou" @click="next"></i>
            </div>
            <div class="icon i-right">
              <i class="iconfont icon-xihuan"  @click="toggleFavorite(currentSong)" :class="getFavoriteIcon(currentSong)"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 小播放器 -->
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click.stop="open">
        <div class="icon">
          <img :class="cdCls"  :src="currentSong.image" width="50" height="50">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <div class="desc" v-html="currentSong.singer"></div>
        </div>
        <div class="control" @click.stop="togglePlaying">
          <progress-circle :radius="32" :percent="percent">
            <i class="iconfont icon-shangsanjiaoxing" :class="miniIcon"></i>
          </progress-circle>
        </div>
        <div class="control" @click.stop="showPlaylist">
          <i class="iconfont icon-gedan"></i>
        </div>
      </div>
    </transition>
    <play-list @stopMusic="stopMusic" ref="playlistRef"></play-list>
    <audio
      ref="audioRef"
      @pause="pause"
      @canplay="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import useLyric from './use-lyric'
import { getSong } from 'service/song'
import scroll from 'components/base/scroll/scroll.vue'
import progressBar from 'components/player/progress-bar'
import progressCircle from 'components/player/progress-circle'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/utl'
import playList from 'components/play-list/play-list'
export default {
  components: { scroll, progressBar, progressCircle, playList },
  setup () {
    // data
    const currentShow = ref('cd') // 显示封面还是歌词
    const duration = ref(0)
    const audioRef = ref()
    const cdCls = computed(() => playing.value ? 'play' : 'play pause') // 控制是否旋转
    const songReady = ref(false)
    const currentTime = ref(0)
    const percent = ref(0)
    const playlistRef = ref()
    const iconMode = computed(() => {
      if (mode.value === playMode.sequence) {
        return 'icon-shunxubofang'
      } else if (mode.value === playMode.loop) {
        return 'icon-danquxunhuan'
      } else {
        return 'icon-suijibofang'
      }
    })
    const miniIcon = computed(() => {
      return playing.value ? 'iconfont icon-shixinzhengfangxing fa-stop' : 'fa-play'
    })
    // store
    const store = useStore()
    const playlist = computed(() => store.getters.playlist)
    const fullScreen = computed(() => store.getters.fullScreen)
    const currentSong = computed(() => store.getters.currentSong)
    const playing = computed(() => store.getters.playing)
    const mode = computed(() => store.getters.mode)
    const sequenceList = computed(() => store.getters.sequenceList)
    const currentIndex = computed(() => store.getters.currentIndex)
    const playIcon = computed(() => playing.value ? 'icon-stop' : 'icon-bofang')
    // hooks
    const {
      currentLyric, currentLineNum, pureMusicLyric,
      playingLyric, lyricScrollRef, lyricListRef,
      playLyric
      // stopLyric
    } = useLyric({
      songReady,
      currentTime
    })
    // watch
    watch(currentSong, async (newSong) => {
      if (!newSong.id) {
        return
      }
      const res = await getSong(newSong.id)
      const url = res.data[0].url
      console.log(res.data[0])
      currentTime.value = 0
      songReady.value = false
      const audioEl = audioRef.value
      audioEl.src = url
      const stop = setInterval(() => {
        duration.value = audioEl.duration
        if (duration.value) {
          clearInterval(stop)
        }
      }, 150)
      audioEl.play()
      store.commit('SET_PLAYING_STATE', true)
    })
    watch(currentTime, (newTime) => {
      percent.value = newTime / duration.value
    })
    // func
    const back = () => {
      store.commit('SET_FULL_SCREEN', false)
    }
    const changeMiddle = () => {
      currentShow.value = currentShow.value === 'cd' ? 'lyric' : 'cd'
    }
    const format = (interval) => {
      interval = interval | 0
      const minute = interval / 60 | 0
      let second = interval % 60
      if (second < 10) {
        second = '0' + second
      }
      return minute + ':' + second
    }
    const updateTime = (e) => {
      currentTime.value = e.target.currentTime
    }
    const percentChange = (percent) => {
      const newCurrentTime = duration.value * percent
      currentTime.value = newCurrentTime
      if (currentLyric.value) {
        currentLyric.value.seek(newCurrentTime * 1000)
      }
    }
    const percentChangeEnd = (percent) => {
      const newCurrentTime = duration.value * percent
      audioRef.value.currentTime = newCurrentTime
      if (playing.value) {
        audioRef.value.play()
        store.commit('SET_PLAYING_STATE', true)
      }
      if (currentLyric.value) {
        currentLyric.value.seek(newCurrentTime * 1000)
      }
    }
    const ready = () => {
      if (songReady.value) {
        return
      }
      songReady.value = true
      playLyric()
      store.dispatch('savePlayHistory', currentSong.value)
      // savePlay(currentSong.value)
    }
    const changeMode = () => {
      const newMode = (mode.value + 1) % 3
      store.commit('SET_PLAY_MODE', newMode)
      let list = null
      if (mode.value === playMode.random) {
        list = shuffle(sequenceList.value)
      } else {
        list = sequenceList.value
      }
      resetCurrentIndex(list)
      store.commit('SET_PLAYLIST', list)
    }
    const resetCurrentIndex = (list) => {
      const index = list.findIndex((item) => {
        return item.id === currentSong.value.id
      })
      store.commit('SET_CURRENT_INDEX', index)
    }
    const prev = () => {
      if (!songReady.value) {
        return
      }
      songReady.value = false
      let index = currentIndex.value - 1
      if (index === -1) {
        index = playlist.value.length - 1
      }
      store.commit('SET_CURRENT_INDEX', index)
      if (!playing.value) {
        togglePlaying()
      }
      songReady.value = false
    }
    const next = () => {
      if (!songReady.value) {
        return
      }
      if (playlist.value.length === 1) {
        loop()
        return
      } else {
        let index = currentIndex.value + 1
        if (index === playlist.value.length) {
          index = 0
        }
        store.commit('SET_CURRENT_INDEX', index)
        if (!playing.value) {
          togglePlaying()
        }
      }
      songReady.value = false
    }
    const loop = () => {
      audioRef.value.currentTime = 0
      audioRef.value.play()
      if (currentLyric.value) {
        currentLyric.value.seek()
      }
    }
    const togglePlaying = () => {
      const audio = audioRef.value
      store.commit('SET_PLAYING_STATE', !playing.value)
      playing.value ? audio.play() : audio.pause()
      if (currentLyric.value) {
        currentLyric.value.togglePlay()
      }
    }
    const isFavorite = (song) => {
      const favoriteList = computed(() => store.getters.favoriteList)
      const index = favoriteList.value.findIndex((item) => {
        return item.id === song.id
      })
      return index > -1
    }
    const getFavoriteIcon = (song) => {
      if (isFavorite(song)) {
        return 'icon-xihuanfill'
      }
      return 'icon-xihuan'
    }
    const toggleFavorite = (song) => {
      if (isFavorite(song)) {
        store.dispatch('deleteFavoriteList', song)
      } else {
        store.dispatch('saveFavoriteList', song)
      }
    }
    const end = () => {
      if (mode.value === playMode.loop) {
        loop()
      } else {
        next()
      }
    }
    const open = () => {
      store.commit('SET_FULL_SCREEN', true)
    }
    const showPlaylist = () => {
      playlistRef.value.show()
    }
    const stopMusic = () => {
      audioRef.value.pause()
    }
    return {
      currentShow,
      audioRef,
      duration,
      currentTime,
      percent,
      // bottomButton
      iconMode,
      changeMode,
      prev,
      next,
      playIcon,
      getFavoriteIcon,
      toggleFavorite,
      togglePlaying,
      // miniPlayer
      open,
      miniIcon,
      showPlaylist,
      playlistRef,
      stopMusic,
      // lyric
      currentLyric,
      currentLineNum,
      pureMusicLyric,
      playingLyric,
      lyricScrollRef,
      lyricListRef,
      // d
      cdCls,
      playlist,
      fullScreen,
      currentSong,
      back,
      changeMiddle,
      format,
      updateTime,
      percentChange,
      percentChangeEnd,
      ready,
      end
    }
  }
}
</script>

<style lang="scss" scoped>
@import "common/style/variable";
.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;
    .background {
      position: absolute;
      left: -50%;
      top: -50%;
      width: 300%;
      height: 300%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(30px);
      .filter {
        position: absolute;
        width: 100%;
        height: 100%;
        background: black;
        opacity: 0.6;
      }
      .filterR {
        position: absolute;
        width: 100%;
        height: 100%;
        background: black;
        opacity: 0.4;
        &.filterR-enter-active, &.filterR-leave-active {
          transition: all  0.3s
        }
        &.filterR-leave-to, &.filterR-enter {
          opacity: 0
        }
        &.filterR-leave {
          opacity: 0.4;
        }
      }
    }
    .top {
      position: relative;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
        .fa-angle-down {
          display: block;
          padding: 5px 9px;
          font-size: 35px;
          color: $color-theme-l;
        }
      }
      .title {
        width: 70%;
        margin: 0 auto;
        padding-top: 10px;
        line-height: 20px;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: $font-size-large;
        font-weight: bold;
        color: $color-text-l;
      }
      .subtitle {
        width: 70%;
        margin: 0 auto;
        line-height: 20px;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: $font-size-small-x;
        color: $color-text-l;
      }
    }
    .middle {
      display: flex;
      align-items: center;
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        &.middleL-enter-active, &.middleL-leave-active {
          transition: all 0.3s
        }
        &.middleL-enter, &.middleL-leave-to {
          opacity: 0
        }
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 15px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            &.play {
              animation: rotate 20s linear infinite;
            }
            &.pause {
              animation-play-state: paused;
            }
            .image {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }
      }
      .middle-r {
        display: inline-block;
        position: absolute;
        top: 0;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
        &.middleR-enter-active, &.middleR-leave-active {
          transition: all 0.2s;
        }
        &.middleR-enter, &.middleR-leave-to {
          opacity: 0;
        }
        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;
          .text {
            line-height: 40px;
            color: $color-text-ggg;
            font-size: $font-size-medium;
            &.current {
              color: #FFF;
            }
          }
          .no-lyric {
            line-height: 40px;
            margin-top: 60%;
            color: $color-text-ggg;
            font-size: $font-size-medium;
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;
        .time {
          color: $color-text-l;
          font-size: $font-size-small;
          flex: 0 0 30px;
          line-height: 30px;
          width: 30px;
          &.time-l {
            text-align: left;
          }
          &.time-r {
            text-align: right;
            color: $color-text-gg;
          }
        }
        .progress-bar-wrapper {
          flex: 1;
        }
      }
      .operators {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          color: $color-theme-l;
          &.disable {
            color: $color-theme;
          }
          i {
            font-size: 30px;
          }
          .mode {
            font-size: 25px;
          }
          &.i-left {
            text-align: right;
          }
          &.i-center {
            padding: 0 20px;
            text-align: center;
            i {
              font-size: 40px;
            }
          }
          &.i-right {
            text-align: left;
          }
          .icon-like {
            color: $color-sub-theme;
          }
        }
      }
    }
    &.normal-enter-active, &.normal-leave-active {
      transition: all 0.4s;
      .top, .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }
    &.normal-enter, &.normal-leave-to {
      opacity: 0;
    }
  }
  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background: rgba(255, 255, 255, 0.85);
    &.mini-enter-active, &.mini-leave-active {
      transition: all 0.4s
    }
    &.mini-enter, &.mini-leave-to {
      opacity: 0
    }
    .icon {
      // flex: 0 0 40px;
      width: 70px;
      padding: 0 10px 0 20px;
      img {
        border-radius: 50%;
        &.play {
          animation: rotate 10s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      overflow: hidden;
      .name {
       margin-bottom: 2px;
       line-height: 14px;
       text-overflow: ellipsis;
       overflow: hidden;
       white-space: nowrap;
       font-size: $font-size-medium;
       color: $color-text;
      }
      .desc {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: $font-size-small;
        color: $color-text;
      }
    }
    .control {
      // flex: 0 0 30px;
      width: 50px;
      padding: 0 10px;
      .icon-play-mini, .icon-pause-mini, .icon-playlist, .iconfont {
        font-size: 30px;
        color: $color-theme-d;
      }
      .iconfont {
        position: relative;
        left: -5px;
        top: -3px;
      }
      .fa-play {
        color: $color-theme-d;
        font-size: 20px;
        position: absolute;
        left: 6.5px;
        top: 4px;
      }
      .fa-stop {
        color: $color-theme-d;
        font-size: 20px;
        position: absolute;
        left: 6.5px;
        top: 4px;
      }
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
