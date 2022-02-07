<!--匹配搜索列表-->
<template>
  <div class="suggest">
    <div class="search-suggest" v-show="!searchShow && query && songs.length > 0">
      <p class="title" v-show="showSinger && showList">最佳匹配</p>
      <div @click="selectItem(suggest.artists[0])" class="search-suggest-item" v-if="suggest.artists && showSinger">
        <img :src="suggest.artists[0].img1v1Url" width="50" height="50">
        <span>歌手：{{suggest.artists[0].name}}</span>
      </div>
      <div @click="selectList(suggest.playlists[0])" class="search-suggest-item" v-if="suggest.playlists && showList">
        <img :src="suggest.playlists[0].coverImgUrl" width="50" height="50">
        <div class="text">
          <p>歌单：{{suggest.playlists[0].name}}</p>
          <p class="singer">{{suggest.albums[0].artist.name}}</p>
        </div>
      </div>
    </div>
    <ul class="suggest-list" ref="suggestList" v-show="!searchShow">
      <li @click="selectSong(item)" class="suggest-item" v-for="(item, index) in songs" :key="index">
        <div class="icon">
          <i></i>
        </div>
        <div class="name">
          <p class="song">{{item.name}}</p>
          <p class="singer">{{item.singer}}</p>
        </div>
      </li>
      <loading v-show="haveMore && query"></loading>
    </ul>
    <div v-show="!haveMore && !songs.length && query" class="no-result-wrapper">
      抱歉，暂无搜索结果
    </div>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { getSearchSongs, getSearchSuggest } from 'service/search'
import { createSearchSong } from 'common/js/song'
export default {
  name: 'suggest',
  props: {
    query: String,
    showSinger: {
      type: Boolean,
      default: true
    },
    showList: {
      type: Boolean,
      default: true
    }
  },
  setup (props, { emit }) {
    const singer = ref(null)
    const suggest = ref({})
    const songs = ref([])
    const hasMore = ref(true)
    const page = ref(0) // 当前页数
    const loadingText = ref('')
    const noResultText = ref('抱歉，暂无搜索结果')
    const searchShow = ref(true)
    // const manualLoading = ref(false)
    watch(() => props.query, async (newQuery) => {
      if (!newQuery) {
        suggest.value = {}
        songs.value = []
        hasMore.value = false
        return
      }
      suggest.value = {}
      songs.value = []
      searchShow.value = true
      page.value = 0
      hasMore.value = true
      search()
    })
    async function search () {
      searchShow.value = false
      hasMore.value = true
      const res = await getSearchSongs(props.query, page.value)
      if (!res.result.songs) {
        hasMore.value = false
        return
      }
      const list = res.result.songs
      const ret = []
      list.forEach((item) => {
        ret.push(createSearchSong(item))
      })
      songs.value = ret
      console.log(songs.value)
      emit('refresh')
      page.value += 30
      const resSearch = await getSearchSuggest(props.query)
      suggest.value = resSearch.result
    }
    const selectSong = () => {
      emit('select')
    }
    return {
      singer,
      songs,
      loadingText,
      noResultText,
      suggest,
      searchShow,
      // loading,
      // noResult,
      // pullUpLoading,
      selectSong
      // selectSinger,
    }
  }
}
</script>
<style scoped lang="scss" >
@import "common/style/variable";

.suggest {
  height: 100%;
  overflow: hidden;
  .search-go {
    font-size: $font-size-medium;
    margin-left: 20px;
    color: $color-theme;
  }
  .search-suggest {
    .title {
      padding-left: 20px;
      padding-bottom: 10px;
      color: $color-theme;
      font-size: 11px;
    }
    .search-suggest-item {
      display: flex;
      align-items: center;
      padding: 8px 20px;
      border-bottom: 1px solid rgb(228, 228, 228);
      font-size: $font-size-medium;
      img {
        flex: 0 0 50px;
        padding-right: 15px;
      }
      .text {
        width: 100%;
        p {
          padding: 3px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .singer {
          font-size: 12px;
          color: $color-text;
        }
      }
    }
  }
  .suggest-list {
    padding-bottom: 30px;
    .suggest-item {
      display: flex;
      padding: 3px 20px;
      height: 50px;
      align-items: center;
      border-bottom: 1px solid rgb(228, 228, 228);
      p {
        padding: 3px 0;
      }
      .song {
        font-size: $font-size-medium-x;
        color: $color-text;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      // padding-bottom: 20px
      }
      .singer {
        font-size: 12px;
        color: $color-text-g;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .icon {
      // flex: 0 0 30px
      // width: 30px
      [class^="icon-"] {
        font-size: 14px;
        color: $color-text;
      }
    }
    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text;
      overflow: hidden;
      .text {
       overflow: hidden;
       text-overflow: ellipsis;
       white-space: nowrap;
      }
    }
  }
}
.no-result-wrapper {
  position: fixed;
  overflow: hidden;
  left: 50%;
  top: 40vh;
  transform: translatex(-50%);
  color: $color-text;
}
</style>
