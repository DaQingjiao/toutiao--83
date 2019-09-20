<template>
  <div class="layout-aside">
    <div class="title">
      <img src="../../assets/img/logo_admin.png" />
    </div>
    <el-menu
      style="width:201px"
      background-color="#353b4e"
      text-color=" #adafb5"
      active-text-color="#ffd04b"
    >
      <!-- 首页 -->
      <el-menu-item index="1">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 内容管理 -->
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="1-1">发布文章</el-menu-item>
        <el-menu-item index="1-2">内容列表</el-menu-item>
        <el-menu-item index="1-3">评论列表</el-menu-item>
        <el-menu-item index="1-4">素材列表</el-menu-item>
      </el-submenu>
      <!-- 粉丝管理 -->
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item index="1-1">图文数据</el-menu-item>
        <el-menu-item index="1-2">粉丝概况</el-menu-item>
        <el-menu-item index="1-3">粉丝画像</el-menu-item>
        <el-menu-item index="1-4">粉丝列表</el-menu-item>
      </el-submenu>
      <!-- 账户信息 -->
      <el-menu-item index="4">
        <i class="el-icon-s-tools"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.layout-aside {
  width: 200px;
  height: 100vh;
  background-color: #323745;
  .title {
    text-align: center;
    background-color: #2e2f32;
    padding: 13px 0;
    img {
      height: 30px;
    }
  }
}
</style>
