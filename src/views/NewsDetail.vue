<template>
<div class="container">
  <el-card class="news-card" shadow="never">
    <!-- 标题 -->
    <h1 class="title">{{ news.title }}</h1>

    <!-- 时间 -->
    <div class="meta">
      <el-icon><Clock /></el-icon>
      <span>{{ news.createTime }}</span>
    </div>

    <!-- 封面 -->
    <!-- <img
      v-if="news.coverUrl"
      :src="news.coverUrl"
      class="cover"
    /> -->
    
    <!-- 正文 -->
    <div class="content" v-html="news.content"></div>
    
    <div class="comment-separator"></div>

    <CommentEditor
      :news-id="news.id"
      @success="reloadComments"
    />
    <CommentList
      ref="commentList"
      :news-id="news.id"
    />
  
  </el-card>
</div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getNewsDetail } from '../api/news'
import { useRoute } from 'vue-router'
import { Clock } from '@element-plus/icons-vue'
import CommentEditor from '../components/CommentEditor.vue'
import CommentList from '../components/CommentList.vue'

const route = useRoute()
const id = route.params.id

const news = ref({})
const commentList = ref(null)
function reloadComments() {
  commentList.value?.load()
}

onMounted(async () => {
  const res = await getNewsDetail(id)
  news.value = res.data

  const siteName = '百目新闻'
  document.title = `${news.value.title} - ${siteName}`
})
</script>
<style scoped>
.container {
max-width: 900px;
margin: 0 auto;
padding: 100px 20px 40px;
}

.news-card {
padding: 32px;
border-radius: 14px;
background: rgba(255, 255, 255, 0.95);
}

/* 标题 */
.title {
font-size: 28px;
font-weight: 700;
line-height: 1.4;
margin-bottom: 12px;
}

/* 时间 */
.meta {
display: flex;
align-items: center;
gap: 6px;
color: #888;
font-size: 14px;
margin-bottom: 20px;
}

/* 封面 */
.cover {
width: 80%;
max-height: 300px;   /* 关键：控制视觉高度 */
object-fit: cover;
border-radius: 12px;
margin-bottom: 24px;
}


/* 正文排版 */
.content {
font-size: 16px;
line-height: 1.9;
color: #333;
}

/* 正文里的元素优化 */
.content :deep(p) {
margin-bottom: 1em;
}

.content :deep(img) {
max-width: 100%;
border-radius: 8px;
margin: 16px 0;
}

.content :deep(h2),
.content :deep(h3) {
margin: 24px 0 12px;
font-weight: 600;
}
/* 正文与评论的分隔线 */
.comment-separator {
  margin: 48px 0 24px;   
  height: 1px;
  background-color: #eee;
}

</style>