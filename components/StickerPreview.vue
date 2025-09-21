<template>
  <div v-if="isOpen" class="sticker-preview-modal" @click="close">
    <div class="preview-backdrop"></div>
    <div class="preview-container" @click.stop>
      <button class="preview-close" @click="close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <div class="preview-image-container">
        <img
          :src="selectedItem?.image"
          :alt="selectedItem?.name"
          class="preview-image"
          @load="onImageLoad"
        />
      </div>

      <div class="preview-info">
        <h3 class="preview-title">{{ selectedItem?.name }}</h3>
        <p class="preview-description">Кликните вне изображения или на крестик для закрытия</p>
      </div>

      <button
        v-if="selectedIndex > 0"
        class="preview-nav preview-nav--prev"
        @click="navigate('prev')"
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
        v-if="selectedIndex < items.length - 1"
        class="preview-nav preview-nav--next"
        @click="navigate('next')"
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
  </div>
</template>

<script setup lang="ts">
import type { Sticker } from '~/types'

interface Props {
  isOpen: boolean
  selectedItem: Sticker | null
  selectedIndex: number
  items: Sticker[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  navigate: [direction: 'prev' | 'next']
}>()

const close = () => emit('close')
const navigate = (direction: 'prev' | 'next') => emit('navigate', direction)

const onImageLoad = () => {}
</script>
