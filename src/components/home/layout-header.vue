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
        <img class="head-img" src="../../assets/img/avatar.jpg" alt />
        <el-dropdown trigger="click">
      <span class="el-dropdown-link" style="cursor:pointer">
        百一优<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item>Git地址</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {}
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
