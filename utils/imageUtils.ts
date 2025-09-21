import type { Sticker, Expert } from '~/types'

export const createStickerCollection = (): Sticker[] => {
  const stickers: Sticker[] = []
  for (let i = 1; i <= 20; i++) {
    stickers.push({
      name: `Стикер ${i}`,
      image: `https://cataas.com/cat?${i}`,
    })
  }
  return stickers
}

export const createExpertCollection = (images: string[]): Expert[] => {
  return images.map((imageUrl: string, index: number) => ({
    name: `Эксперт ${index + 1}`,
    image: imageUrl,
  }))
}
