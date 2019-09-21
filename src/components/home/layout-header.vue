<template>
  <el-row class="layout-header" type="flex" justify="space-between">
    <el-col :span="7" class="left">
      <div class="grid-content bg-purple">
        <i class="el-icon-s-fold icon"></i>
        <span class="title">江苏传智播客教育科技股份有限公司</span>
      </div>
    </el-col>

    <el-col :span="4" class="right">
      <div class="grid-content bg-purple">
        <!-- img 中引用的图片：-->
        <!-- 如为固定地址，vue-cli 把固定地址转化成base64位的字符串 -->
        <!-- 如不固定地址，就不能转成base64 -->
        <!-- 需使用 require() 手动将图片地址转成base64 -->
        <!-- 本地地址才需要转base64，线上地址不需要 -->

        <!-- 以下判断条件得来，所以为不固定地址 -->
        <img class="head-img" :src="userInfo.photo?userInfo.photo:defaultImg" alt />
        <el-dropdown trigger="click" @command="commonClick">
          <span class="el-dropdown-link" style="cursor:pointer">
            {{userInfo.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='account'>个人信息</el-dropdown-item>
            <el-dropdown-item command='git'>Git地址</el-dropdown-item>
            <el-dropdown-item command='exit'>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/404.png')
    }
  },
  methods: {
    getuserInfo () {
      // let token = window.localStorage.getItem('user-token')
      this.$axios({
        url: '/user/profile'
        // headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        this.userInfo = res.data
      })
    },
    commonClick (key) {
      if (key === 'account') {
        this.$router.push('/home/account')
      } else if (key === 'git') {
        window.location.href = 'https://github.com/DaQingjiao/toutiao--83/commits/master'
      } else {
        window.localStorage.clear()
        this.$router.push('./login')
      }
    }
  },
  created () {
    this.getuserInfo()
  }
}
</script>

<style lang="less" scoped>
.layout-header {
  height: 50px;
  background-color: #eee;
  line-height: 50px;
  .left {
    .bg-purple {
      .icon {
        font-size: 24px;
        vertical-align: middle;
      }
      .title {
        vertical-align: middle;
        padding-left: 10px;
      }
    }
  }
  .right {
    .head-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
}
</style>
