<template>
  <el-container>
    <!-- 左侧菜单栏 -->
    <el-aside style="width:200px">
      <layout-aside></layout-aside>
    </el-aside>
    <el-container>
      <!-- 顶部 -->
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <el-main>
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
