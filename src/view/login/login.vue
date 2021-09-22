<template>
	<div class="login-x">
        <div class="tit-x">
            <img src="../../assets/images/logo.png" />
            <span>社区通统一工作平台</span>
        </div>
        <div class="card">
            <div class="tab-x">
                <div class="cell active">账号密码登录</div>
                <div class="cell">验证码登录</div>
            </div>
            <div class="form-con">
                <login-form @on-success-valid="handleSubmit"></login-form>
            </div>
        </div>
	</div>
</template>

<script>
	import LoginForm from '_c/login-form'
	import { mapActions } from 'vuex'
	export default {
		components: {
			LoginForm
		},
		methods: {
			...mapActions([
				'handleLogin',
				'getUserInfo'
			]),
			handleSubmit({
				userName,
				password
			}) {

				this.handleLogin({
					userName,
					password
				}).then(res => {
					this.getUserInfo().then(res => {
              
						this.$router.push({
							name: 'form'
						})
					})
				})
			}
		}
	}
</script>

<style lang="less" scoped>
    @import '../../assets/style/vars.less';
    @import './login.less';
</style>
