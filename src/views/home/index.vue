<template>
  <el-container>
    <!-- 左侧菜单栏 -->
    <el-aside style="width:200px;overflow:hidden;background-color:#323745">
      <layout-aside></layout-aside>
    </el-aside>
    <el-container style="background-color: #f2f3f5">
      <!-- 顶部 -->
      <el-header style="background-color: #fff;">
        <layout-header></layout-header>
      </el-header>
      <el-main style="padding: 10px">
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
