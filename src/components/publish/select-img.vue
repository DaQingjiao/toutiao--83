<template>
  <el-tabs v-model="activeName">
    <!-- 素材库 -->
    <el-tab-pane label="素材库" name="first">
      <div class="material">
        <el-card class="card" :body-style="{ padding: '10px' }" v-for="item in list" :key="item.id">
          <img @click="clickImg(item)" :src="item.url" class="cardImg">
        </el-card>
      </div>
      <el-row type="flex" justify="center">
        <el-pagination @current-change="changePage" background layout="prev, pager, next"
          :total="page.total" :page-size="page.pagesize" :current-page="page.currentPage">
        </el-pagination>
      </el-row>
    </el-tab-pane>
    <!-- 上传图片 -->
    <el-tab-pane label="上传图片" name="upload">
      <!-- action必须填  :show-file-list="false"隐藏图片名  :http-request="uploadImg"自定义上传-->
      <!-- list-type="picture-card" 文件列表的类型 -->
      <el-upload action="" list-type="picture-card" :http-request="uploadImg"
        :show-file-list="false">
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      list: [],
      page: {
        // 总条数
        total: 0,
        // 默认第一页
        currentPage: 1,
        // 每页条数
        pageSize: 12
      }
    }
  },
  methods: {
    // 自定义上传方法
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'POST',
        data
      }).then((res) => {
        this.$emit('selectOneImg', res.data.url)
      })
    },
    clickImg (item) {
      // 自定义事件 事件名、若干参数
      this.$emit('selectOneImg', item.url)
    },
    // 页码改变
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    // 获取素材库图片
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.material {
  display: flex;
  flex-wrap: wrap;
  .card {
    width: 140px;
    height: 100px;
    margin: 8px;
    .cardImg {
      width: 100%;
    }
  }
}
</style>
