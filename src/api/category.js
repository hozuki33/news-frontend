import request from './request'
export function listCategory() {
  return request.get('/category')
}

// 新增分类
export function addCategory(data) {
  return request({
    url: '/category',
    method: 'post',
    data
  })
}

// 查询全部分类
export function fetchCategoryList() {
  return request({
    url: '/category/list',
    method: 'get'
  })
}

// 根据 ID 获取分类
export function getCategory(id) {
  return request({
    url: `/category/${id}`,
    method: 'get'
  })
}

// 更新分类
export function updateCategory(data) {
  return request({
    url: '/category',
    method: 'put',
    data
  })
}

// 删除分类
export function deleteCategory(id) {
  return request({
    url: `/category/${id}`,
    method: 'delete'
  })
}

// 根据id查询新闻数量
export function fetchCategoryNewsCount(categoryId) {
  return request({
    url: '/category/count',
    method: 'get',
    params: { categoryId }
  })
}
