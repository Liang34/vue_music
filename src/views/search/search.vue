<template>
  <div class="search">
    <div class="search-input-wrapper">
      <search-box v-model="query" @query="onQueryChange" ></search-box>
    </div>
    <scroll ref="scrollRef" class="search-content">
      <div>
        <div class="search-hots" v-show="!query">
          <p class="title">热门搜索</p>
          <span class="search-hots-item" v-for="item in hots" :key="item.id" @click="addQuery(item.first)">
            {{item.first}}
          </span>
        </div>
        <div class="search-history" v-show="searchHistory.length">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear" @click="showConfirm">
              <i class="iconfont icon-clear"></i>
            </span>
          </h1>
          <confirm
            ref="confirmRef"
            text="是否清空所有搜索历史"
            confirm-btn-text="清空"
            @confirm="clearSearch"
          >
          </confirm>
          <search-list
            :searches="searchHistory"
            @select="addQuery"
            @delete="deleteSearch"
          ></search-list>
        </div>
      </div>
    </scroll>
    <!-- <div class="search-result" v-show="query">
      <suggest
        :query="query"
        @select-song="selectSong"
        @select-singer="selectSinger"
      ></suggest>
    </div> -->
    <!-- <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedSinger"/>
      </transition>
    </router-view> -->
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import SearchBox from 'components/search/search-box'
import Scroll from 'components/base/scroll/scroll'
import { getSearchHot } from 'service/search'
import Confirm from 'components/base/confirm/confirm'
import { useStore } from 'vuex'
import SearchList from 'components/search/search-list'
export default {
  setup () {
    const query = ref('')
    const hots = ref([])
    const store = useStore()
    const searchHistory = computed(() => store.state.searchHistory)
    const onQueryChange = (query) => {
      query.value = query
    }
    getSearchHot().then(res => {
      console.log(res)
      hots.value = res.result.hots
    })
    return {
      query,
      hots,
      searchHistory,
      onQueryChange
    }
  },
  components: {
    SearchBox,
    Scroll,
    Confirm,
    SearchList
  }
}
</script>

<style lang="scss" scoped>
@import "common/style/variable";
@import "common/style/mixin";
.search {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  .search-input-wrapper {
    margin: 20px;
  }
  .search-content {
    flex: 1;
    overflow: hidden;
    .search-hots {
      margin: 0 20px 0px 20px;
      .title {
        margin-bottom: 20px;
        /* font-size: $font-size-medium; */
        /* color: $color-text-l; */
      }
      .search-hots-item {
        display: inline-block;
        padding: 5px 6px;
        margin: 0 20px 10px 0;
        border-radius: 6px;
        background: $color-highlight-background;
        font-size: $font-size-medium;
        /* color: $color-text-d; */
      }
    }
    .search-history {
      position: relative;
      margin: 0 20px;
      .title {
        display: flex;
        align-items: center;
        height: 40px;
        font-size: $font-size-large;
        /* color: $color-text-l; */
        .text {
          flex: 1;
        }
        .clear {
          @include extend-click();
          .icon-clear {
            font-size: $font-size-medium;
            /* color: $color-text-d; */
          }
        }
      }
    }
  }
  .search-result {
    flex: 1;
    overflow: hidden;
  }
}
</style>
