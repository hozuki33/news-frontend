<template>
    <div class="notice-item" @click="open">
      <img
        class="thumb"
        :src="news.coverUrl || defaultImg"
        alt=""
      />
  
      <div class="content">
        <div class="title">
          {{ news.title }}
        </div>
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
  const defaultImg = '/default-cover.jpg'
  
  function open() {
    router.push(`/news/${props.news.id}`)
  }
  </script>
  
  <style scoped>
    .notice-item {
      display: flex;
      align-items: center;
      gap: 16px;
    
      padding: 14px 16px;
      border-radius: 10px;
      cursor: pointer;
    
      transition: background-color .2s ease;
    }
    
    .notice-item:hover {
      background: rgba(0, 0, 0, 0.05);
    }
    
    /* 左侧小图（更大，更像内容预览） */
    .thumb {
      width: 96px;
      height: 64px;
      object-fit: cover;
      border-radius: 8px;
      flex-shrink: 0;
    }
    
    /* 右侧内容 */
    .content {
      flex: 1;
    }
    
    .title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
    
      line-height: 1.5;
    
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    </style>
    