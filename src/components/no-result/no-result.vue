<!-- 在查无结果或者没有喜爱的歌时显示这个组件 -->
<template>
  <div class="no-result">
    <div class="no-result-icon">
      <i class="fa fa-music"></i>
    </div>
    <p class="no-result-text">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss" >
  @import "common/style/variable";

.no-result {
  text-align: center;
  .no-result-icon {
    color: $color-text-gg;
    font-size: 50px;
  }
  .no-result-text {
    margin-top: 30px;
    font-size: $font-size-medium;
    color: $color-text;
  }
}
</style>
