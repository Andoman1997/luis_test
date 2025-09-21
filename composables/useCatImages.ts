export const useCatImages = () => {
  const isLoading = ref(true)
  const images = ref<string[]>([])

  const loadImages = async () => {
    try {
      const response = await $fetch<{ data: string[] }>('/api/cats')
      images.value = response.data
    } catch (error) {
      console.error('Error loading images:', error)
      images.value = ['https://cataas.com/cat', 'https://cataas.com/cat', 'https://cataas.com/cat']
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading: readonly(isLoading),
    images: readonly(images),
    loadImages,
  }
}
