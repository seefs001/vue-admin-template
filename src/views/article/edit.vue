<template>
  <div class="app-container">
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入标题" clearable :style="{width: '100%'}"/>
      </el-form-item>
      <el-form-item label="总结" prop="summary">
        <el-input
          v-model="formData.summary"
          placeholder="请输入总结,不填写则提取内容前20字"
          clearable
          :style="{width: '100%'}"
        />
      </el-form-item>
      <el-form-item label="分类" prop="categoryList">
        <el-select v-model="formData.categoryList" placeholder="分类" clearable :style="{width: '100%'}">
          <el-option
            v-for="(item, index) in categoryListOptions"
            :key="index"
            :label="item.name"
            :value="item.id"
            :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input
          v-model="formData.content"
          type="textarea"
          placeholder="请输入内容，可以使用markdown"
          :autosize="{minRows: 4, maxRows: 4}"
          :style="{width: '100%'}"
        />
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getCategoryList } from '@/api/category'
import { addArticle, getArticleByID, updateArticle } from '@/api/article'

export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        id: 1,
        title: undefined,
        summary: undefined,
        categoryList: 1,
        content: undefined
      },
      rules: {
        title: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }],
        summary: [],
        categoryList: [{
          required: true,
          message: '分类',
          trigger: 'change'
        }],
        content: [{
          required: true,
          message: '请输入内容，可以使用markdown',
          trigger: 'blur'
        }]
      },
      categoryListOptions: []
    }
  },
  computed: {},
  watch: {},
  created() {
    getCategoryList().then(res => {
      this.categoryListOptions = res.data
    })
    this.formData.id = this.$route.params.id
    this.getArticleByID()
  },
  mounted() {
  },
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        updateArticle(
          this.formData.id,
          this.formData.title,
          this.formData.summary,
          this.formData.content,
          this.formData.categoryList
        ).then(res => {
          if (res.code === 200) {
            this.$message.success('更新成功')
            this.$router.push('/article/index')
          }
          this.$message.error(res.message)
        })
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    getArticleByID() {
      getArticleByID(this.formData.id).then(
        res => {
          if (res.code !== 200) {
            this.$message.error('获取文章出错')
          }
          this.formData = res.data
          this.formData.categoryList = res.data.category_id
        }
      )
    }
  }
}

</script>
<style>
</style>
