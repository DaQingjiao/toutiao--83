<template>
  <div>
    <el-card>
      <bread-crumb slot="header">
        <template slot="title">内容列表</template>
      </bread-crumb>
      <el-form>

        <!-- 文章状态 -->
        <el-form-item label="文章状态:">
          <el-radio-group @change="stateChanges" v-model="formData.status">
            <!-- 默认全部 -->
            <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 频道列表 -->
        <el-form-item label="频道列表:">
          <el-select @change="stateChanges" v-model="formData.channel_id" placeholder="请选择频道">
            <el-option v-for="item in getChannel" :key="item.id" :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 时间选择 -->
        <el-form-item label="时间选择:">
          <el-date-picker @change="stateChanges" v-model="formData.date" value-format="yyyy-MM-dd"
            type="daterange" range-separator="至" start-placeholder=" 开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 文章列表 -->
    <el-card style="margin-top: 10px">
      <div class="title">共找到{{page.total}}条符合条件的内容</div>
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
          <span @click="delArticle(item.id)"><i class="el-icon-delete"></i>删除</span>
        </div>
      </div>
      <el-row type="flex" justify="center" style="margin-top: 15px">
        <el-pagination @current-change="changepage" background layout="prev, pager, next"
          :current-page="page.pagecurrent" :total="page.total" :page-size="page.pagesize">
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5,
        channel_id: null,
        date: []
      },
      page: {
        // 总条数
        total: 0,
        // 默认第一页
        pagecurrent: 1,
        // 每页条数
        pagesize: 10
      },
      list: [],
      getChannel: [],
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
    // 删除文章
    delArticle (id) {
      this.$confirm('是否确定删除该文章？').then(() => {
        this.$axios({
          url: `/articles/${id.toString()}`,
          method: 'delete'
        }).then(() => {
          this.public()
        })
      })
    },
    // 公共搜索部分封装
    public () {
      // 开始时间要大于0，才能取到 1个元素
      let qsTime = this.formData.date.length ? this.formData.date[0] : null
      // 结束时间要大于1，才能取到 2个元素
      let jsTime = this.formData.date.length > 1 ? this.formData.date[1] : null
      let params = {
        // 当状态为5时，不传
        status: this.formData.status === 5 ? null : this.formData.status,
        channel_id: this.formData.channel_id,
        begin_pubdate: qsTime,
        end_pubdate: jsTime,
        page: this.page.pagecurrent,
        per_page: this.page.pagesize
      }
      this.articleList(params)
    },
    changepage (newpage) {
      // 分页页码改变
      this.page.pagecurrent = newpage
      this.public()
    },
    stateChanges () {
      // 文章状态改变
      this.page.pagecurrent = 1
      this.public()
    },
    articleChannel () {
      // 获取频道
      this.$axios({
        url: '/channels'
      }).then((res) => {
        this.getChannel = res.data.channels
      })
    },
    articleList (params) {
      // 获取文章列表
      this.$axios({
        url: '/articles',
        params
      }).then((res) => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.articleList()
    this.articleChannel()
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
      cursor: pointer;
    }
  }
}
</style>
