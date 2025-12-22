<template>
  <div class="container">
    <el-card
      v-for="n in newsList"
      :key="n.id"
      @click="goDetail(n.id)"
      class="card"
    >
      <h3>{{ n.title }}</h3>
      <p>{{ n.content.substring(0, 80) }}...</p>
    </el-card>

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

// onMounted(() => loadData())
// watch(
//   () => route.params.id,
//   () => {
//     loadData(1)
//     window.scrollTo({ top: 0 })   // 可选：切换分类后回到顶部
//   }
// )
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
  //   document.title = '百目新闻(•ө•)'
  //   return
  // }

  const id = Number(route.params.id)
  const res = await getCategory(id)

  if (res?.data?.name) {
    document.title = `${res.data.name}-百目新闻(•ө•)`
  }
}

</script>

<style scoped>
.card {
  margin: 12px 0;
  cursor: pointer;
}
</style>
