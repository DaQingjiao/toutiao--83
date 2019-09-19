<template>
  <el-container>
    <!-- 左侧菜单栏 -->
    <el-aside>
      <layout-aside></layout-aside>
    </el-aside>
    <el-container>
      <!-- 顶部 -->
      <el-header>Header</el-header>
      <el-main>
        <!-- 中间容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from '../../components/home/layout-aside'
export default {
  components: {
    'layout-aside': Aside
  }
}
</script>

<style>
</style>
