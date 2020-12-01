import request from '@/utils/request'

export function getCategoryList(params) {
  return request({
    url: '/category',
    method: 'get',
    params
  })
}

export function deleteCategoryByID(id) {
  return request({
    url: '/category/auth',
    method: 'delete',
    params: {
      id
    }
  })
}

export function addCategory(name) {
  return request({
    url: '/category/auth',
    method: 'post',
    data: {
      name
    }
  })
}

export function updateCategory(id, new_name) {
  return request({
    url: '/category/auth',
    method: 'put',
    data: {
      id,
      new_name
    }
  })
}

export function getCategoryByID(id) {
  return request({
    url: '/category/detail',
    method: 'get',
    params: {
      id,
    }
  })
}
