import { SLIDER_DOTS_COUNT, SCROLL_AMOUNT, SLIDE_WIDTH } from '~/constants/stickers'

export const useSlider = () => {
  const sliderWrapper = ref<HTMLElement>()
  const canScrollLeft = ref(false)
  const canScrollRight = ref(true)
  const currentSlide = ref(0)
  const indicatorDots = ref<{ isActive: boolean }[]>([])

  const scrollSlider = (direction: 'left' | 'right') => {
    if (!sliderWrapper.value) return

    const currentScroll = sliderWrapper.value.scrollLeft

    if (direction === 'left') {
      sliderWrapper.value.scrollTo({
        left: currentScroll - SCROLL_AMOUNT,
        behavior: 'smooth',
      })
    } else {
      sliderWrapper.value.scrollTo({
        left: currentScroll + SCROLL_AMOUNT,
        behavior: 'smooth',
      })
    }
  }

  const scrollToSlide = (slideIndex: number) => {
    if (!sliderWrapper.value) return

    const targetScroll = slideIndex * SLIDE_WIDTH

    sliderWrapper.value.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    })

    currentSlide.value = slideIndex
    updateIndicatorDots()
  }

  const updateIndicatorDots = () => {
    indicatorDots.value.forEach((dot, index) => {
      dot.isActive = index === currentSlide.value
    })
  }

  const checkScrollButtons = () => {
    if (!sliderWrapper.value) return

    const { scrollLeft, scrollWidth, clientWidth } = sliderWrapper.value
    canScrollLeft.value = scrollLeft > 0
    canScrollRight.value = scrollLeft < scrollWidth - clientWidth - 1

    const newSlide = Math.round(scrollLeft / SLIDE_WIDTH)
    if (newSlide !== currentSlide.value && newSlide >= 0 && newSlide < indicatorDots.value.length) {
      currentSlide.value = newSlide
      updateIndicatorDots()
    }
  }

  const handleScroll = () => {
    checkScrollButtons()
  }

  const initSlider = (dotsCount: number = SLIDER_DOTS_COUNT) => {
    indicatorDots.value = Array.from({ length: dotsCount }, (_, index) => ({
      isActive: index === 0,
    }))

    nextTick(() => {
      if (sliderWrapper.value) {
        sliderWrapper.value.addEventListener('scroll', handleScroll)
        checkScrollButtons()
      }
    })
  }

  const cleanup = () => {
    if (sliderWrapper.value) {
      sliderWrapper.value.removeEventListener('scroll', handleScroll)
    }
  }

  return {
    sliderWrapper,
    canScrollLeft: readonly(canScrollLeft),
    canScrollRight: readonly(canScrollRight),
    currentSlide: readonly(currentSlide),
    indicatorDots: readonly(indicatorDots),
    scrollSlider,
    scrollToSlide,
    initSlider,
    cleanup,
  }
}
