<template>
    <div class="error-page">
        <img src="../../assets/images/no-access.png" />
        <div class="info">
            <h3>暂无此模块权限</h3>
            <p>如有需要，请联系管理员开通</p>
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
        h3{
            font-size: 32px;
        }
        p{
            font-size: 24px;
            color: #909399;
        }
    }
</style>
