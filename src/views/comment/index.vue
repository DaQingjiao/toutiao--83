<template>
  <el-card>
    <!-- slot="header"为卡片插槽 -->
    <bread-crumb slot="header">
      <!-- slot="title"为面包屑插槽 -->
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="tableData" stripe>
      <!-- prop 为字段、label为表头 width为宽度-->
      <el-table-column prop="title" label="标题" width="400"></el-table-column>
      <el-table-column :formatter="formatter" prop="comment_status" label="评论状态" align="center"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数" align="center"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini">Edit</el-button>
          <el-button size="mini" type="warning" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' } // 路径参数
      }).then(res => {
        this.tableData = res.data.results
      })
    },
    formatter (row, column, cellValue, index) {
      // row为当前数据, column为状态值, cellValue, index为索引
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
