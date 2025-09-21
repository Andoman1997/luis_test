<template>
  <div class="sticker-page">
    <div class="container">
      <header class="page-header">
        <NuxtLink to="/" class="back-link">← Назад на главную</NuxtLink>
        <h1 class="page-title">Галерея стикеров</h1>
      </header>

      <StickerSlider
        :stickers="stickerCollection"
        :is-loading="isLoading"
        @open-preview="openStickerPreview"
      />

      <ContentGrid :sections="contentSections" :is-loading="isLoading" />
    </div>

    <StickerWidget />

    <StickerPreview
      :is-open="isPreviewOpen"
      :selected-item="selectedSticker"
      :selected-index="selectedStickerIndex"
      :items="[...previewItems]"
      @close="closeStickerPreview"
      @navigate="navigatePreview"
    />
  </div>
</template>

<script setup lang="ts">
import type { Sticker, ContentSection } from '~/types'
import { createStickerCollection } from '~/utils/imageUtils'

const { isLoading, images, loadImages } = useCatImages()
const {
  isOpen: isPreviewOpen,
  selectedItem: selectedSticker,
  selectedIndex: selectedStickerIndex,
  items: previewItems,
  open,
  close,
  navigate,
  handleKeydown,
} = useModal()

const stickerCollection = ref<Sticker[]>([])

const initStickerCollection = () => {
  stickerCollection.value = createStickerCollection()
}

const openStickerPreview = (sticker: Sticker, index: number) => {
  open(sticker, index, stickerCollection.value)
}

const closeStickerPreview = () => {
  close()
}

const navigatePreview = (direction: 'prev' | 'next') => {
  navigate(direction)
}

const contentSections = computed<ContentSection[]>(() => [
  {
    title: 'Рекомендуемый контент',
    description: 'Откройте для себя наши самые популярные и трендовые элементы',
    items: [
      {
        title: 'Премиум качество',
        description: 'Высококачественные материалы и мастерство, превосходящие ожидания',
        image: images.value[0] || 'https://cataas.com/cat',
      },
      {
        title: 'Инновационный дизайн',
        description: 'Передовой дизайн, сочетающий функциональность с эстетикой',
        image: images.value[1] || 'https://cataas.com/cat',
      },
      {
        title: 'Пользовательский опыт',
        description:
          'Интуитивный интерфейс, разработанный с учетом удовлетворенности пользователей',
        image: images.value[2] || 'https://cataas.com/cat',
      },
    ],
  },
  {
    title: 'Последние обновления',
    description: 'Будьте в курсе наших новейших функций и улучшений',
    items: [
      {
        title: 'Повышение производительности',
        description: 'Значительные улучшения в скорости и отзывчивости',
        image: images.value[0] || 'https://cataas.com/cat',
      },
      {
        title: 'Новые функции',
        description: 'Увлекательные новые возможности, которые улучшают ваш рабочий процесс',
        image: images.value[1] || 'https://cataas.com/cat',
      },
      {
        title: 'Обновления безопасности',
        description: 'Усиленные меры безопасности для защиты ваших данных',
        image: images.value[2] || 'https://cataas.com/cat',
      },
    ],
  },
  {
    title: 'Фавориты сообщества',
    description: 'Самые любимые функции участниками нашего сообщества',
    items: [
      {
        title: 'Инструменты сотрудничества',
        description: 'Работайте вместе безупречно с продвинутыми функциями сотрудничества',
        image: images.value[0] || 'https://cataas.com/cat',
      },
      {
        title: 'Опции настройки',
        description: 'Персонализируйте свой опыт с обширными возможностями настройки',
        image: images.value[1] || 'https://cataas.com/cat',
      },
      {
        title: 'Мобильная поддержка',
        description: 'Полная функциональность на всех ваших устройствах',
        image: images.value[2] || 'https://cataas.com/cat',
      },
    ],
  },
])

onMounted(async () => {
  initStickerCollection()
  await loadImages()
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

useHead({
  title: 'Галерея стикеров - Sticker App',
  meta: [
    {
      name: 'description',
      content: 'Изучите нашу интерактивную галерею стикеров с плавными анимациями',
    },
  ],
})
</script>
