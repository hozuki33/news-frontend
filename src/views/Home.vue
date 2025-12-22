<template>
  <div class="home">

    <!-- 今日要闻 -->
    <div class="hero" v-if="heroNews.length">
      <el-carousel height="420px" indicator-position="outside">
        <el-carousel-item
          v-for="item in heroNews"
          :key="item.id"
          @click="openNews(item.id)"
        >
          <div class="hero-slide">
            <img :src="item.coverUrl || defaultImg" />
            <div class="hero-mask">
              <h2>{{ item.title }}</h2>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 其它分类 -->
    <div v-for="section in sections" :key="section.id">

      <!-- 游戏快报 -->
      <HomePagedSection
        v-if="section.name === '游戏快报'"
        :title="section.name"
        :list="section.list"
        :page-size="5"
        height="320px"
      >
        <template #default="{ pageItems }">
          <div class="game-row">
            <GameCard
              v-for="item in pageItems"
              :key="item.id"
              :news="item"
              @click="openNews(item.id)"
            />
          </div>
        </template>
      </HomePagedSection>

      <!-- 动画资讯 -->
      <HomePagedSection
        v-else-if="section.name === '动画资讯'"
        :title="section.name"
        :list="section.list"
        :page-size="12"
        height="570px"
      >
        <template #default="{ pageItems }">
          <div class="anime-grid">
            <AnimeCard
              v-for="item in pageItems"
              :key="item.id"
              :news="item"
              @click="openNews(item.id)"
            />
          </div>
        </template>
      </HomePagedSection>
      <!-- 通知公告 -->
      <NoticeListSection
        v-if="section.name === '通知公告'"
        :title="section.name"
        :list="section.list"
      />


      <!-- 其它分类（普通卡片，保持你原来的） -->
      <!-- <div v-else class="section">
        <div class="section-header">
          <h3>{{ section.name }}</h3>
        </div>

        <el-row :gutter="20">
          <el-col
            v-for="item in section.list"
            :key="item.id"
            :md="8"
          >
            <el-card shadow="hover" @click="openNews(item.id)">
              <img :src="item.coverUrl || defaultImg" class="card-img" />
              <div class="card-title">{{ item.title }}</div>
            </el-card>
          </el-col>
        </el-row>
      </div> -->

    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NoticeListSection from '../components/NoticeListSection.vue'

import HomePagedSection from '../components/HomePagedSection.vue'
import GameCard from '../components/GameCard.vue'
import AnimeCard from '../components/AnimeCard.vue'

import { fetchCategoryList } from '../api/category'
import { fetchNewsList } from '../api/news'

const router = useRouter()

const heroNews = ref([])
const sections = ref([])
const defaultImg = '/default-cover.jpg'

onMounted(async () => {
  const catRes = await fetchCategoryList()
  const categories = catRes.data || []

  for (const cat of categories) {
    const res = await fetchNewsList({
      page: 1,
      pageSize: cat.name === '今日要闻' ? 5 : 6,
      categoryId: cat.id
    })

    if (cat.name === '今日要闻') {
      heroNews.value = res.data.rows
    } else {
      sections.value.push({
        id: cat.id,
        name: cat.name,
        list: res.data.rows
      })
    }
  }
})

function openNews(id) {
  router.push(`/news/${id}`)
}

function goCategory(categoryId) {
  router.push(`/category/${categoryId}`)
}
</script>

<style scoped>
.home {
  padding: 80px 90px 40px 90px;

  /* 背景图 */
  background-image: url('/bg-home.jpg');
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  background-attachment: fixed;
}


/* ===== 今日要闻 ===== */
.hero {
  margin-bottom: 40px;
}

.hero-slide {
  position: relative;
  height: 420px;
  cursor: pointer;
}

.hero-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-mask {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px;
  background: linear-gradient(to top, rgba(0,0,0,.7), transparent);
  color: #fff;
}

.hero-mask h2 {
  font-size: 26px;
  font-weight: bold;
}

/* ===== 分类板块 ===== */
.section {
  margin-bottom: 40px;
  padding: 0;

  /* 完全透明 */
  background: transparent;
  border-radius: 0;
}


.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h3 {
  font-size: 20px;
  font-weight: bold;
}

.more {
  cursor: pointer;
  font-size: 14px;
  color: #409eff;
}
.el-card {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}


.news-card {
  cursor: pointer;
}

.card-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.card-title {
  margin-top: 10px;
  font-size: 15px;
  font-weight: 500;
}
/* 游戏模块 */
.game-news-section {
  background: transparent;
}
.game-news-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
}

/* 游戏：一行 */
.game-row {
  display: flex;
  gap: 16px;
}

/* 动画：4 × 3 */
.anime-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

</style>
