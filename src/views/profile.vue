<template>
<div class="profile-container">
    <el-card class="profile-card" shadow="never">
    <div class="header">
        <el-avatar
        :size="80"
        :src="user.avatar || defaultAvatar"
        />
        <div class="basic">
        <div class="username">{{ user.username }}</div>
        <el-tag size="small" type="info">
            {{ user.role === 'admin' ? '管理员' : '普通用户' }}
        </el-tag>
        </div>
    </div>

    <el-divider />

    <el-descriptions
        title="基本信息"
        :column="1"
        border
    >
        <el-descriptions-item label="用户ID">
        {{ user.id }}
        </el-descriptions-item>

        <el-descriptions-item label="用户名">
        {{ user.username }}
        </el-descriptions-item>

        <el-descriptions-item label="角色">
        {{ user.role }}
        </el-descriptions-item>

        <el-descriptions-item label="注册时间">
        {{ user.createTime || '-' }}
        </el-descriptions-item>
    </el-descriptions>

    <div class="actions">
        <el-button
        type="danger"
        @click="logout"
        >
        退出登录
        </el-button>
    </div>
    </el-card>
</div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { getUserInfo } from '@/api/user'
import defaultAvatar from '@/assets/avatar/avatar_02.png'

const router = useRouter()
const user = ref({})

async function loadUser() {
    const res = await getUserInfo()
    user.value = res.data
}

function logout() {
    ElMessageBox.confirm(
    '确认退出登录吗？',
    '提示',
    { type: 'warning' }
    ).then(() => {
    localStorage.clear()
    ElMessage.success('已退出登录')
    router.push('/login')
    })
}

onMounted(loadUser)
</script>
<style scoped>
.profile-container {
    padding: 30px;
    display: flex;
    justify-content: center;
}

.profile-card {
    width: 520px;
}

.header {
    display: flex;
    align-items: center;
    gap: 20px;
}

.basic {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.username {
    font-size: 20px;
    font-weight: 600;
}

.actions {
    margin-top: 24px;
    text-align: center;
}
</style>
    