import { _ as __nuxt_component_0 } from './nuxt-link-v-6uuD1P.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, unref, readonly, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass } from 'vue/server-renderer';
import { u as useHead } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const SLIDER_DOTS_COUNT = 5;
const SCROLL_AMOUNT = 300;
const SLIDE_WIDTH = 300;
const useSlider = () => {
  const sliderWrapper = ref();
  const canScrollLeft = ref(false);
  const canScrollRight = ref(true);
  const currentSlide = ref(0);
  const indicatorDots = ref([]);
  const scrollSlider = (direction) => {
    if (!sliderWrapper.value) return;
    const currentScroll = sliderWrapper.value.scrollLeft;
    if (direction === "left") {
      sliderWrapper.value.scrollTo({
        left: currentScroll - SCROLL_AMOUNT,
        behavior: "smooth"
      });
    } else {
      sliderWrapper.value.scrollTo({
        left: currentScroll + SCROLL_AMOUNT,
        behavior: "smooth"
      });
    }
  };
  const scrollToSlide = (slideIndex) => {
    if (!sliderWrapper.value) return;
    const targetScroll = slideIndex * SLIDE_WIDTH;
    sliderWrapper.value.scrollTo({
      left: targetScroll,
      behavior: "smooth"
    });
    currentSlide.value = slideIndex;
    updateIndicatorDots();
  };
  const updateIndicatorDots = () => {
    indicatorDots.value.forEach((dot, index) => {
      dot.isActive = index === currentSlide.value;
    });
  };
  const checkScrollButtons = () => {
    if (!sliderWrapper.value) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderWrapper.value;
    canScrollLeft.value = scrollLeft > 0;
    canScrollRight.value = scrollLeft < scrollWidth - clientWidth - 1;
    const newSlide = Math.round(scrollLeft / SLIDE_WIDTH);
    if (newSlide !== currentSlide.value && newSlide >= 0 && newSlide < indicatorDots.value.length) {
      currentSlide.value = newSlide;
      updateIndicatorDots();
    }
  };
  const handleScroll = () => {
    checkScrollButtons();
  };
  const initSlider = (dotsCount = SLIDER_DOTS_COUNT) => {
    indicatorDots.value = Array.from({ length: dotsCount }, (_, index) => ({
      isActive: index === 0
    }));
    nextTick(() => {
      if (sliderWrapper.value) {
        sliderWrapper.value.addEventListener("scroll", handleScroll);
        checkScrollButtons();
      }
    });
  };
  const cleanup = () => {
    if (sliderWrapper.value) {
      sliderWrapper.value.removeEventListener("scroll", handleScroll);
    }
  };
  return {
    sliderWrapper,
    canScrollLeft: readonly(canScrollLeft),
    canScrollRight: readonly(canScrollRight),
    currentSlide: readonly(currentSlide),
    indicatorDots: readonly(indicatorDots),
    scrollSlider,
    scrollToSlide,
    initSlider,
    cleanup
  };
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "StickerSlider",
  __ssrInlineRender: true,
  props: {
    stickers: {},
    isLoading: { type: Boolean }
  },
  emits: ["openPreview"],
  setup(__props) {
    const {
      canScrollLeft,
      canScrollRight,
      indicatorDots
    } = useSlider();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sticker-slider-section" }, _attrs))}><div class="section-header section-header--centered"><h2 class="section-title">Коллекция стикеров</h2><p class="section-description"> Просмотрите нашу обширную коллекцию стикеров с плавной прокруткой </p></div><div class="slider-container"><div class="slider-wrapper"><div class="sticker-slider">`);
      if (_ctx.isLoading) {
        _push(`<div class="skeleton-stickers"><!--[-->`);
        ssrRenderList(20, (n) => {
          _push(`<div class="skeleton-sticker"></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(_ctx.stickers, (sticker, index) => {
          _push(`<div class="sticker-item" style="${ssrRenderStyle({ "--delay": `${index * 0.05}s` })}"><img${ssrRenderAttr("src", sticker.image)}${ssrRenderAttr("alt", sticker.name)} class="sticker-img"><div class="sticker-overlay"><span class="sticker-name">${ssrInterpolate(sticker.name)}</span></div></div>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</div></div>`);
      if (!_ctx.isLoading) {
        _push(`<button class="slider-btn slider-btn--prev"${ssrIncludeBooleanAttr(!unref(canScrollLeft)) ? " disabled" : ""}><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      if (!_ctx.isLoading) {
        _push(`<button class="slider-btn slider-btn--next"${ssrIncludeBooleanAttr(!unref(canScrollRight)) ? " disabled" : ""}><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (!_ctx.isLoading) {
        _push(`<div class="slider-indicator"><div class="indicator-dots"><!--[-->`);
        ssrRenderList(unref(indicatorDots), (dot, index) => {
          _push(`<button class="${ssrRenderClass([{ "indicator-dot--active": dot.isActive }, "indicator-dot"])}"></button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StickerSlider.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$4, { __name: "StickerSlider" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ContentGrid",
  __ssrInlineRender: true,
  props: {
    sections: {},
    isLoading: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "content-grid" }, _attrs))}><!--[-->`);
      ssrRenderList(_ctx.sections, (section, index) => {
        _push(`<div class="content-section"><div class="section-header"><h2 class="section-title">${ssrInterpolate(section.title)}</h2><p class="section-description">${ssrInterpolate(section.description)}</p></div><div class="section-content">`);
        if (_ctx.isLoading) {
          _push(`<div class="skeleton-cards"><!--[-->`);
          ssrRenderList(3, (n) => {
            _push(`<div class="skeleton-card"><div class="skeleton-card-image"></div><div class="skeleton-card-content"><div class="skeleton-card-title"></div><div class="skeleton-card-description"></div><div class="skeleton-card-description short"></div></div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!--[-->`);
          ssrRenderList(section.items, (item, itemIndex) => {
            _push(`<div class="content-card"><div class="card-image"><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.title)} loading="lazy"></div><div class="card-content"><h3 class="card-title">${ssrInterpolate(item.title)}</h3><p class="card-description">${ssrInterpolate(item.description)}</p></div></div>`);
          });
          _push(`<!--]-->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ContentGrid.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$3, { __name: "ContentGrid" });
const _imports_0 = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20opacity='0.4'%3e%3cmask%20id='mask0_14_2658'%20style='mask-type:alpha'%20maskUnits='userSpaceOnUse'%20x='0'%20y='0'%20width='24'%20height='24'%3e%3crect%20width='24'%20height='24'%20fill='%23D9D9D9'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_14_2658)'%3e%3cpath%20d='M7.82506%2013.0001L13.4251%2018.6001L12.0001%2020.0001L4.00006%2012.0001L12.0001%204.00006L13.4251%205.40006L7.82506%2011.0001H20.0001V13.0001H7.82506Z'%20fill='%23333333'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
const useCatImages = () => {
  const isLoading = ref(true);
  const images = ref([]);
  const loadImages = async () => {
    try {
      const response = await $fetch("/api/cats");
      images.value = response.data;
    } catch (error) {
      console.error("Error loading images:", error);
      images.value = ["https://cataas.com/cat", "https://cataas.com/cat", "https://cataas.com/cat"];
    } finally {
      isLoading.value = false;
    }
  };
  return {
    isLoading: readonly(isLoading),
    images: readonly(images),
    loadImages
  };
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "StickerWidget",
  __ssrInlineRender: true,
  setup(__props) {
    const isExpanded = ref(false);
    const experts = ref([]);
    const { isLoading } = useCatImages();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["sticker-widget", { "sticker-widget--expanded": unref(isExpanded) }]
      }, _attrs))}><div class="sticker-content"><div class="sticker-collapsed">`);
      if (unref(isLoading)) {
        _push(`<div class="loading-placeholder"><div class="skeleton-container"><div class="skeleton-item"></div><div class="skeleton-item"></div><div class="skeleton-item"></div></div></div>`);
      } else {
        _push(`<div class="collapsed-stickers"><!--[-->`);
        ssrRenderList(unref(experts), (expert, index) => {
          _push(`<div class="collapsed-sticker"><img${ssrRenderAttr("src", expert.image)}${ssrRenderAttr("alt", expert.name)} class="sticker-image"></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`<div class="sticker-navigation"><button class="nav-btn"><img${ssrRenderAttr("src", _imports_0)} alt="Назад" class="nav-icon"></button></div></div><div class="sticker-expanded"><div class="sticker-header"><h3 class="sticker-title">Консультация эксперта</h3></div><div class="sticker-experts">`);
      if (unref(isLoading)) {
        _push(`<div class="skeleton-experts"><div class="skeleton-expert"></div><div class="skeleton-expert"></div><div class="skeleton-expert"></div></div>`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(unref(experts), (expert, index) => {
          _push(`<div class="expert-avatar" style="${ssrRenderStyle({ "--delay": `${index * 0.1}s` })}"><img${ssrRenderAttr("src", expert.image)}${ssrRenderAttr("alt", expert.name)} class="avatar-image"></div>`);
        });
        _push(`<!--]-->`);
      }
      _push(`</div>`);
      if (unref(isLoading)) {
        _push(`<div class="skeleton-btn"></div>`);
      } else {
        _push(`<button class="consultation-btn">Получить консультацию</button>`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StickerWidget.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$2, { __name: "StickerWidget" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "StickerPreview",
  __ssrInlineRender: true,
  props: {
    isOpen: { type: Boolean },
    selectedItem: {},
    selectedIndex: {},
    items: {}
  },
  emits: ["close", "navigate"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      if (_ctx.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "sticker-preview-modal" }, _attrs))}><div class="preview-backdrop"></div><div class="preview-container"><button class="preview-close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button><div class="preview-image-container"><img${ssrRenderAttr("src", _ctx.selectedItem?.image)}${ssrRenderAttr("alt", _ctx.selectedItem?.name)} class="preview-image"></div><div class="preview-info"><h3 class="preview-title">${ssrInterpolate(_ctx.selectedItem?.name)}</h3><p class="preview-description">Кликните вне изображения или на крестик для закрытия</p></div>`);
        if (_ctx.selectedIndex > 0) {
          _push(`<button class="preview-nav preview-nav--prev"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.selectedIndex < _ctx.items.length - 1) {
          _push(`<button class="preview-nav preview-nav--next"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StickerPreview.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$1, { __name: "StickerPreview" });
const useModal = () => {
  const isOpen = ref(false);
  const selectedItem = ref(null);
  const selectedIndex = ref(0);
  const items = ref([]);
  const open = (item, index, collection) => {
    selectedItem.value = item;
    selectedIndex.value = index;
    items.value = collection;
    isOpen.value = true;
    (void 0).body.style.overflow = "hidden";
  };
  const close = () => {
    isOpen.value = false;
    selectedItem.value = null;
    selectedIndex.value = 0;
    items.value = [];
    (void 0).body.style.overflow = "auto";
  };
  const navigate = (direction) => {
    if (direction === "prev" && selectedIndex.value > 0) {
      selectedIndex.value--;
      selectedItem.value = items.value[selectedIndex.value] || null;
    } else if (direction === "next" && selectedIndex.value < items.value.length - 1) {
      selectedIndex.value++;
      selectedItem.value = items.value[selectedIndex.value] || null;
    }
  };
  const handleKeydown = (event) => {
    if (!isOpen.value) return;
    switch (event.key) {
      case "Escape":
        close();
        break;
      case "ArrowLeft":
        navigate("prev");
        break;
      case "ArrowRight":
        navigate("next");
        break;
    }
  };
  const cleanup = () => {
    (void 0).body.style.overflow = "auto";
  };
  return {
    isOpen: readonly(isOpen),
    selectedItem: readonly(selectedItem),
    selectedIndex: readonly(selectedIndex),
    items: readonly(items),
    open,
    close,
    navigate,
    handleKeydown,
    cleanup
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "sticker",
  __ssrInlineRender: true,
  setup(__props) {
    const { isLoading, images } = useCatImages();
    const {
      isOpen: isPreviewOpen,
      selectedItem: selectedSticker,
      selectedIndex: selectedStickerIndex,
      items: previewItems,
      open,
      close,
      navigate
    } = useModal();
    const stickerCollection = ref([]);
    const openStickerPreview = (sticker, index) => {
      open(sticker, index, stickerCollection.value);
    };
    const closeStickerPreview = () => {
      close();
    };
    const navigatePreview = (direction) => {
      navigate(direction);
    };
    const contentSections = computed(() => [
      {
        title: "Рекомендуемый контент",
        description: "Откройте для себя наши самые популярные и трендовые элементы",
        items: [
          {
            title: "Премиум качество",
            description: "Высококачественные материалы и мастерство, превосходящие ожидания",
            image: images.value[0] || "https://cataas.com/cat"
          },
          {
            title: "Инновационный дизайн",
            description: "Передовой дизайн, сочетающий функциональность с эстетикой",
            image: images.value[1] || "https://cataas.com/cat"
          },
          {
            title: "Пользовательский опыт",
            description: "Интуитивный интерфейс, разработанный с учетом удовлетворенности пользователей",
            image: images.value[2] || "https://cataas.com/cat"
          }
        ]
      },
      {
        title: "Последние обновления",
        description: "Будьте в курсе наших новейших функций и улучшений",
        items: [
          {
            title: "Повышение производительности",
            description: "Значительные улучшения в скорости и отзывчивости",
            image: images.value[0] || "https://cataas.com/cat"
          },
          {
            title: "Новые функции",
            description: "Увлекательные новые возможности, которые улучшают ваш рабочий процесс",
            image: images.value[1] || "https://cataas.com/cat"
          },
          {
            title: "Обновления безопасности",
            description: "Усиленные меры безопасности для защиты ваших данных",
            image: images.value[2] || "https://cataas.com/cat"
          }
        ]
      },
      {
        title: "Фавориты сообщества",
        description: "Самые любимые функции участниками нашего сообщества",
        items: [
          {
            title: "Инструменты сотрудничества",
            description: "Работайте вместе безупречно с продвинутыми функциями сотрудничества",
            image: images.value[0] || "https://cataas.com/cat"
          },
          {
            title: "Опции настройки",
            description: "Персонализируйте свой опыт с обширными возможностями настройки",
            image: images.value[1] || "https://cataas.com/cat"
          },
          {
            title: "Мобильная поддержка",
            description: "Полная функциональность на всех ваших устройствах",
            image: images.value[2] || "https://cataas.com/cat"
          }
        ]
      }
    ]);
    useHead({
      title: "Галерея стикеров - Sticker App",
      meta: [
        {
          name: "description",
          content: "Изучите нашу интерактивную галерею стикеров с плавными анимациями"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_StickerSlider = __nuxt_component_1;
      const _component_ContentGrid = __nuxt_component_2;
      const _component_StickerWidget = __nuxt_component_3;
      const _component_StickerPreview = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sticker-page" }, _attrs))}><div class="container"><header class="page-header">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "back-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`← Назад на главную`);
          } else {
            return [
              createTextVNode("← Назад на главную")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="page-title">Галерея стикеров</h1></header>`);
      _push(ssrRenderComponent(_component_StickerSlider, {
        stickers: unref(stickerCollection),
        "is-loading": unref(isLoading),
        onOpenPreview: openStickerPreview
      }, null, _parent));
      _push(ssrRenderComponent(_component_ContentGrid, {
        sections: unref(contentSections),
        "is-loading": unref(isLoading)
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_StickerWidget, null, null, _parent));
      _push(ssrRenderComponent(_component_StickerPreview, {
        "is-open": unref(isPreviewOpen),
        "selected-item": unref(selectedSticker),
        "selected-index": unref(selectedStickerIndex),
        items: [...unref(previewItems)],
        onClose: closeStickerPreview,
        onNavigate: navigatePreview
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sticker.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=sticker-Xo1JpKaY.mjs.map
