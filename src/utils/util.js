import Cookies from 'js-cookie'

// cookie的设置
export const setToken = (ACCESS_TOKEN, token) => {
    Cookies.set(ACCESS_TOKEN, token)
  }
  export const getToken = (name) => {
    return Cookies.get(name)
  }
  export const removeToken = (ACCESS_TOKEN) => {
    Cookies.remove(ACCESS_TOKEN)
  }