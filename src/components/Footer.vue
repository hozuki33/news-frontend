<template>
<footer class="footer">
    <div class="footer-inner">
    <div class="left">
        <div class="site-name">百目新闻(•ө•)</div>
        <div class="desc">
        聚合游戏 · 动画 · 资讯内容的展示平台
        </div>
    </div>

    <div class="right">
        <div>© 2025 百目新闻</div>
        <div>All Rights Reserved</div>
    </div>
    </div>
</footer>
</template>

<script setup>
</script>

<style>
.footer {
    margin-top: 60px;
    padding: 24px 0;

    background: rgba(255, 255, 255, 0.4);

    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);

}


.footer-inner {
max-width: 1200px;
margin: 0 auto;
padding: 0 90px;

display: flex;
justify-content: space-between;
align-items: center;
}

.site-name {
font-size: 18px;
font-weight: 700;
color: #409EFF;
}

.desc {
font-size: 13px;
color: #666;
margin-top: 6px;
}

.right {
text-align: right;
font-size: 13px;
color: #666;
}
</style>
