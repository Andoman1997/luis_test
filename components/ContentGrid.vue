<template>
  <div class="content-grid">
    <div v-for="(section, index) in sections" :key="index" class="content-section">
      <div class="section-header">
        <h2 class="section-title">{{ section.title }}</h2>
        <p class="section-description">{{ section.description }}</p>
      </div>

      <div class="section-content">
        <div v-if="isLoading" class="skeleton-cards">
          <div v-for="n in 3" :key="n" class="skeleton-card">
            <div class="skeleton-card-image"></div>
            <div class="skeleton-card-content">
              <div class="skeleton-card-title"></div>
              <div class="skeleton-card-description"></div>
              <div class="skeleton-card-description short"></div>
            </div>
          </div>
        </div>

        <div
          v-else
          v-for="(item, itemIndex) in section.items"
          :key="itemIndex"
          class="content-card"
        >
          <div class="card-image">
            <img :src="item.image" :alt="item.title" loading="lazy" />
          </div>
          <div class="card-content">
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-description">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ContentSection } from '~/types'

interface Props {
  sections: ContentSection[]
  isLoading: boolean
}

defineProps<Props>()
</script>
