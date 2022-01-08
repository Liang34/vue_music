import BScroll, { BScrollInstance } from '@better-scroll/core'
import Slide from '@better-scroll/slide'

import { onMounted, onUnmounted, onActivated, onDeactivated, ref } from 'vue'

BScroll.use(Slide)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useSlider(wrapperRef: { value: string | HTMLElement }) {
  const slider = ref<BScrollInstance>()
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

    sliderVal.on('slideWillChange', (page: { pageX: number }) => {
      currentPageIndex.value = page.pageX
    })
  })

  onUnmounted(() => {
    slider.value?.destroy()
  })

  onActivated(() => {
    slider.value?.enable()
    slider.value?.refresh()
  })

  onDeactivated(() => {
    slider.value?.disable()
  })

  return {
    slider,
    currentPageIndex
  }
}
