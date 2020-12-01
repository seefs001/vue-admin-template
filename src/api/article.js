import request from '@/utils/request'

export function getArticleList(params) {
  return request({
    url: '/article',
    method: 'get',
    params
  })
}

export function getArticleListByCategoryID(id) {
  return request({
    url: '/article/category',
    method: 'get',
    params:{
      id
    }
  })
}

export function deleteArticleByID(id) {
  return request({
    url: '/article/auth',
    method: 'delete',
    params: {
      id
    }
  })
}

export function addArticle(title, summary, content, category_id) {
  return request({
    url: '/article/auth',
    method: 'post',
    data: {
      title,
      summary,
      content,
      category_id
    }
  })
}

export function updateArticle(id, title, summary, content, category_id) {
  return request({
    url: '/article/auth',
    method: 'put',
    data: {
      id, title, summary, content, category_id
    }
  })
}

export function getArticleByID(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: {
      id,
    }
  })
}
