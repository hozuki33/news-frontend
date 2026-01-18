<template>
  <Header />

  <main>
    <RouterView />
  </main>
  <Footer v-if="route.path === '/'" />
</template>

<script setup>
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/footer.vue'

const route = useRoute()
</script>
