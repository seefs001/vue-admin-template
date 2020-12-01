<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <!--      <el-table-column label="状态" >-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label="操作" align="center" width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            style="width:70px;"
            @click.native.prevent="editCategory(scope.row.id)"
          >编辑</el-button>
          <el-button
            size="mini"
            style="width:70px"
            @click.native.prevent="deleteCategory(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCategoryList, deleteCategoryByID } from '@/api/category'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        2: 'gray'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getCategoryList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    deleteCategory(id) {
      this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCategoryByID(id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetchData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    editCategory(id) {
      this.$router.push('/category/edit/' + id)
    }
  }
}
</script>
