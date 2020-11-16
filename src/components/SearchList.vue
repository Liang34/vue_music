<!--搜索历史-->
<template>
  <div class="search-list" v-show="searches.length">
    <transition-group name="list" tag="ul">
      <li :key="item" class="search-item" @click="selectItem(item)" v-for="item in searches">
        <span class="text">{{item}}</span>
        <span class="icon" @click.stop="deleteOne(item)">
          <i class="iconfont icon-delete"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    searches: {
      type: Array
    }
  },
  methods: {
    selectItem (item) {
      this.$emit('select', item)
    },
    deleteOne (item) {
      this.$emit('delete', item)
    }
  }
}
</script>

<style scoped lang="less">
@import "common/style/variable";
.search-list {
  .search-item {
    display: flex;
    align-items: center;
    height: 35px;
    overflow: hidden;
    font-size: 14px;
    &.list-enter-active, &.list-leave-active {
      transition: all 0.1s;
    }
    &.list-enter, &.list-leave-to {
      height: 0;
    }
    .text {
      flex: 1;
      color: @color-text;
    }
    .icon {
      position: relative;
      &:before {
        content: '';
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
      }
      .icon-delete {
        font-size: @font-size-small;
        color: @color-text;
      }
    }
  }
}
</style>
