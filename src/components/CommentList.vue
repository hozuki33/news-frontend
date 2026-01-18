<template>
  <div class="comment-list">
    <div class="comment-header">
      共 {{ list.length }} 条评论
    </div>

    <el-empty v-if="list.length === 0" description="暂无评论" />

    <div
      v-for="item in visibleList"
      :key="item.id"
      class="comment-item"
    >
      <!-- 左侧头像 -->
      <el-avatar
        class="avatar"
        :size="48"
        :src="item.avatar || defaultAvatar"
      />

      <!-- 右侧内容 -->
      <div class="right">
        <!-- 顶部：昵称 + 时间 + 更多 -->
        <div class="header">
          <span class="nickname">
            {{ item.nickname || '匿名用户' }}
          </span>

          <div class="right-actions">
            <span class="time">{{ item.createTime }}</span>

            <!-- <el-dropdown
              v-if="canDelete(item)"
              trigger="click"
            >
              <el-icon class="more-icon">
                <MoreFilled />
              </el-icon>

              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="remove(item.id)">
                    删除
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown> -->
          </div>

        </div>

        <!-- 评论内容 -->
        <div class="content">
          {{ item.content }}
        </div>
      </div>
    </div>

    <!-- 展开更多 -->
    <div
      v-if="list.length > 5"
      class="expand"
      @click="expanded = !expanded"
    >
      {{ expanded ? '收起评论' : '展开更多评论' }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { fetchCommentList, deleteComment } from '../api/comment'
import defaultAvatar from '../assets/avatar/avatar_02.png'
import { MoreFilled } from '@element-plus/icons-vue'

const props = defineProps({
  newsId: Number
})

const list = ref([])
const expanded = ref(false)

const visibleList = computed(() => {
  return expanded.value ? list.value : list.value.slice(0, 5)
})
async function load() {
  if (!props.newsId) return
  const res = await fetchCommentList(props.newsId)
  list.value = res.data.rows
}

watch(
  () => props.newsId,
  (val) => {
    if (val) load()
  },
  { immediate: true }
)

function canDelete(item) {
  const userId = localStorage.getItem('userId')
  const role = localStorage.getItem('role')
  return role === 'admin' || userId == item.userId
}

async function remove(id) {
  await deleteComment(id)
  load()
}

onMounted(load)

defineExpose({ load })
</script>

<style scoped>
  
.comment-header {
  font-size: 14px;
  color: #444;
  padding-bottom: 10px;
  margin-bottom: 12px;
  border-bottom: 1px solid #eee;
  line-height: 35px;
}
.comment-item {
  display: flex;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid #eee;
}

.avatar {
  flex-shrink: 0;
}
.right {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content {
  display: flex;
  line-height: 1.6;
  font-size: 14px;
  color: #444;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 昵称 */
.nickname {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

/* 右侧操作区 */
.right-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.time {
  font-size: 12px;
  color: #999;
}

.more-icon {
  cursor: pointer;
  font-size: 18px;
  color: #999;
}

.more-icon:hover {
  color: #409eff;
}

/* 展开更多 */
.expand {
  margin-top: 12px;
  text-align: center;
  color: #409eff;
  cursor: pointer;
  font-size: 14px;
}

.expand:hover {
  text-decoration: underline;
}

</style>
