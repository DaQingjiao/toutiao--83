<template>
  <el-row type="flex" class="coverRow">
    <el-card :body-style="{ padding: '10px' }" class="coverImg" v-for="(item,index) in images"
      :key="index">
      <!-- 地址要转成base64 -->
      <img @click="openLayer(index)" :src="item? item : defaultImg" alt="" style="width:100%">
    </el-card>
    <!-- 对话弹框组件 -->
    <el-dialog :visible="dialogVisible" @close="dialogVisible=false">
      <select-img @selectOneImg="receiveImg"></select-img>
    </el-dialog>
  </el-row>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false,
      selectIndex: -1
    }
  },
  methods: {
    // 接受子组件传父组件url
    receiveImg (url) {
      this.$emit('selectImg', url, this.selectIndex)
      this.dialogVisible = false
    },
    openLayer (index) {
      // 为true时-显示，为false时-隐藏
      this.dialogVisible = true
      this.selectIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
.coverRow {
  margin-left: 100px;
  margin-bottom: 10px;
}
.coverImg {
  width: 180px;
  height: 180px;
}
</style>
