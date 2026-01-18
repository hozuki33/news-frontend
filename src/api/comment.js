import request from './request'

export function fetchCommentList(newsId) {
  return request.get('/comment/list', {
    params: { newsId }
  })
}

export function addComment(data) {
  return request.post('/comment', data)
}

export function deleteComment(id) {
  return request.delete(`/comment/${id}`)
}
