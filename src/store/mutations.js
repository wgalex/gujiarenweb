const mutations = {
  save_userId (state, userId,userName) {
    state.userId = userId
    state.userName = userName    
  },
  save_userName (state, name) {
    state.name = name    
  },
  save_corpId (state,corpId) {
    state.corpId = corpId
  },
  save_agentid (state,agentid) {
    state.agentid = agentid
  }
}

export default mutations