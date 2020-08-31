<!--推荐页面的四个小圈圈:因为出现better-scroll计算错误问题展示不加上去-->
<template>
  <div class="four-circles-box">
    <ul class="four-circles">
      <li class="circle-item">
        <div class="circle-box">
          <i class="iconfont icon-icon--"></i>
        </div>
        <h5 class="title">私人FM</h5>
      </li>
      <li class="circle-item">
        <div class="circle-box">
          <i class="iconfont icon-rili"></i>
        </div>
        <h5 class="title">每日推荐</h5>
      </li>
      <li class="circle-item">
        <div class="circle-box">
          <i class="iconfont icon-jiarugedan"></i>
        </div>
        <h5 class="title">歌单</h5>
      </li>
      <li class="circle-item">
        <router-link to="/leader-board">
          <div class="circle-box">
            <i class="iconfont icon-paihangbang"></i>
          </div>
          <h5 class="title">排行榜</h5>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
@import 'common/style/variable.less';

.four-circles-box {
  margin: 7px 0;
  .four-circles {
    display: flex;
    justify-content: space-around;
    .circle-item {
      .circle-box {
        margin: 2px auto;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 50%;
        background-color: #d44439;
        width: 40px;
        height: 40px;
        box-shadow: 0 0 7px #000;
        .iconfont {
          color: #f1f1f1;
          font-size: @font-size-large-x;
        }
      }
      .title {
        text-align: center;
        font-weight: 400;
        font-size: @font-size-small-x;
      }
    }
  }
}

a {
  text-decoration: none;
  color: #000;
  font-size: @font-size-large;
  &.router-link-active {
    text-decoration: none;
    color: #000;
  }
}
</style>
