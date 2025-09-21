# Sticker App

A modern Vue 3 + Nuxt 4 application showcasing interactive sticker gallery with smooth animations and responsive design.

## Features

- **Interactive Sticker Gallery**: Horizontal slider with smooth scrolling and navigation
- **Modal Preview**: Full-screen sticker preview with keyboard navigation
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Performance Optimized**: Code splitting, lazy loading, and efficient state management
- **Modern Architecture**: Vue 3 Composition API with TypeScript

## Project Structure

```
├── components/          # Vue components (UI only)
│   ├── StickerWidget.vue    # Floating consultation widget
│   ├── StickerSlider.vue    # Horizontal sticker slider
│   ├── ContentGrid.vue      # Content sections grid
│   └── StickerPreview.vue   # Modal preview component
├── composables/         # Vue 3 composables for shared logic
│   ├── useCatImages.ts      # Image loading logic
│   ├── useSlider.ts         # Slider functionality
│   └── useModal.ts          # Modal state management
├── types/              # TypeScript type definitions
│   └── index.ts            # Shared interfaces
├── constants/          # Application constants
│   └── stickers.ts         # Slider and sticker constants
├── utils/              # Utility functions
│   └── imageUtils.ts       # Image processing utilities
├── styles/             # Global styles organized by component
│   ├── components/         # Component-specific styles
│   │   ├── slider.scss     # Slider component styles
│   │   ├── modal.scss      # Modal component styles
│   │   ├── widget.scss     # Widget component styles
│   │   └── grid.scss       # Grid component styles
│   └── utilities/          # Utility styles
│       └── skeleton.scss   # Skeleton loading animations
├── pages/              # Nuxt pages
│   ├── index.vue           # Home page
│   └── sticker.vue         # Sticker gallery page
├── assets/scss/        # Global styles
│   ├── main.scss           # Main stylesheet
│   └── variables.scss      # SCSS variables
└── server/api/         # API endpoints
    └── cats.get.ts         # Cat images API
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture Highlights

- **Separation of Concerns**: Logic, styles, and types separated into dedicated directories
- **Composables**: Reusable logic extracted into composables for better maintainability
- **Component Composition**: Large components split into smaller, focused components
- **TypeScript**: Full type safety with shared interfaces and strict configuration
- **Modular Styles**: Component-specific styles organized in separate SCSS files
- **Constants & Utils**: Centralized constants and utility functions
- **Performance**: Optimized bundle size and loading strategies
