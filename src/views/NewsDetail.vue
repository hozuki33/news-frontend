<template>
    <div class="container">
      <h1>{{ news.title }}</h1>
      <p class="time">{{ news.createTime }}</p>
      <img v-if="news.coverUrl" :src="news.coverUrl" class="cover">
  
      <div class="content" v-html="news.content"></div>
    </div>
  </template>
  
  <script setup>
    import { ref, onMounted } from 'vue'
    import { getNewsDetail } from '../api/news'
    import { useRoute } from 'vue-router'
    
    const route = useRoute()
    const id = route.params.id
    
    const news = ref({})
    
    onMounted(async () => {
      const res = await getNewsDetail(id)
      news.value = res.data
    
      const siteName = '百目新闻(•ө•)'
      document.title = `${news.value.title} - ${siteName}`
    })
    </script>
    
  <style scoped>
  .cover {
    width: 100%;
    margin: 10px 0;
  }
  .time {
    color: gray;
    margin-bottom: 10px;
  }
  </style>
  