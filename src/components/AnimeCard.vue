<template>
    <div class="anime-card" @click="open">
      <img
        class="cover"
        :src="news.coverUrl || defaultImg"
        alt=""
      />
  
      <div class="mask">
        <div class="title">
          {{ news.title }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const props = defineProps({
    news: {
      type: Object,
      required: true
    }
  })
  
  const router = useRouter()
  const defaultImg = '/default-cover.jpg'
  
  function open() {
    router.push(`/news/${props.news.id}`)
  }
  </script>
  
  <style scoped>
  .anime-card {
    position: relative;
    width: 100%;
    height: 190px;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
  }
  
  /* 图片 */
  .cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .35s ease;
}

.anime-card:hover .cover {
  transform: scale(1.06);
}
  
  /* 白色信息蒙版*/
  .mask {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  
    height: 23%;
    padding: 12px;
    box-sizing: border-box;
  
    display: flex;
    align-items: flex-end;
  
    background: linear-gradient(
      to top,
      rgba(255,255,255,.95),
      rgba(255,255,255,.75)
    );

    transition: height .25s ease;
  }
  
  .anime-card:hover .mask {
    height: 38%;
  }
  
  /* 标题 */
  .title {
    font-size: 14px;
    font-weight: 600;
    color: #222;
    line-height: 1.4;
  
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  
    transition: -webkit-line-clamp .25s ease;
  }
  
  .anime-card:hover .title {
    -webkit-line-clamp: 3;
  }
  </style>
  