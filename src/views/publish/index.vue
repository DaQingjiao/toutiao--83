<template>
  <div>
    <el-card>
      <bread-crumb slot="header">
        <template slot="title">发布文章</template>
      </bread-crumb>

      <el-form ref="publishDom" :model="formData" :rules="releaseRules" style="margin-left:52px">
        <el-form-item prop="title" label="标题">
          <el-input v-model="formData.title" placeholder="请输入标题" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item prop="content" label="内容">
          <quill-editor v-model="formData.content" type="textarea"
            style="width: 900px;height: 450px;margin-left: 50px">
          </quill-editor>
        </el-form-item>
        <el-form-item prop="cover" label="封面" style="margin-top: 110px">
          <el-radio-group v-model="formData.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="channel_id" label="频道">
          <el-select v-model="formData.channel_id" placeholder="请选择频道">
            <el-option v-for="item in getChannel" :key="item.id" :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="publish(false)" type='primary'>发布</el-button>
          <el-button @click="publish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        // 标题
        title: '',
        // 内容
        content: '',
        // 频道
        channel_id: null,
        // 封面类型 -1:自动，0-无图，1-1张，3-3张
        cover: {
          type: 0,
          images: []
        }
      },
      releaseRules: {
        title: [{ required: true, message: '标题不能为空' }, { min: 3, max: 30, message: '长度在 3 到 5 个字符' }],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      },
      getChannel: [],
      list: []
    }
  },
  methods: {
    // 获取指定id文章信息
    getInformation (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then((res) => {
        this.formData = res.data
      })
    },
    // 获取频道
    articleChannel () {
      this.$axios({
        url: '/channels'
      }).then((res) => {
        this.getChannel = res.data.channels
      })
    },
    publish (draft) {
      this.$refs.publishDom.validate((isok) => {
        if (isok) {
          let articleId = this.$route.params.id
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'PUT' : 'POST',
            params: { draft },
            data: this.formData
          }).then(() => {
            this.$router.push('/home/articles')
          })
          // 原始代码
          // if (articleId) {
          //   this.$axios({
          //     url: `/articles/${articleId}`,
          //     method: 'PUT',
          //     // draft为false时-发布  为ture时-草稿
          //     params: { draft },
          //     data: this.formData
          //   }).then(() => {
          //     this.$router.push('/home/articles')
          //   })
          // } else {
          //   this.$axios({
          //     url: '/articles',
          //     method: 'POST',
          //     params: { draft },
          //     data: this.formData
          //   }).then(() => {
          //     // 发布成功跳转文章列表
          //     this.$router.push('/home/articles')
          //   })
          // }
        }
      })
    }
  },
  created () {
    this.articleChannel()
    // 判别：当有articleId时，为修改文章页  当没有articleId时，为新增文章页
    let articleId = this.$route.params.id
    // 如有articleId时，取第二个真值  如没有articleId时，取第一个假值
    articleId && this.getInformation(articleId)
  }
}
</script>

<style lang="less" scoped>
</style>
