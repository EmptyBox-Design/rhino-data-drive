import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    datasetAddress: null
  },
  getters:{
    getDatasetAddress (state){
      return state.datasetAddress
    }
  },
  mutations: {
    settDatasetAddress (state, newDatasetAddress) {
      state.datasetAddress = newDatasetAddress
    }
  },
  actions: {
    readDatasetAddress: function (context, url) {

      axios.get(url, function(response){

      }).then(function(response){
        // do stuff
        // manipulate data here
        // once data is ready
        context.commit('settDatasetAddress', response.data)
      })
    }
  }
})
