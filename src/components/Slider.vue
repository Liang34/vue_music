<!-- 轮播图组件 -->
<template>
  <div class="slider" ref="sliderRef">
    <div class="slider-group" ref="sliderGroupRef">
      <slot></slot>
    </div>
    <!--轮播图小圆圈-->
    <!-- <div class="dots">
      <span
        class="dot"
        :class="{ active: currentPageIndex === index }"
        v-for="(item, index) in dots"
        :key="index"
      ></span>
    </div> -->
  </div>
</template>

<script lang="ts">
import BScroll, { BScrollInstance } from '@better-scroll/core'
import { onMounted, ref } from 'vue'
import { addClass } from '@/common/js/dom'
export default {
  name: 'slider',
  props: {
    // 是否循环轮播
    loop: {
      type: Boolean,
      default: true
    },
    //自动轮播
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 间隔时间
    interval: {
      type: Number,
      default: 4000
    }
  },
  setup(props: any) {
    onMounted(() => {
      setTimeout(() => {
        setSliderWidth(undefined)
        initSlider()
        if (props.autoPlay) {
          play()
        }
      }, 20)
    })
    const sliderRef = ref<HTMLElement>()
    const sliderGroupRef = ref<HTMLElement>()
    let slider: BScrollInstance
    let currentPageIndex = 0
    let timer: number | undefined = undefined
    // 初始化bs的配置
    const initSlider = () => {
      slider = new BScroll(sliderRef.value as HTMLElement, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: props.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      })
      // 触发时机：用户手指放在滚动区域的时候,停止自动播放
      slider.on('beforeScrollStart', () => {
        if (props.autoPlay) {
          clearTimeout(timer)
        }
      })
      // 触发时机：滚动结束，或者让一个正在滚动的 content 强制停止
      slider.on('scrollEnd', () => {
        let pageIndex = slider.getCurrentPage().pageX
        if (props.loop) {
          pageIndex -= 1
        }
        currentPageIndex = pageIndex
        if (props.autoPlay) {
          play()
        }
      })
    }
    const play = () => {
      let pageIndex = currentPageIndex + 1
      if (props.loop) {
        pageIndex += 1
      }
      timer = setTimeout(() => {
        slider.goToPage(pageIndex, 0, 400)
      }, props.interval)
    }
    // 设置slider的宽度
    const setSliderWidth = (isResize: undefined | boolean) => {
      // 获取图片的个数
      const children: Array<HTMLElement> = Array.from(
        (sliderGroupRef.value as HTMLElement).children
      ) as Array<HTMLElement>
      let width = 0 // 总宽度
      // 父容器的宽度
      const sliderWidth = (sliderRef.value as HTMLElement)?.clientWidth
      for (let i = 0; i < children.length; i++) {
        let child: HTMLElement = children[i]
        addClass(child, 'slider-item')
        child.style.width = `${sliderWidth}px`
        width += sliderWidth
      }
      if (props.loop && !isResize) {
        width += 2 * sliderWidth
      }
      ;(sliderGroupRef.value as HTMLElement).style.width = `${width}px`
    }
    return {
      initSlider,
      sliderRef,
      sliderGroupRef,
      play,
      setSliderWidth
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'common/style/variable';
.slider {
  min-height: 1px;
  position: relative;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-item {
      border-radius: 15px;
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    // font-size: 0;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;
      &.active {
        // width: 10px;
        border-radius: 5px;
        background: $color-highlight-background;
      }
    }
  }
}
</style>
