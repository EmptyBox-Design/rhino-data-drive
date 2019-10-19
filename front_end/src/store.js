import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    datasetNames:[
      {
        name: 'test-1'
      },
      {
        name: 'test-2'
      }
    ]
  },
  getters:{
    getdatasetNames(state){
      return state.datasetNames;
    }
  },
  mutations: {
  },
  actions: {

  }
})
