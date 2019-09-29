<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">素材列表</template>
    </bread-crumb>
    <!-- 点击上传 -->
    <el-upload action="" :show-file-list="false" :http-request="uploadImg" class="fileimg">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <!-- 全部素材 -->
    <el-tabs v-model="activeName" @tab-click="changeTab" v-loading="loading">
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
          <el-card class="img-item" :body-style="{ padding: '10px' }" v-for="item in list"
            :key="item.id">
            <img :src="item.url" alt />
            <div class="operate">
              <i @click="collection(item)" :style="{color: item.is_collected? '#e0861a': '#666'}"
                class="el-icon-picture"></i>
              <i @click="delmaterial(item.id)" class="el-icon-delete"></i>
            </div>
          </el-card>
        </div>
        <el-row type="flex" justify="center" style="margin-top: 15px">
          <el-pagination @current-change="changepage" :total="page.total"
            :current-page="page.pagecurrent" :page-size="page.pagesize" background
            layout="prev, pager, next">
          </el-pagination>
        </el-row>
      </el-tab-pane>
      <!-- 收藏素材 -->
      <el-tab-pane label="收藏素材" name="collect">
        <div class="img-list">
          <el-card class="img-item" :body-style="{ padding: '10px' }" v-for="item in list"
            :key="item.id">
            <img :src="item.url" alt />
            <div class="operate">
            </div>
          </el-card>
        </div>
        <el-row type="flex" justify="center" style="margin-top: 15px">
          <el-pagination @current-change="changepage" :total="page.total"
            :current-page="page.pagecurrent" :page-size="page.pagesize" background
            layout="prev, pager, next">
          </el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      loading: false,
      page: {
        total: 0, // 总条数
        pagecurrent: 1, // 默认第一页
        pagesize: 12 // 每页条数
      }
    }
  },
  methods: {
    collection (item) {
      this.$axios({
        url: `/user/images/${item.id}`,
        method: 'PUT',
        data: { collect: !item.is_collected }
      }).then(() => {
        this.getMaterial()
      })
    },
    // 删除图片素材
    delmaterial (id) {
      this.$confirm('是否确定删除该图片？').then(() => {
        this.$axios({
          url: `/user/images/${id}`,
          method: 'DELETE'
        }).then(() => {
          this.getMaterial()
        })
      })
    },
    // 自定义上传方法
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'POST',
        data
      }).then(() => {
        this.getMaterial()
      })
    },
    // 切换页签方法
    changeTab () {
      this.page.pagecurrent = 1
      this.getMaterial()
    },
    // 当点击 收藏素材 时，this.activeName==='collect' collect为true
    // 当点击 全部素材 时，this.activeName==='all' all为false
    getMaterial () {
      this.loading = true
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect',
          page: this.page.pagecurrent,
          per_page: this.page.pagesize
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
        this.loading = false
      })
    },
    changepage (newpage) {
      this.page.pagecurrent = newpage
      this.getMaterial()
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.fileimg {
  position: absolute;
  right: 35px;
  margin-top: -5px;
}
.img-list {
  display: flex;
  flex-wrap: wrap;
  .img-item {
    position: relative;
    width: 159px;
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
