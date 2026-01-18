<template>
    <div class="home-paged-section">
      <div class="section-header">
        <h3>{{ title }}</h3>
        <div
          v-if="categoryId"
          class="section-more"
          @click="goCategory"
        >
          <span>更多</span>
          <el-icon><ArrowRight /></el-icon>
        </div>
      </div>
  
      <el-carousel
        indicator-position="outside"
        arrow="always"
        :height="height"
        interval = "5000"
      >
        <el-carousel-item
          v-for="(page, index) in pages"
          :key="index"
        >
          <slot :pageItems="page" />
        </el-carousel-item>
      </el-carousel>
    </div>
</template>
  
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'

const router = useRouter()

function goCategory() {
  router.push(`/category/${props.categoryId}`)
}

const props = defineProps({
title: String,
list: {
    type: Array,
    default: () => []
},
pageSize: {
    type: Number,
    required: true
},
height: {
    type: String,
    default: '260px'
},
categoryId: {
    type: [String, Number],
    required: false
  }
})

const pages = computed(() => {
  const res = []
  for (let i = 0; i < props.list.length; i += props.pageSize) {
      res.push(props.list.slice(i, i + props.pageSize))
  }
  return res
})
</script>

<style scoped>
  .home-paged-section {
    margin-bottom: 40px;
  }
  
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    position: relative;
    z-index: 2;
  }
  
  .section-header h3 {
    font-size: 20px;
    font-weight: 600;
  }
  
  .section-more {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  
    font-size: 16px;    
    font-weight: 500;
    color: #000;      
  
    user-select: none;
  }
  
  .section-more:hover {
    color: #555;
  }
  </style>
  
