import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    datasetAddress: null,
    datasetNames: [
      {
        name:'test-1'
      },
      
      {
        name: 'test-2'
      }
    ]
  },
  getters:{
    getDatasetAddress (state){
      return state.datasetAddress
    },
    getdatasetNames(state){
      return state.datasetNames
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
    },
    readACSDataURL: function(context, data){
      console.log(data);
    }
  }
})
