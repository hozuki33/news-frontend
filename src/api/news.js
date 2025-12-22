import request from "./request";

export const getCategories = () =>
  request.get("/category/list");


export function fetchNewsList(page = 1, pageSize = 10, categoryId) {
  return request({
    url: '/news/list',
    method: 'get',
    params: {
      page,
      pageSize,
      categoryId
    }
  })
}



export const getNewsDetail = (id) =>
  request.get(`/news/${id}`);
