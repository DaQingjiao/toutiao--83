<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材列表</template>
    </bread-crumb>
    <!-- 全部素材 -->
    <el-tabs v-model="activeName" @tab-click='getMaterial'>
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
          <el-card
            class="img-item"
            :body-style="{ padding: '10px' }"
            v-for="item in list"
            :key="item.id">
            <img :src="item.url" alt />
            <div class="operate">
              <i :style="{color: item.is_collected? '#e0861a': '#666'}" class="el-icon-picture"></i>
              <i class="el-icon-delete"></i>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
      <!-- 收藏素材 -->
      <el-tab-pane label="收藏素材" name="collect">
        <div class="img-list">
          <el-card
            class="img-item"
            :body-style="{ padding: '10px' }"
            v-for="item in list"
            :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: []
    }
  },
  methods: {
    // 当点击 收藏素材 时，this.activeName==='collect' collect为true
    // 当点击 全部素材 时，this.activeName==='all' all为false
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect' }
      }).then(res => {
        this.list = res.data.results
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  .img-item {
    position: relative;
    width: 161px;
    height: 130px;
    border-radius: 6px;
    margin: 10px;
    padding: 0;
    img {
      width: 100%;
    }
    .operate {
      position: absolute;
      width: 100%;
      height: 27px;
      left: 0;
      bottom: 0;
      background-color: #ddd;
      display: flex;
      justify-content: space-around;
      align-items: center;
      i {
        font-size: 18px;
      }
    }
  }
}
</style>
