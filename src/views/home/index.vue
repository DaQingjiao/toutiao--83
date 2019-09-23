<template>
  <el-container>
    <!-- 左侧菜单栏 -->
    <el-aside style="width:200px;overflow:hidden;background-color:#323745">
      <layout-aside></layout-aside>
    </el-aside>
    <el-container>
      <!-- 顶部 -->
      <el-header style="background-color: #E4E7ED;">
        <layout-header></layout-header>
      </el-header>
      <el-main style="padding: 0">
        <!-- 中间容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
</script>

<style>
</style>
