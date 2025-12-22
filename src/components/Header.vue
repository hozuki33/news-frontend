<template>
  <el-header class="header">
    <div class="logo">
      <img src="/favicon.ico" class="logo-icon" />
      <span>百目新闻</span>
    </div>

    <el-menu
      mode="horizontal"
      :default-active="active"
      class="menu"
      @select="onSelect"
    >
      <el-menu-item index="0">首页</el-menu-item>

      <el-menu-item
        v-for="c in categories"
        :key="c.id"
        :index="String(c.id)"
      >
        {{ c.name }}
      </el-menu-item>
    </el-menu>
  </el-header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getCategories } from "../api/news.js";

const router = useRouter();
const route = useRoute();
const categories = ref([]);

const active = ref("0");

onMounted(async () => {
  const res = await getCategories();
  categories.value = res.data;

  updateActive();
});

function updateActive() {
  if (route.path.startsWith("/category/")) {
    active.value = String(route.params.id);
  } else {
    active.value = "0";
  }
}

function onSelect(key) {
  if (key === "0") {
    router.push("/");
  } else {
    router.push(`/category/${key}`);
  }
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;

  font-size: 22px;
  font-weight: 700;
  color: #409EFF;
  padding-left: 20px;
}

.logo-icon {
  width: 24px;
  height: 24px;
}


.menu {
  flex: 1;
  justify-content: flex-end;
  padding-right: 20px;
}
</style>
