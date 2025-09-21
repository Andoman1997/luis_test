<template>
  <div
    class="sticker-widget"
    :class="{ 'sticker-widget--expanded': isExpanded }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="sticker-content">
      <div class="sticker-collapsed">
        <div v-if="isLoading" class="loading-placeholder">
          <div class="skeleton-container">
            <div class="skeleton-item"></div>
            <div class="skeleton-item"></div>
            <div class="skeleton-item"></div>
          </div>
        </div>
        <div v-else class="collapsed-stickers">
          <div v-for="(expert, index) in experts" :key="index" class="collapsed-sticker">
            <img :src="expert.image" :alt="expert.name" class="sticker-image" />
          </div>
        </div>

        <div class="sticker-navigation">
          <button class="nav-btn">
            <img src="~/assets/arrow_back.svg" alt="Назад" class="nav-icon" />
          </button>
        </div>
      </div>

      <div class="sticker-expanded">
        <div class="sticker-header">
          <h3 class="sticker-title">Консультация эксперта</h3>
        </div>

        <div class="sticker-experts">
          <div v-if="isLoading" class="skeleton-experts">
            <div class="skeleton-expert"></div>
            <div class="skeleton-expert"></div>
            <div class="skeleton-expert"></div>
          </div>
          <div
            v-else
            v-for="(expert, index) in experts"
            :key="index"
            class="expert-avatar"
            :style="{ '--delay': `${index * 0.1}s` }"
          >
            <img :src="expert.image" :alt="expert.name" class="avatar-image" />
          </div>
        </div>

        <div v-if="isLoading" class="skeleton-btn"></div>
        <button v-else class="consultation-btn">Получить консультацию</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Expert } from '~/types'
import { createExpertCollection } from '~/utils/imageUtils'

const isExpanded = ref(false)
const experts = ref<Expert[]>([])
const { isLoading, images, loadImages } = useCatImages()

const loadCatImages = async () => {
  await loadImages()
  experts.value = createExpertCollection([...images.value])
}

onMounted(() => {
  loadCatImages()
})

const handleMouseEnter = () => {
  isExpanded.value = true
}

const handleMouseLeave = () => {
  isExpanded.value = false
}
</script>
