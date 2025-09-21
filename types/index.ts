export interface Sticker {
  name: string
  image: string
}

export interface Expert {
  name: string
  image: string
}

export interface ContentItem {
  title: string
  description: string
  image: string
}

export interface ContentSection {
  title: string
  description: string
  items: ContentItem[]
}
