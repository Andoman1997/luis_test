import type { Sticker } from '~/types'

export const useModal = () => {
  const isOpen = ref(false)
  const selectedItem = ref<Sticker | null>(null)
  const selectedIndex = ref(0)
  const items = ref<Sticker[]>([])

  const open = (item: Sticker, index: number, collection: Sticker[]) => {
    selectedItem.value = item
    selectedIndex.value = index
    items.value = collection
    isOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  const close = () => {
    isOpen.value = false
    selectedItem.value = null
    selectedIndex.value = 0
    items.value = []
    document.body.style.overflow = 'auto'
  }

  const navigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && selectedIndex.value > 0) {
      selectedIndex.value--
      selectedItem.value = items.value[selectedIndex.value] || null
    } else if (direction === 'next' && selectedIndex.value < items.value.length - 1) {
      selectedIndex.value++
      selectedItem.value = items.value[selectedIndex.value] || null
    }
  }

  const handleKeydown = (event: KeyboardEvent) => {
    if (!isOpen.value) return

    switch (event.key) {
      case 'Escape':
        close()
        break
      case 'ArrowLeft':
        navigate('prev')
        break
      case 'ArrowRight':
        navigate('next')
        break
    }
  }

  const cleanup = () => {
    document.body.style.overflow = 'auto'
  }

  return {
    isOpen: readonly(isOpen),
    selectedItem: readonly(selectedItem),
    selectedIndex: readonly(selectedIndex),
    items: readonly(items),
    open,
    close,
    navigate,
    handleKeydown,
    cleanup,
  }
}
