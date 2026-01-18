<template>
  <div class="container">
    <NewsListCard
      v-for="n in newsList"
      :key="n.id"
      :news="n"
    />

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="loadData"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { fetchNewsList } from '../api/news'
import { useRoute, useRouter } from 'vue-router'
import { getCategory } from '../api/category'
import NewsListCard from '../components/NewsListCard.vue'

const route = useRoute()
const router = useRouter()

// 拿到分类 ID 和名称
// const categoryId = Number(route.params.id)

const newsList = ref([])
const total = ref(0)
const pageSize = 8

//按分类查询
const loadData = async (page = 1) => {
  const categoryId = route.params.id ? Number(route.params.id) : null
  const res = await fetchNewsList(page, pageSize, categoryId)

  newsList.value = res.data.rows
  total.value = res.data.total
}

onMounted(async () => {
  await loadData()
  await updateTitle()
})

watch(
  () => route.params.id,
  async () => {
    await loadData(1)
    await updateTitle()
    window.scrollTo({ top: 0 })
  }
)


const goDetail = (id) => router.push(`/news/${id}`)

const updateTitle = async () => {
  // if (!route.params.id) {
  //   document.title = '百目新闻'
  //   return
  // }

  const id = Number(route.params.id)
  const res = await getCategory(id)

  if (res?.data?.name) {
    document.title = `${res.data.name}-百目新闻`
  }
}

</script>

<style scoped>
.container {
  padding-top: 80px;
}

</style>
