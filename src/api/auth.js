// export function getToken() {
//     return localStorage.getItem('token')
//   }
  
//   export function isLogin() {
//     return !!getToken()
//   }
import request from './request'

export function login(data) {
  return request.post('/user/login', data)
}

export function register(data) {
  return request.post('/user/register', data)
}

export function getToken() {
  return localStorage.getItem('token')
}

export function setToken(token) {
  localStorage.setItem('token', token)
}

export function logout() {
  localStorage.removeItem('token')
}

export function isLogin() {
  return !!getToken()
}
