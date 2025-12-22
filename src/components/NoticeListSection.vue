<template>
    <div class="notice-section">
      <div class="section-header">
        <h3>{{ title }}</h3>
      </div>
  
      <div class="notice-list">
        <NoticeItem
          v-for="item in list"
          :key="item.id"
          :news="item"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import NoticeItem from './NoticeItem.vue'
  
  defineProps({
    title: {
      type: String,
      default: '通知公告'
    },
    list: {
      type: Array,
      default: () => []
    }
  })
  </script>
  
  <style scoped>
  .notice-section {
    margin-bottom: 40px;
    padding: 16px 20px;
    border-radius: 12px;
  
    /* 半透明容器 */
    background: rgba(255, 255, 255, 0.85);
  }
  
  .section-header {
    margin-bottom: 12px;
  }
  
  .section-header h3 {
    font-size: 20px;
    font-weight: bold;
  }
  .notice-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 两列 */
    column-gap: 20px;
    row-gap: 16px;
  }

  </style>
  