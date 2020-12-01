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
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="总结">
        <template slot-scope="scope">
          {{ scope.row.summary }}
        </template>
      </el-table-column>
      <el-table-column label="分类名">
        <template slot-scope="scope">
          {{ scope.row.category.name }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            style="width:70px;"
            @click.native.prevent="editArticle(scope.row.id)"
          >编辑
          </el-button>
          <el-button
            size="mini"
            style="width:70px"
            @click.native.prevent="deleteArticle(scope.row.id)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { deleteArticleByID, getArticleList, getArticleListByCategoryID } from '@/api/article'

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
      getArticleList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    deleteArticle(id) {
      this.$confirm('此操作将删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticleByID(id).then(response => {
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
    editArticle(id) {
      this.$router.push('/article/edit/' + id)
    }
  }
}
</script>
