<template>
    <div class="news-list-card" @click="open">
      <!-- 左侧封面 -->
      <img
        class="thumb"
        :src="news.coverUrl || defaultImg"
        alt=""
      />
  
      <!-- 右侧内容 -->
      <div class="content">
        <div class="title">
          {{ news.title }}
        </div>
  
        <!-- <div class="summary">
          {{ summary }}
        </div> -->
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  
  const props = defineProps({
    news: {
      type: Object,
      required: true
    },
    summaryLength: {
      type: Number,
      default: 80
    }
  })
  
  const router = useRouter()
  const defaultImg = '/default-cover.jpg'
  
  const summary = computed(() => {
    if (!props.news.content) return ''
    return props.news.content.slice(0, props.summaryLength) + '...'
  })
  
  function open() {
    router.push(`/news/${props.news.id}`)
  }
  </script>
  
  <style scoped>
  .news-list-card {
    display: flex;
    gap: 18px;
    padding: 16px;
    border-radius: 12px;
  
    background: rgba(255, 255, 255, 0.92);
    cursor: pointer;
  
    transition: all 0.25s ease;
  }
  
  .news-list-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  }
  
  /* 左侧封面 */
  .thumb {
    width: 160px;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
    flex-shrink: 0;
  }
  
  /* 右侧内容 */
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
  
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .summary {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
  
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>
  