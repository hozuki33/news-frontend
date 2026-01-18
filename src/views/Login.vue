<template>
    <div class="login-container">
      <el-card class="login-card">
        <h2 class="title">用户登录</h2>
  
        <el-form :model="form" :rules="rules" ref="formRef">
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              placeholder="用户名"
              clearable
            />
          </el-form-item>
  
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="密码"
              show-password
            />
          </el-form-item>
  
          <el-button
            type="primary"
            class="login-btn"
            @click="handleLogin"
          >
            登录
          </el-button>
  
          <!-- 注册入口：放在登录按钮下方 -->
          <div class="register-tip">
            还没有账号？
            <span class="link" @click="goRegister">立即注册</span>
          </div>
        </el-form>
      </el-card>
    </div>
  </template>
  

<script setup>
import { ref } from 'vue'
import { login } from '../api/user'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const formRef = ref()
const form = ref({
username: '',
password: ''
})

const rules = {
username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
const goRegister = () => {
  router.push('/register')
}

const handleLogin = () => {
formRef.value.validate(async valid => {
    if (!valid) return

    try {
    const res = await login(form.value)
    const data = res.data

    // 保存登录信息
    localStorage.setItem('token', data.token)
    localStorage.setItem('userName', data.name)
    localStorage.setItem('role', data.role)

    ElMessage.success('登录成功')

    // 登录后跳回原页面
    const redirect = route.query.redirect
    router.push(redirect || '/')
    } catch (err) {
    ElMessage.error(err.message || '登录失败')
    }
})
}
</script>
<style scoped>
.login-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f5f6fa;
}

.login-card {
    width: 360px;
    padding: 24px;
}

.title {
    text-align: center;
    margin-bottom: 20px;
}

.login-btn {
    width: 100%;
}

.register-tip {
    margin-top: 16px;
    text-align: center;
    font-size: 14px;
    color: #666;
}

.link {
    margin-left: 4px;
    color: #409EFF;
    cursor: pointer;
}
</style>
    