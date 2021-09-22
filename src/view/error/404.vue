<template>
    <div class="error-page">
        <img src="../../assets/images/404.png" />
        <div class="info">
            <h2>404</h2>
            <p>对不起，您访问的页面不存在</p>
        </div>
    </div>
</template>

<script>
</script>

<style lang="less">
    .error-page{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .info{
            padding-left: 40px;
        }
        h2{
            font-size: 56px;
        }
        p{
            font-size: 24px;
            color: #909399;
        }
    }
</style>
