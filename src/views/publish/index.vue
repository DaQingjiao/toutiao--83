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
          <el-input v-model="formData.content" placeholder="请输入内容" type="textarea" :rows="10"
            style="width: 800px"></el-input>
        </el-form-item>
        <el-form-item prop="cover" label="封面">
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
          <el-button @click="publish" type='primary'>发布</el-button>
          <el-button>存入草稿</el-button>
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
        title: [{ required: true, message: '标题不能为空' }],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      },
      getChannel: []
    }
  },
  methods: {
    articleChannel () {
      // 获取频道
      this.$axios({
        url: '/channels'
      }).then((res) => {
        this.getChannel = res.data.channels
      })
    },
    publish () {
      this.$refs.publishDom.validate((isok) => {
        if (isok) {
          alert('ok')
        }
      })
    }
  },
  created () {
    this.articleChannel()
  }
}
</script>

<style lang="less" scoped>
</style>
