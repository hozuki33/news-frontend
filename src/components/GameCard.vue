<template>
    <div class="game-card" @click="open">
      <img
        class="cover"
        :src="news.coverUrl || defaultImg"
        alt=""
      />
  
      <!-- 标题直接叠在图片上 -->
      <div class="title">
        {{ news.title }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const props = defineProps({
    news: {
      type: Object,
      required: true
    }
  })
  
  const router = useRouter()
  const defaultImg = '/default-cover-vertical.jpg'
  
  function open() {
    router.push(`/news/${props.news.id}`)
  }
  </script>
  
  <style scoped>
  .game-card {
    position: relative;
    width: 240px;
    height: 310px;          
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
  
    transition: transform .2s ease;
  }
  
  .game-card:hover {
    transform: scale(1.04);
  }
  
  /* 图片占满 */
  .cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* 直接叠在图上的标题 */
  .title {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  
    padding: 10px 12px;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.4;
    color: #fff;
  
    /* 仅靠文字阴影保证可读性，不是蒙版 */
    text-shadow: 0 2px 6px rgba(0,0,0,.6);
  
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>
  