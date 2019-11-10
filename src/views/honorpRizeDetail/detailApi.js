import fetch from '@/api/fetch.js'
import qs from 'qs'

//查询名人列表
export function queryCelebrityPerson (query) {
  return fetch({
    url: `/kukacms/visitor/celebrityPerson/select.htm`,
    method: 'post',
    data: qs.stringify(query)
  })
}
//新增名人信息
export function addCelebrityPerson (add) {
  return fetch({
    url: `/kukacms/visitor/celebrityPerson/add.htm`,
    method: 'post',
    data: qs.stringify(add)
  })
}
//根据id查寻
export function queryIdLevel (id) {
  return fetch({
    url: `/kukacms/visitor/celebrityPerson/selectOne.htm?id=${id}`,
    method: 'get',
    // data: qs.stringify(id)
  })
}
//根据id修改
export function editCelebrityPerson (edit) {
  return fetch({
    url: `/kukacms/visitor/celebrityPerson/update.htm`,
    method: 'post',
    data: qs.stringify(edit)
  })
}
