<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
      <div class="pane" v-if="tab == 0">
        <FormItem prop="userName">
          <Input v-model="form.userName" placeholder="请输入用户名称">
            <span slot="prepend">
              <i class="icon-cus-user"></i>
            </span>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="form.password" placeholder="请输入登录密码">
            <span slot="prepend">
              <i class="icon-cus-pwd"></i>
            </span>
          </Input>
        </FormItem>
    </div>
    <!-- 验证码登录 -->
    <div class="pane " v-else-if="tab == 1">
        <FormItem prop="userName">
          <Input v-model="form.userName" placeholder="请输入用手机号码">
            <span slot="prepend">
              <i class="icon-cus-phone"></i>
            </span>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="form.password" placeholder="请输入验证码">
            <span slot="prepend">
              <i class="icon-cus-checkno"></i>
            </span>
          </Input>
          <!-- disabled样式置灰 -->
          <div class="btn disabled">获取验证码</div>
        </FormItem>
    </div>
    <FormItem>
      <Button @click="handleSubmit" type="primary" :loading="loading" size="large" class="gra" long>登录</Button>
    </FormItem>
  </Form>
</template>

<script>
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    },
    // 切换tab
    tab: {
        type: Number,
        default: 0
    },
    // 登录
    loading: {
        type: Boolean,
        default: false
    }
  },
  data () {
    return {
      form: {
        userName: '',
        password: ''
      }
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password
          })
        }
      })
    }
  }
}
</script>
