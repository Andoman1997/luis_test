<template>
  <div class="main-page">
    <div class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Добро пожаловать в Sticker App</h1>
          <p class="hero-description">
            Оцените нашу интерактивную функцию стикеров с плавными анимациями
          </p>
          <NuxtLink to="/sticker" class="btn btn--primary">Изучить стикеры</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Главная - Sticker App',
  meta: [
    { name: 'description', content: 'Добро пожаловать в наше интерактивное приложение стикеров' },
  ],
})
</script>

