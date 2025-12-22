<template>
    <div class="home-paged-section">
      <div class="section-header">
        <h3>{{ title }}</h3>
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
background: transparent;
}

.section-header {
margin-bottom: 16px;
}

.section-header h3 {
font-size: 20px;
font-weight: bold;
}
</style>
