<template>
  <!-- v-loading 指令 加载进度条 -->
  <el-card v-loading="loading">
    <!-- slot="header"为卡片插槽 -->
    <bread-crumb slot="header">
      <!-- slot="title"为面包屑插槽 -->
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="tableData" stripe>
      <!-- prop 为字段、label为表头 width为宽度-->
      <el-table-column prop="title" label="标题" width="400"></el-table-column>
      <el-table-column :formatter="formatter" prop="comment_status" label="评论状态" align="center">
      </el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数" align="center"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="obj">
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="warning" @click="switchstate(obj.row)">
            {{obj.row.comment_status?'关闭评论':'打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="margin: 15px">
      <el-pagination @current-change="changepage" background layout="prev, pager, next"
        :total="page.total" :current-page="page.pagecurrent" :page-size="page.pagesize">
      </el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      page: {
        total: 0, // 总条数
        pagecurrent: 1, // 默认第一页
        pagesize: 10 // 每页条数
      },
      loading: false // 加载数据
    }
  },
  methods: {
    getComment () {
      this.loading = true // 显示遮罩
      this.$axios({
        url: '/articles',
        // 路径参数
        params: {
          response_type: 'comment',
          page: this.page.pagecurrent,
          per_page: this.page.pagesize
        }
      }).then(res => {
        this.tableData = res.data.results
        this.page.total = res.data.total_count // 把总条数给分页总条数
        this.loading = false // 隐藏遮罩
      })
    },
    formatter (row, column, cellValue, index) {
      // row为当前行数据, column为列信息, cellValue为当前单元格值, index为索引
      return cellValue ? '正常' : '关闭'
    },
    switchstate (row) {
      let kg = row.comment_status ? '关闭' : '打开'
      this.$confirm(`是否确定${kg}评论?`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios({
          url: 'comments/status',
          method: 'PUT',
          params: { article_id: row.id.toString() },
          // 是否允许评论  取反：让点击改变评论状态
          data: { allow_comment: !row.comment_status }
        }).then(() => {
          this.getComment()
        })
      })
    },
    changepage (newpage) {
      this.page.pagecurrent = newpage
      this.getComment()
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
