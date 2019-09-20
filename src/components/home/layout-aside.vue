<template>
  <div class="layout-aside">
    <div class="title">
      <img src="../../assets/img/logo_admin.png" />
    </div>
    <!-- router属性 为true时，启用路由 -->
    <!-- :router = 'true' =>router -->
    <!-- index 类似 to -->
    <el-menu
      router
      style="width:201px"
      background-color="#353b4e"
      text-color=" #adafb5"
      active-text-color="#ffd04b"
    >
      <!-- 首页 -->
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 内容管理 -->
      <el-submenu index="/home/publish">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="/home/publish">发布文章</el-menu-item>
        <el-menu-item index="/home/articles">内容列表</el-menu-item>
        <el-menu-item index="/home/comment">评论列表</el-menu-item>
        <el-menu-item index="/home/material">素材列表</el-menu-item>
      </el-submenu>
      <!-- 粉丝管理 -->
      <el-submenu index="/home/gradata">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item index="/home/gradata">图文数据</el-menu-item>
        <el-menu-item index="/home/fanpro">粉丝概况</el-menu-item>
        <el-menu-item index="/home/Fansrt">粉丝画像</el-menu-item>
        <el-menu-item index="/home/fanlist">粉丝列表</el-menu-item>
      </el-submenu>
      <!-- 账户信息 -->
      <el-menu-item index="/home/account">
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
