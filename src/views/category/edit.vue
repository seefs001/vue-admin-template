<template>
  <div class="app-container">
    <div>
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="分类ID" prop="id">
          <el-input
            v-model="formData.id"
            clearable
            disabled
            :style="{width: '100%'}"
          />
        </el-form-item>
        <el-form-item label="分类名" prop="name">
          <el-input
            v-model="formData.name"
            placeholder="请输入分类名"
            clearable
            prefix-icon="el-icon-plus"
            :style="{width: '100%'}"
          />
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCategoryByID, updateCategory } from '@/api/category'

export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        id: '',
        name: ''
      },
      rules: {
        name: [{
          required: true,
          message: '请输入分类名',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.formData.id = this.$route.params.id
    this.getCategoryByID()
  },
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        updateCategory(this.formData.id,this.formData.name).then(
          res => {
            if (res.code !== 200) {
              this.$message.error('更新分类出错')
            } else {
              this.$message.info('更新分类成功')
              this.$router.push('/category/index')
            }
          }
        )
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    getCategoryByID() {
      getCategoryByID(this.formData.id).then(
        res => {
          if (res.code !== 200) {
            this.$message.error('获取分类出错')
          }
          this.formData.name = res.data.name
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
