<template>
  <div
    class="comment-editor"
    ref="editorRef"
  >
    <!-- 左侧头像 -->
    <el-avatar
      class="avatar"
      :size="48"
      :src="defaultAvatar"
    />

    <!-- 右侧输入区 -->
    <div class="editor-right">
      <el-input
        v-model="content"
        type="textarea"
        :rows="2"
        resize="none"
        placeholder="写下你的评论…"
        @focus="expanded = true"
      />

      <!-- 操作区-->
      <div
        v-if="expanded"
        class="actions"
      >
        <!-- 未登录 -->
        <el-button
          v-if="!isLoggedIn"
          type="primary"
          size="small"
          @click="goLogin"
        >
          去登录
        </el-button>

        <!-- 已登录 -->
        <el-button
          v-else
          type="primary"
          size="small"
          :disabled="!content.trim()"
          @click="submit"
        >
          发表评论
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { isLogin } from '../api/auth'
import { addComment } from '../api/comment'
import defaultAvatar from '../assets/avatar/avatar_02.png'

const props = defineProps({
  newsId: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(['success'])

const router = useRouter()
const route = useRoute()

const content = ref('')
const expanded = ref(false)
const submitting = ref(false)
const editorRef = ref(null)

const isLoggedIn = computed(() => isLogin())

const goLogin = () => {
  router.push({
    path: '/login',
    query: { redirect: route.fullPath }
  })
}

const submit = async () => {
  if (!content.value.trim() || submitting.value) return

  submitting.value = true
  try {
    await addComment({
      newsId: props.newsId,
      content: content.value
    })

    content.value = ''
    expanded.value = false

    ElMessage.success('评论发表成功')
    emit('success')
  } finally {
    submitting.value = false
  }
}

/* 点击外部折叠 */
const handleClickOutside = (e) => {
  if (!editorRef.value) return
  if (!editorRef.value.contains(e.target)) {
    expanded.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
  

<style scoped>
.comment-editor {
  display: flex;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid #eee;
}

.avatar {
  flex-shrink: 0;
}

.editor-right {
  flex: 1;
}

.actions {
  margin-top: 8px;
  text-align: right;
}
</style>
