<template>
  <el-card v-loading="loading">
    <bread-crumb slot='header'>
      <template slot='title'>账户信息</template>
    </bread-crumb>
    <div class="account">
      <div class="portrait">
        <div class="cntImg">
          <img :src="formData.photo?formData.photo:defaultImg" class="nameImg">
          <div class="nickname">
            <span>{{formData.name}}</span>
            <span>{{formData.intro}}</span>
          </div>
        </div>

        <el-button @click="replaceImg" type="text" class="headImg" style="padding-bottom: 0">更换头像
        </el-button>
        <!-- 头像弹框 -->
        <el-dialog :visible="dialogVisible" @close="dialogVisible=false">
          <!-- action必须填  :show-file-list="false"隐藏图片名 -->
          <!-- :http-request="uploadImg"自定义上传 -->
          <!-- list-type="picture-card" 文件列表的类型 -->
          <el-upload style="text-align: center" action="" list-type="picture-card"
            :http-request="headerImg" :show-file-list="false">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-dialog>
      </div>
      <el-divider></el-divider>

      <div class="information">
        <span>账户信息</span>
        <span>头条号类型：</span>
        <span>个人</span>
      </div>
      <el-divider></el-divider>
      <div class="information">
        <span>头条号ID</span>
        <span>{{formData.id}}</span>
      </div>
      <el-divider></el-divider>
      <div class="information">
        <span>登录方式</span>
        <span>绑定手机号：</span>
        <span>{{formData.mobile}}</span>
      </div>
      <el-divider></el-divider>
      <div class="information">
        <span>电子邮箱</span>
        <span>{{formData.email}}</span>
        <el-button @click="accordingEditor" type="text" class="editor" style="padding-bottom: 0">
          修改信息
        </el-button>
        <!-- 修改弹框 -->
        <el-dialog title="修改信息" :visible="dialogFormVisible" @close="dialogFormVisible=false">
          <el-form ref="userData" :rules="accountRules" :model="formData">
            <el-form-item label="用户名：" prop="name">
              <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="介绍：" prop="intro">
              <el-input type="textarea" v-model="formData.intro"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱：" prop="email">
              <el-input v-model="formData.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="savaUser" type="primary">保存</el-button>
              <el-button @click="dialogFormVisible=false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </div>
  </el-card>

</template>

<script>
// 实际为vue实例
import eventBus from '../../utlis/eventBus'
export default {
  data () {
    return {
      dialogVisible: false,
      dialogFormVisible: false,
      formData: {},
      loading: false,
      defaultImg: require('../../assets/img/404.png'),
      accountRules: {
        name: [{ required: true, message: '用户名不能为空' }, { pattern: /^[A-Za-z0-9\u4e00-\u9fff\w]{3,7}$/, message: '用户名要控制在1到7个字符' }],
        intro: [{ required: true, message: '介绍不能为空' }, { pattern: /^[A-Za-z0-9\u4e00-\u9fff\w]{3,150}$/, message: '介绍要控制在1到150个字符' }],
        email: [{ required: true, message: '邮箱不能为空' }, { pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/, message: '邮箱格式不正确' }]
      }
    }
  },
  methods: {
    // 编辑用户信息
    savaUser () {
      this.$refs.userData.validate((isOK) => {
        if (isOK) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(() => {
            //  抛出一个事件  updataUser事件在eventBus上
            eventBus.$emit('updataUser')
            this.dialogFormVisible = false
            // 成功了 提示消息
            this.$message({ message: '保存成功', type: 'success' })
          })
        }
      })
    },
    // 编辑用户头像
    headerImg (params) {
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'PATCH',
        data
      }).then((res) => {
        //  抛出一个事件
        eventBus.$emit('updataUser')
        this.formData.photo = res.data.photo
        this.dialogVisible = false
      })
    },
    // 获取用户信息
    userData () {
      this.loading = true
      this.$axios({
        url: '/user/profile'
      }).then((res) => {
        this.formData = res.data
        this.loading = false
      })
    },
    // 点击跟换头像 弹出对话框
    replaceImg () {
      this.dialogVisible = true
    },
    accordingEditor () {
      this.dialogFormVisible = true
    }
  },
  created () {
    this.userData()
  }
}
</script>

<style lang="less" scoped>
.account {
  padding-left: 50px;
  .portrait {
    margin-left: 30px;
    .cntImg {
      display: flex;
      .nameImg {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
      .nickname {
        display: flex;
        flex-direction: column;
        margin-left: 45px;
        span:nth-child(1) {
          margin: 10px 0;
        }
        span:nth-child(2) {
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
  .headImg {
    margin-left: 7px;
  }
  .editor {
    float: right;
    margin-right: 20px;
  }
}
.information {
  padding-left: 30px;
  font-size: 14px;
  span:nth-child(2) {
    margin-left: 60px;
  }
}
</style>
