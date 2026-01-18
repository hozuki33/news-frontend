<template>
    <div class="login-container">
      <el-card class="login-card">
        <h2 class="title">用户注册</h2>
  
        <el-form :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.username" />
          </el-form-item>
  
          <el-form-item label="昵称">
            <el-input v-model="form.nickname" />
          </el-form-item>
  
          <el-form-item label="密码">
            <el-input v-model="form.password" type="password" />
          </el-form-item>
  
          <el-form-item>
            <el-button type="primary" @click="submit" style="width: 100%">
              注册
            </el-button>
          </el-form-item>
  
          <div class="footer">
            已有账号？
            <span class="link" @click="goLogin">去登录</span>
          </div>
        </el-form>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { register } from '../api/auth'
  import { ElMessage } from 'element-plus'
  
  const router = useRouter()
  
  const form = ref({
    username: '',
    password: '',
    nickname: ''
  })
  
  const submit = async () => {
    if (!form.value.username || !form.value.password) {
      ElMessage.error('用户名和密码不能为空')
      return
    }
  
    await register(form.value)
    ElMessage.success('注册成功，请登录')
    router.push('/login')
  }
  
  const goLogin = () => {
    router.push('/login')
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
    width: 380px;
    padding: 30px;
  }
  
  .title {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .footer {
    text-align: center;
    font-size: 14px;
  }
  
  .link {
    color: #409eff;
    cursor: pointer;
  }
  </style>
  