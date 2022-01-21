import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

import { onActivated, onDeactivated, onMounted, onUnmounted, ref } from 'vue'

BScroll.use(Slide)
export default function useSlider (wrapperRef) {
  const slider = ref()
  const currentPageIndex = ref(0)
  onMounted(() => {
    slider.value = new BScroll(wrapperRef.value, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: true
    })
    const sliderVal = slider.value
    sliderVal.on('slideWillChange', (page) => {
      currentPageIndex.value = page.pageX
    })
  })
  // 销毁组件
  onUnmounted(() => {
    slider.value.destroy()
  })
  onActivated(() => {
    slider.value.enable()
    slider.value.refresh()
  })
  onDeactivated(() => {
    slider.value.disable()
  })
  return {
    slider,
    currentPageIndex
  }
}
