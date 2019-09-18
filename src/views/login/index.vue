<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" />
      </div>

      <el-form style="margin-top: 15px" ref="loginForm" :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-input v-model="loginForm.code" style="width: 65%" placeholder="请输入验证码"></el-input>
          <el-button style="float: right">发送验证码</el-button>
        </el-form-item>

        <el-form-item prop="agree">
          <el-checkbox v-model="loginForm.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button @click="login" type="primary" style="width: 100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // rule(当前规则),value(当前值),callback(回调函数)
    // new Error('xxx') 抛出的信息
    let validator = function (rule, value, callback) {
      value ? callback() : callback(new Error('请认真阅读协议和条款'))
    }
    return {
      loginForm: {
        mobile: '',
        code: '',
        agree: false
      },
      loginRules: {
        // required 为true 就表示该字段必填
        // message 表示提示信息
        mobile: [
          { required: true, message: '请输入你的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入的手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '请输入的验证码错误' }
        ],
        agree: [{ validator }]
      }
    }
  },
  methods: {
    login () {
      // 校验整个表单的规则
      // validata方法：传入一个函数 两个参数 是否校验成功/未校验成功字段
      this.$refs.loginForm.validate(isok => {
        if (isok) {
          this.$axios({
            url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
            method: 'POST',
            data: this.loginForm
          }).then(res => this.$router.push('./home')).catch(() => {
            // 当不满足设置的规则时的提示信息
            this.$message({
              type: 'warning',
              message: '您的手机号或者验证码错误'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 440px;
    height: 330px;
    .title {
      text-align: center;
      img {
        height: 45px;
      }
    }
  }
}
</style>
