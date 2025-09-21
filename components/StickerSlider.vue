<template>
  <div class="sticker-slider-section">
    <div class="section-header section-header--centered">
      <h2 class="section-title">Коллекция стикеров</h2>
      <p class="section-description">
        Просмотрите нашу обширную коллекцию стикеров с плавной прокруткой
      </p>
    </div>

    <div class="slider-container">
      <div class="slider-wrapper" ref="sliderWrapper">
        <div class="sticker-slider" ref="stickerSlider">
          <!-- Скелетон во время загрузки -->
          <div v-if="isLoading" class="skeleton-stickers">
            <div v-for="n in 20" :key="n" class="skeleton-sticker"></div>
          </div>

          <!-- Стикеры после загрузки -->
          <div
            v-else
            v-for="(sticker, index) in stickers"
            :key="index"
            class="sticker-item"
            :style="{ '--delay': `${index * 0.05}s` }"
            @click="$emit('openPreview', sticker, index)"
          >
            <img :src="sticker.image" :alt="sticker.name" class="sticker-img" />
            <div class="sticker-overlay">
              <span class="sticker-name">{{ sticker.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <button
        v-if="!isLoading"
        class="slider-btn slider-btn--prev"
        @click="scrollSlider('left')"
        :disabled="!canScrollLeft"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <button
        v-if="!isLoading"
        class="slider-btn slider-btn--next"
        @click="scrollSlider('right')"
        :disabled="!canScrollRight"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <div v-if="!isLoading" class="slider-indicator">
      <div class="indicator-dots">
        <button
          v-for="(dot, index) in indicatorDots"
          :key="index"
          class="indicator-dot"
          :class="{ 'indicator-dot--active': dot.isActive }"
          @click="scrollToSlide(index)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Sticker } from '~/types'

interface Props {
  stickers: Sticker[]
  isLoading: boolean
}

defineProps<Props>()
defineEmits<{
  openPreview: [sticker: Sticker, index: number]
}>()

const {
  sliderWrapper,
  canScrollLeft,
  canScrollRight,
  indicatorDots,
  scrollSlider,
  scrollToSlide,
  initSlider,
  cleanup,
} = useSlider()

onMounted(() => {
  initSlider()
})

onUnmounted(() => {
  cleanup()
})
</script>
