<template>
  <transition name="search">
    <div class="search">
      <div class="search-box-wrapper">
        <i class="iconfont icon-fanhui fa" @click="back"></i>
        <search-box @query="onQueryChange" ref="searchBox"></search-box>
      </div>
      <scroll ref="scrollRef" class="search-scroll-wrapper">
      <div>
        <div class="search-hots" v-show="!query">
          <p class="title">热门搜索</p>
          <span class="search-hots-item" v-for="item in hots" :key="item.id" @click="addQuery(item.first)">
            {{item.first}}
          </span>
        </div>
        <div class="shortcut-wrapper" v-show="!query">
          <div class="search-history" v-show="searchHistory.length">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear" @click="showConfirm">
              <i class="iconfont icon-clear"></i>
            </span>
          </h1>
          <search-list
            :searches="searchHistory"
            @select="addQuery"
            @delete="deleteSearch"
          ></search-list>
        </div>
        </div>
        <div class="search-result">
          <suggest @select="saveSearch" :query="query" ref="suggest"></suggest>
        </div>
      </div>
      <confirm
         ref="confirmRef"
         text="是否清空所有搜索历史"
         confirm-btn-text="清空"
         @confirm="clearSearch"
       >
       </confirm>
      </scroll>
    </div>
  </transition>
</template>

<script>
import { ref, computed } from 'vue'
import SearchBox from 'components/search/search-box'
import Scroll from 'components/base/scroll/scroll'
import { getSearchHot } from 'service/search'
import Confirm from 'components/base/confirm/confirm'
import { useStore } from 'vuex'
import SearchList from 'components/search/search-list'
import Suggest from 'components/search/suggest'
import useSearchHistory from 'components/search/use-search-history'
import { useRouter } from 'vue-router'
export default {
  setup () {
    const query = ref('')
    const hots = ref([])
    const searchBox = ref()
    const store = useStore()
    const router = useRouter()
    const confirmRef = ref()
    const searchHistory = computed(() => store.state.searchHistory)
    const onQueryChange = (s) => {
      query.value = s
    }
    const { save, deleteSearch, remove } = useSearchHistory()
    getSearchHot().then(res => {
      hots.value = res.result.hots
    })
    const addQuery = (s) => {
      searchBox.value.setQuery(s)
    }
    const saveSearch = () => {
      save(query.value)
    }
    const back = () => {
      router.back()
      searchBox.value.clear()
    }
    const clearSearch = () => {
      remove()
    }
    const showConfirm = () => {
      confirmRef.value.show()
    }
    return {
      query,
      hots,
      showConfirm,
      confirmRef,
      saveSearch,
      searchHistory,
      onQueryChange,
      addQuery,
      save,
      deleteSearch,
      searchBox,
      back,
      clearSearch
    }
  },
  components: {
    SearchBox,
    Scroll,
    Confirm,
    SearchList,
    Suggest
  }
}
</script>

<style lang="scss" scoped>
@import "common/style/variable";
.search-enter-active, .search-leave-active {
  transition: all 0.3s;
}
.search-enter, .search-leave-to {
  transform: translate3d(50%, 0, 0);
  opacity: 0;
}
.search {
  position: fixed;
  z-index: 100;
  width: 100%;
  top: 0;
  bottom: 0;
  background: $color-background;
  .search-box-wrapper {
    padding: 10px 40px 10px 43px;
    // margin-bottom: 15px;
    background: $color-theme;
    .fa {
      position: absolute;
      left: 5px;
      top: 3px;
      padding: 4px 3px;
      font-size: 30px;
      color: #fff;
    }
  }
  .search-scroll-wrapper {
    height: 100%;
    overflow: hidden;
    .search-hots {
      margin: 0 20px;
      .title {
        padding: 15px 5px 0 5px;
        height: 30px;
        line-height: 30px;
        font-size:$font-size-small-x;
        color: $color-text-g;
      }
      span {
        display: inline-block;
        padding: 3px 5px;
        margin: 4px 4px;
        border: 0.8px solid $color-text-ggg;
        border-radius: 5px;
        line-height: 20px;
        color: $color-text;
        font-size: $font-size-medium;
      }
    }
    .shortcut-wrapper {
      position: relative;
      // top: 178px
      // bottom: 0
      // width: 90%
      margin: 0 auto;
      .shortcut {
        height: 100%;
        overflow: hidden;
        .hot-key {
          margin: 0 20px 20px 20px;
          .title {
            margin-bottom: 20px;
            font-size: $font-size-medium;
            color: $color-text;
          }
          .item {
            display: inline-block;
            padding: 5px 10px;
            margin: 0 20px 10px 0;
            border-radius: 6px;
            background: $color-highlight-background;
            font-size: $font-size-medium;
            color: $color-text;
          }
        }
      }
      .search-history {
        position: relative;
        margin: 10px 25px;
        .title {
          display: flex;
          align-items: center;
          height: 30px;
          font-size: $font-size-small-x;
          color: $color-text-g;
          .text {
            // font-size: 13px;
            flex: 1;
          }
          .clear {
            // 扩展点击区域
            position: relative;
            &:before {
                content: '';
                position: absolute;
                top: -10px;
                left: -10px;
                right: -10px;
                bottom: -10px;
            }
            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text;
            }
          }
        }
      }
    }
    .search-result {
      position: relative;
      width: 100%;
      top: 10px;
      bottom: 0;
    }
  }
}
.router-view {
  z-index: 1000;
}
</style>
