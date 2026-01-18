<template>
<div class="notice-section">
  <div class="section-header">
    <h3>{{ title }}</h3>

    <!-- 更多 -->
    <div
      v-if="categoryId"
      class="section-more"
      @click="goMore"
    >
      <span>更多</span>
      <el-icon class="arrow">
        <ArrowRight />
      </el-icon>
    </div>
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
import { useRouter } from 'vue-router'
import NoticeItem from './NoticeItem.vue'
import { ArrowRight } from '@element-plus/icons-vue'

const router = useRouter()

const props = defineProps({
title: {
  type: String,
  default: '通知公告'
},
list: {
  type: Array,
  default: () => []
},
categoryId: {
  type: [String, Number],
  required: false
}
})

function goMore() {
router.push(`/category/${props.categoryId}`)
}
</script>

<style scoped>
.notice-section {
margin-bottom: 40px;
padding: 16px 20px;
border-radius: 12px;
background: rgba(255, 255, 255, 0.85);
}

/* 头部 */
.section-header {
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 12px;
}

.section-header h3 {
font-size: 20px;
font-weight: bold;
}

/* 更多 */
.section-more {
cursor: pointer;
font-size: 16px;          
font-weight: 500;
color: #000;           
}

.section-more:hover {
text-decoration: underline;
}

.notice-list {
display: grid;
grid-template-columns: repeat(2, 1fr);
column-gap: 20px;
row-gap: 16px;
}
</style>
