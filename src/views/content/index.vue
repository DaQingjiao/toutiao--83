<template>
  <div>
    <el-card>
      <bread-crumb slot="header">
        <template slot="title">内容列表</template>
      </bread-crumb>
      <el-form>
        <el-form-item label="文章状态:">
          <el-radio-group v-model="formData.radio">
            <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表:">
          <el-select v-model="formData.select" placeholder="请选择频道">
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择:">
          <el-date-picker type="datetimerange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-top: 10px">
      <div class="title">共找到54979条符合条件的内容</div>
      <div class="article-item" v-for="(item,index) in list" :key="index">
        <div class="left">
          <img :src="item.cover.images.length?item.cover.images[0]:listImg" alt="" />
          <div class="list-content">
            <span>{{ item.title }}</span>
            <span>
              <!-- 1.插值表达式中使用过滤器 2.v-bind中使用过滤器-->
              <el-tag :type="item.status | statusColor" style="margin:10px 0">
                {{ item.status | statusText }}
              </el-tag>
            </span>
            <span>{{ item.pubdate }}</span>
          </div>
        </div>
        <div class="right">
          <span><i class="el-icon-edit"></i>修改</span>
          <span><i class="el-icon-delete"></i>删除</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        radio: 5,
        select: ''
      },
      list: [],
      // 将图片地址转成base64
      listImg: require('../../assets/img/404.png')
    }
  },
  filters: {
    statusText (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    statusColor (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return ''
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'danger'
      }
    }
  },
  methods: {
    articleList () {
      this.$axios({
        url: '/articles'
      }).then((res) => {
        // 获取文章列表
        this.list = res.data.results
      })
    }
  },
  created () {
    this.articleList()
  }
}
</script>

<style lang="less" scoped>
.title {
  border-bottom: 1px dashed #ccc;
  padding-bottom: 10px;
}
.article-item {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  .left {
    display: flex;
    justify-content: space-between;
    img {
      width: 180px;
      height: 100px;
      margin-right: 20px;
    }
    .list-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      span:nth-child(3) {
        font-size: 14px;
        color: #888;
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    span {
      margin-left: 20px;
      font-size: 14px;
    }
  }
}
</style>
