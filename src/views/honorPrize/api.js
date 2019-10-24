import fetch from '@/api/fetch'
import qs from 'qs'
//获取股份荣誉信息
export function getMessage (data) {
    let url = `/kukacms/visitor/category/selectid.htm`
    return fetch({
      url: url,
      method: 'post'
    })
  }